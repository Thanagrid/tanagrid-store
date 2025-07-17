import { Category, Product } from "@/lib/generated/prisma";

interface ProductType extends Product {
   category: Category,
   lowStock: number,
   sku: string
}