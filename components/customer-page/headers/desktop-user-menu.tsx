import { UserType } from "@/types/user"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { SignoutButton } from "./user-comp"
import { UserAvatarSmall, UserDropdownAvatar } from "./user-comp"

interface DesktopUserMenuProps {
    user: UserType
}

const DesktopUserMenu = ({user}: DesktopUserMenuProps) => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
            <Button variant='ghost' size='icon' className="size-8 rounded-full">
                <UserAvatarSmall user={user}/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
            align="end"
            sideOffset={4}
            className="w-56"
        >
            <DropdownMenuLabel className="flex flex-col items-center">
                <UserDropdownAvatar user={user}/>
                <span className="mt-2">สวัสดี, {user.name || user.email}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuItem asChild className="cursor-pointer">
                <Link href='/profile'>โปรไฟล์ของฉัน</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer flex justify-between">
                <Link href='/cart'>
                    <span>ตะกร้าของฉัน</span>
                    <Badge>0</Badge>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
                <Link href='/my-order'>ประวัติการสั่งซื้อ</Link>
            </DropdownMenuItem>
            {user.role === 'Admin' && (
                <>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href='/admin'>หลังบ้าน</Link>
                    </DropdownMenuItem>
                </>
            )}
            <DropdownMenuSeparator/>
            <div>
                <SignoutButton/>
            </div>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DesktopUserMenu