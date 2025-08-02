import { prisma } from "@/lib/db";
import { unstable_cacheLife, unstable_cacheTag } from "next/cache";
import { getProductGlobalTag, revalidateProductCache } from "./cache";
import { productSchema } from "../schemas/products";
import { authCheck } from "@/features/auths/db/auth";
import { canCreateProduct } from "../permission/product";
import { redirect } from "next/navigation";

interface CreateProductInput {
  title: string;
  description: string;
  cost?: number;
  basePrice: number;
  price: number;
  stock: number;
  categoryId: string;
}

export const getProduct = async () => {
   'use cache'

   unstable_cacheLife("hours")
   unstable_cacheTag(getProductGlobalTag())

   try {
      const products = await prisma.product.findMany({
         include: {
            category: {
               select: {
                  id:true,
                  name: true,
                  status: true
               }
            }
         },
      })

      const data = products.map((product) => {
         return {
               ...product,
               lowStock: 5,
               sku: product.id.substring(0,8).toUpperCase(),
            }
      })

      return data

   }catch(err){
      console.log(err);
      return [];
   }
}

export const createProduct = async (input: CreateProductInput) => {

   const user = await authCheck();
   if(!user || !canCreateProduct){
      redirect('/')
   }

   try {
      const { success, data, error } = productSchema.safeParse(input);
   
      if(!success){
         return {
            message: 'Please enter valid product information',
            error: error.flatten().fieldErrors
         }
      }

      const category = await prisma.category.findUnique({
         where: {
            id: data.categoryId,
            status: 'Active'
         }
      })

      if(!category) {
         return {
            message: 'selected category not found or inactive'
         }
      }

      const newProduct = await prisma.product.create({
         data: {
            title: data.title,
            description: data.description,
            cost: data.cost,
            basePrice: data.basePrice,
            price: data.price,
            stock: data.stock,
            categoryId: data.categoryId
         }
      })

      revalidateProductCache(newProduct.id);
   
   }catch(err){
      console.log(err);
      return {
         message: "Somthing went wrong."
      }
   }
}
