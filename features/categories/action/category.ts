'use server'

import { InitialFormState } from "@/types/action"
import { createCategory, removeCategory, restoreCategory, UpdateCategory } from "../db/categories"

export const categoryAction = async (_prevState: InitialFormState, formData: FormData) => {
    const rawData = {
        id: formData.get('category-id') as string,
        name: formData.get('category-name') as string
    }

    
    const result = rawData.id ? await UpdateCategory(rawData) : await createCategory({name: rawData.name})

    return result && result.message ? {
        success: false,
        message: result.message,
        error: result.error
    } : {
        success: true,
        message: rawData.id ? 'Updated success' : 'Create success'
    }
}

export const deleteCategoryAction = async (_prevState: InitialFormState, formData: FormData) => {
    const id = formData.get('category-id') as string

    const result = await removeCategory(id)
    return result && result?.message ? {
        success: false,
        message: result.message
    } : {
        success: true,
        message: 'Category delete successfuly'
    }
}

export const restoreCategoryAction = async (_prevState: InitialFormState, formData: FormData) => {
    const id = formData.get('category-id') as string

    const result = await restoreCategory(id)
    return result && result?.message ? {
        success: false,
        message: result.message
    } : {
        success: true,
        message: 'Category restore successfuly'
    }
}