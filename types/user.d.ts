import { User } from "@/lib/generated/prisma";

export type UserType = Omit<User, 'password' | 'pictureId' | 'createdAt' | 'updateAt'>