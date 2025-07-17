import { prisma } from "@/lib/db";

export const getProduct = async () => {
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
               sku: product.id.substring(0,8)
            }
      })

      return data

   }catch(err){
      console.log(err);
      return [];
   }
}