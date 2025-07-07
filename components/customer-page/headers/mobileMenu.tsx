import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { 
    Sheet, 
    SheetContent, 
    SheetHeader, 
    SheetTitle, 
    SheetTrigger, 
    SheetFooter 
} from '@/components/ui/sheet'
import { UserType } from '@/types/user'
import { AuthButton, SignoutButton, UserAvatar } from './user-comp'
import { MobileNavLink } from './navlink'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'

interface MobileMenuProps {
    user: UserType | null
}

const MobileMenu = ({user}: MobileMenuProps) => {
  return (
    <Sheet>
       <SheetTrigger className='md:hidden' asChild>
            <Button variant='ghost' size='icon'>
                <Menu size={20}></Menu>
            </Button>
        </SheetTrigger>
        <SheetContent side='right' className='flex flex-col w-full md:max-w-sm'>
            <SheetHeader>
                <SheetTitle className='text-primary text-xl'>
                    {user ? 'โปรไฟล์ของคุณ' : 'ยินดีต้อนรับ'}
                </SheetTitle>
            </SheetHeader>
            <div className='flex flex-1 flex-col gap-4'>
                {/* user Profile && Auth button */}
                {user ? <UserAvatar user={user}/> : <AuthButton/>}

                <Separator/>

                <div className='px-4'>
                    <ScrollArea className='h-48 sm:h-60 w-full'>
                        {/* Nav Link */}
                        <MobileNavLink/>
                        {/* Go to Admin page button */}
                        {user && user.role === 'Admin' && (
                            <div>
                                    <Separator className='my-2'/>
                                <Button asChild variant='secondary' size='lg' className='w-full'>
                                    <Link href='/admin'>หลังบ้าน</Link>
                                </Button>
                            </div>
                        )}
                    </ScrollArea>
                </div>
            {user && (
                <SheetFooter>
                    <SignoutButton isMobile={true}/>
                </SheetFooter>
            )}
            </div>
        </SheetContent>
    </Sheet>
  )
}

export default MobileMenu
