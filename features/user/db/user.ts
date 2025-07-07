import { prisma } from '@/lib/db'
import { unstable_cacheLife, unstable_cacheTag } from 'next/cache'
import { getUserIdTag } from './cache'

export const getUserById = async (id: string) => {
    'use cache'

    unstable_cacheLife('hours')
    unstable_cacheTag(getUserIdTag(id))

    try{
        const user = await prisma.user.findUnique({
            where: {
                id: id,
                status: 'Active'
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                address: true,
                picture: true,
                tel: true
            }
        })

        console.log(user);
        

        return user
    }catch(error){
        console.error('Error geting user by ID', error)
        return null
    }
}