import React from 'react'
import ProductForm from '@/features/products/component/product-form'
import { getCategories } from '@/features/categories/db/categories'

const NewProductPage = async () => {

   const categories = await getCategories()

   return (
      <div className='p-4 sm:p-6 space-y-6'>
         <div className='flex flex-col gap-1'>
            <h1 className='text-2xk md:text-3xl font-bold'>Add New Product</h1>
            <p className='text-muted-foreground text-sm'>Create a new product</p>
         </div>
         <div>
            <ProductForm categories={categories}></ProductForm>
         </div>
      </div>
   )
}

export default NewProductPage
