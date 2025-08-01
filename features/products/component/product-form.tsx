import React from 'react'
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

interface ProductFormProps {
   categories: CategoryType[]
}

const ProductForm = ({categories}: ProductFormProps) => {
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
         <Form action=''>
            <CardContent className='flex flex-col gap-4'>
               {/* Basic Information */}
               <div className='flex flex-col gap-4'>
                  <h3 className='font-medium'>Basic Information</h3>
                  {/* Title */}
                  <div className='flex flex-col gap-2'>
                     <InputForm label='Product Title' id='title' placeholder='Enter product title' required></InputForm>
                  </div>
                  {/* Descript */}
                  <div className='flex flex-col gap-2'>
                     <Label htmlFor='Description'>
                        Description <span className='text-red-500'>*</span>
                     </Label>
                     <Textarea name="description" id="Description" placeholder='enter product description' className='min-h-20 w-full'></Textarea>
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
                  </div>
               </div>

               

               <div className='flex flex-col gap-4'>
                  <h3 className='font-medium'>Pricing Information</h3>
                  <div>Input</div>
               </div>

               <div className='flex flex-col gap-4'>
                  <h3 className='font-medium'>Stock Information</h3>
                  <div>Input</div>
               </div>

               <CardFooter>
                  <SubmitBtn name='save porduct' icon={Save} className='w-full'></SubmitBtn>
               </CardFooter>
            </CardContent>
         </Form>
      </Card>
   )
}

export default ProductForm
