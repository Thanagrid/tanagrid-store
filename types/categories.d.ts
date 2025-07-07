import { Category } from "@/lib/generated/prisma";

export type CategoryType = Omit<Category, 'createdAt' | 'updateAt'>