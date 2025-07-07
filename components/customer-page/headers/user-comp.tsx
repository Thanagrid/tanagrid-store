'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SheetClose } from "@/components/ui/sheet"
import { useSignOut } from "@/hook/use-signout"
import { Loader2 } from "lucide-react"
import { UserType } from "@/types/user"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserCompProps {
    user: UserType
}

interface UserAvatarSmallProps {
    user: UserType
}

export const AuthButton = () => (
    <div className="flex justify-center gap-3">
        <Button size='lg' asChild>
            <SheetClose asChild>
                <Link href='/auth/signup'>ลงทะเบียน</Link>    
            </SheetClose>
        </Button>
        <Button size='lg' variant='outline' asChild>
            <SheetClose asChild>
                <Link href='/auth/signin'>เข้าสู่ระบบ</Link>    
            </SheetClose>
        </Button>
    </div>
)

export const SignoutButton = ({isMobile = false}) => {

    const {isPending, handleSignout} = useSignOut();

    if(isMobile == true){
        return (
            <SheetClose asChild>
                <Button onClick={handleSignout} variant='destructive' disabled={isPending}>
                    {isPending ? <Loader2 size={20} className="animate-spin"/> : 'ออกจากระบบ'}
                </Button>
            </SheetClose>
        )
    }else{
        return <Button onClick={handleSignout} variant='destructive' disabled={isPending} className="w-full mt-4">{isPending ? <Loader2 size={20} className="animate-spin"/> : 'ออกจากระบบ'}</Button>
    }
}

export const UserAvatar = ({user}: UserCompProps) => {
    return (
        <div className="px-4">
           <Card className="border-primary/50">
                <CardContent className="flex flex-col items-center gap-3">
                    <Image 
                        alt={user.name || 'Profile'} 
                        src={user.picture || '/images/no-user-image.webp'}
                        width={128}
                        height={128}
                        priority
                        className="rounded-full border-2 border-primary shadow object-cover"
                    />
                    <h2 className="text-xl font-semibold">
                        {user.name || user.email}
                    </h2>
                </CardContent>
            </Card> 
        </div>
    )
}

export const UserAvatarSmall = ({user}: UserAvatarSmallProps) => {
    return (
        <Avatar className="border-2 border-primary">
            <AvatarImage src={user.picture || undefined} alt={user.name || 'User'}/>
            <AvatarFallback className="bg-primary text-primary-foreground ">
                {user.name ? user.name.slice(0, 2).toUpperCase() : user.email.slice(0,2)}
            </AvatarFallback>
        </Avatar>
    )
}

export const UserDropdownAvatar = ({user}: UserAvatarSmallProps) => {
    return (
        <Avatar className="size-16 border-2 border-primary">
            <AvatarImage src={user.picture || undefined} alt={user.name || 'User'}></AvatarImage>
            <AvatarFallback className="text-lg">
                {user.name ? user.name.slice(0, 2).toUpperCase() : user.email.slice(0,2)}
            </AvatarFallback>
        </Avatar>
    )
} 