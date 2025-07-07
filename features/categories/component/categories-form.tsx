'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import Form from 'next/form'
import InputForm from '@/components/shared/inputForm'
import SubmitBtn from '@/components/shared/submitBtn'
import { useForm } from '@/hook/use-form'
import { categoryAction } from '../action/category'
import ErrorMessage from '@/components/shared/errorMessage'

const CategoriesForm = () => {

    const {errors, formAction, isPending, clearErrors} = useForm(categoryAction)

  return (
    <Card>
        <CardHeader>
            <CardTitle className='flex gap-2 items-center text-lg sm:text-xl'>
                <Plus size={18}></Plus>
                <span>Add New Category</span>
            </CardTitle>
            <CardDescription className='text-xs sm:text-sm'>
                Create a new category for your product
            </CardDescription>
        </CardHeader>

        <Form action={formAction} onChange={clearErrors} className='space-y-4'>
            <CardContent>
                <div className='space-y-2'>
                    <InputForm label='Category name' id='category-name' placeholder='Enter category name' required></InputForm>
                {errors.name && <ErrorMessage errors={errors.name[0]}/>}
                </div>
            </CardContent>
            <CardFooter>
                <SubmitBtn name='Add Category' icon={Plus} className='w-full' disabled={isPending}></SubmitBtn>
            </CardFooter>
        </Form>
    </Card>
  )
}

export default CategoriesForm
