import { prisma } from "@/lib/db"
import { unstable_cacheLife, unstable_cacheTag } from 'next/cache'
import { getCategoriesGlobalTag, revalidateCategoriesCache } from "./cache"
import { categorySchema } from "../schema/category"
import { authCheck } from "@/features/auths/db/auth"
import { canCreateCategory, canUpdateCategory } from "../permissions/categories"
import { redirect } from "next/navigation"
import { CategoryStatus } from "@/lib/generated/prisma"

interface createCategoryInput {
    name: string
}

interface UpdateCategoryInput {
    id: string,
    name: string
}

export const getCategories = async () => {
    'use cache'

    unstable_cacheLife('days')
    unstable_cacheTag(getCategoriesGlobalTag())

    try{
        const data = await prisma.category.findMany({
            orderBy: {createdAt: 'asc'},
            select: {
                id: true,
                name: true,
                status: true
            }
        })
        return data
    }catch(err){
        console.error(err)
        return []
    }
}

export const createCategory = async (input: createCategoryInput) => {
    
    const user = await authCheck()

    if(!user || !canCreateCategory(user)){
        redirect('/')
    }
    
    try{
        const {success, data, error} = categorySchema.safeParse(input)
        console.log(error);
        
        if(!success){
            return {
                message: 'Please enter valid data',
                error: error.flatten().fieldErrors
            }
        }
        // Check category already
        const category = await prisma.category.findFirst({
            where: {
                name: data.name
            }
        })

        if(category){
            return{
                message: 'A category with this name already exists'
            }
        }

        const result = await prisma.category.create({
            data: {
                name: data.name
            }
        })

        revalidateCategoriesCache(result.id)
    }catch(err){
        console.error(err)
        return {
            message: 'something went wrong. Please try again later'
        }
    }
}

export const UpdateCategory = async (input: UpdateCategoryInput) => {

    const user = await authCheck()

    if(!user || !canUpdateCategory(user)){
        redirect('/')
    }

    try{
        const {success, data, error} = categorySchema.safeParse({name: input.name})

        if(!success){
            return {
                message: 'Please enter valid data',
                error: error.flatten().fieldErrors
            }
        }

        // check if category exists
        const cate_exists = await prisma.category.findUnique({
            where: {
                id: input.id
            }
        })

        if(!cate_exists){
            return {
                message: 'category not found'
            }
        }

        // check if anothor category with the same name
        const duplicateCate = await prisma.category.findFirst({
            where: {
                name: input.name,
                id: {
                    not: input.id
                }
            }
        })

        if(duplicateCate){
            return {
                message: 'A category with this name already use'
            }
        }

        // update category name
        const upadatedCate = await prisma.category.update({
            where: {
                id: input.id
            },
            data: {
                name: data.name
            }
        })

        revalidateCategoriesCache(upadatedCate.id)
    }catch(err){
        console.error(err);
        return {
            message: 'somthing went wrong. Plase try again later'
        }
    }
}

export const changeCategoryStatus = async (id: string, status: CategoryStatus) => {

    const user = await authCheck()

    if(!user || !canUpdateCategory(user)){
        redirect('/')
    }

    try{
        // check category
        const exists = await prisma.category.findUnique({
            where: { id: id }
        })

        if(!exists){
            return {
                message: 'Category not found!!'
            }
        }

        if(exists.status === status){
            return {
                message: `Category is already ${status.toLowerCase()}`
            }
        }

        const update = await prisma.category.update({
            where: {
                id: id
            },
            data: {
                status: status
            }
        })

        revalidateCategoriesCache(update.id);
    }catch(err){
        console.error(err)
        return {
            message: 'somthing went wrong. Please try again later'
        }
    }
}

export const removeCategory = async (id: string) => {
    return await changeCategoryStatus(id, "Inactive");
}

export const restoreCategory = async (id: string) => {
    return await changeCategoryStatus(id, "Active");
}