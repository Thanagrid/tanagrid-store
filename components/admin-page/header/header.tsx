'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import { Menu } from 'lucide-react'
import { useSidebar } from '@/providers/SidebarProvider'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { UserType } from '@/types/user'
import Link from 'next/link'
import { useSignOut } from '@/hook/use-signout'

interface HeaderAdminProps {
    user: UserType
}

const HeaderAdmin = ({user}: HeaderAdminProps) => {

    const {toggleSidebar} = useSidebar()
    const {isPending, handleSignout} = useSignOut()

  return (
    <header className='fixed top-0 inset-x-0 md:left-64 h-16 border-b z-10 transition-all duration-200'>
        <div className='flex items-center h-full justify-between px-4'>
            {/* toggle sidebar */}
            <Button variant='ghost' size="icon" className='md:hidden' onClick={toggleSidebar}>
                <Menu size={20}></Menu>
            </Button>
            <div>
                {/* profile dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className='rounded-full'>
                            <Avatar className='border-2 border-primary'>
                                <AvatarImage src={user.picture || undefined} alt={user.name || "User"}></AvatarImage>
                                <AvatarFallback className='bg-primary text-primary-foreground'>
                                    {user.name!.slice(0, 2).toUpperCase() || 'US'}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>
                            My Account
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>
                            <Link href='/profile' className='w-full'>Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem className='text-destructive hover:!text-red-700' asChild>
                            <Button onClick={handleSignout} disabled={isPending} variant='ghost'>
                                Logout
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    </header>
  )
}

export default HeaderAdmin
