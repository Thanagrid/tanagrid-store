'use client'

import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Form from 'next/form'
import SubmitBtn from '@/components/shared/submitBtn'
import { Save } from 'lucide-react'
import InputForm from '@/components/shared/inputForm'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CategoryType } from '@/types/categories'
import { useForm } from '@/hook/use-form'
import { productAction } from '../action/product'
import ErrorMessage from '@/components/shared/errorMessage'

interface ProductFormProps {
   categories: CategoryType[]
}

const ProductForm = ({categories}: ProductFormProps) => {

   const [basePrice, setBasePrice] = useState("")
   const [salePrice, setSalePrice] = useState("")

   const {errors, formAction, isPending, clearErrors} = useForm(productAction, "/admin/products")

   const calulateDiscount = () => {
      const basePriceNum = parseFloat(basePrice) || 0;
      const salePriceNum = parseFloat(salePrice) || 0;

      if(basePriceNum === 0 || salePriceNum === 0){
         return '0%'
      }

      if(basePriceNum <= salePriceNum){
         return '0%'
      }

      const discount = ((basePriceNum - salePriceNum) / basePriceNum ) * 100


      return `${discount.toFixed(2)}%`
   }

   return (
      <Card className='max-w-4xl mx-auto'>
         <CardHeader>
            <CardTitle className='text-lg sm:text-xl'>
               Product Information
            </CardTitle>
            <CardDescription>
               Enter the details of your new product
            </CardDescription>
         </CardHeader>
         <Form action={formAction} onChange={clearErrors}>
            <CardContent className='flex flex-col gap-4'>
               {/* Basic Information */}
               <div className='flex flex-col gap-4'>
                  <h3 className='font-medium'>Basic Information</h3>
                  {/* Title */}
                  <div className='flex flex-col gap-2'>
                     <InputForm label='Product Title' id='title' placeholder='Enter product title' required></InputForm>
                     {errors.title && <ErrorMessage errors={errors.title[0]} />}
                  </div>
                  {/* Descript */}
                  <div className='flex flex-col gap-2'>
                     <Label htmlFor='Description'>
                        Description <span className='text-red-500'>*</span>
                     </Label>
                     <Textarea name="description" id="Description" placeholder='enter product description' className='min-h-20 w-full'></Textarea>
                     {errors.description && <ErrorMessage errors={errors.description[0]} />}
                  </div>
                  {/* category */}
                  <div className='flex flex-col gap-2'>
                     <Label>
                        Category <span className='text-red-500'>*</span>
                     </Label>
                     <Select name='category-id'>
                        <SelectTrigger className='w-full'>
                           <SelectValue placeholder="Select category"></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                           {categories.filter((c)=> c.status === 'Active').map((c, index)=> (
                              <SelectItem value={c.id} key={index}>{c.name}</SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                     {errors.categoryId && <ErrorMessage errors={errors.categoryId[0]} />}
                  </div>
               </div>

               

               <div className='flex flex-col gap-4'>
                  <h3 className='font-medium'>Pricing Information</h3>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                     <div className='flex flex-col gap-2'>
                        <InputForm label='Cost Price' id='cost' type="number" min="0" step="any" placeholder='0.00'></InputForm>
                     </div>
                     {/* Base Price */}
                     <div className='flex flex-col gap-2'>
                        <InputForm label='Base Price' id='base-price' type="number" min="0" step="any" placeholder='0.00' required value={basePrice} onChange={(event) => setBasePrice(event.target.value)}></InputForm>
                            {errors.basePrice && (
                              <ErrorMessage errors={errors.basePrice[0]} />
                           )}
                     </div>
                     <div className='flex flex-col gap-2'>
                        <InputForm label='Sale Price' id='price' type="number" min="0" step="any" placeholder='0.00' required value={salePrice} onChange={(event) => setSalePrice(event.target.value)}></InputForm>
                        {errors.price && <ErrorMessage errors={errors.price[0]} />}
                     </div>
                     <div className='flex flex-col gap-2'>
                        <Label>Discount</Label>
                        <div className='h-9 px-3 rounded-md border border-input bg-gray-50 flex items-center'>{calulateDiscount()}</div>
                     </div>
                  </div>
               </div>

               <div className='flex flex-col gap-4'>
                  <h3 className='font-medium'>Stock Information</h3>
                  <div>
                     <InputForm label='Stock Quantity' id='stock' type='number' min='0' step="1" placeholder='0' required></InputForm>
                  </div>
                  {errors.stock && <ErrorMessage errors={errors.stock[0]} />}
               </div>

               <CardFooter>
                  <SubmitBtn name='save porduct' icon={Save} className='w-full' pending={isPending}></SubmitBtn>
               </CardFooter>
            </CardContent>
         </Form>
      </Card>
   )
}

export default ProductForm
