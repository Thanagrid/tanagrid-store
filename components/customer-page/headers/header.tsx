import React from 'react'
import Link from 'next/link'
import { ShoppingBagIcon } from 'lucide-react'
import Navbar from './navbar'
import { UserType } from '@/types/user'

interface HeaderCustomerProps {
    user: UserType | null
}

const HeaderCustomer = ({ user }: HeaderCustomerProps) => {
  return (
    <header className='fixed top-0 inset-x-0 z-40 border-b border-b-border shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 flex justify-between items-center h-14 bg-white'>
            <Link href='/' className='flex gap-2 items-center text-primary'>
                <ShoppingBagIcon size={28}/>
                <h2 className='text-xl font-bold'>Tanagrid Store</h2>
            </Link>
            <div>
                <Navbar user={user}/>
            </div>
        </div>
    </header>
  )
}

export default HeaderCustomer