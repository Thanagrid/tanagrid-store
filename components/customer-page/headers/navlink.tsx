import { Button } from "@/components/ui/button"
import { SheetClose } from "@/components/ui/sheet"
import Link from "next/link"

const NAV_LINKS = [
    { title: 'หน้าหลัก', href: '/'},
    { title: 'สินค้าทั้งหมด', href: '/product'},
    { title: 'เกี่ยวกับ', href: '/about'},
    { title: 'ติดต่อเรา', href: '/contact'},
]

export const MobileNavLink = () => {
    return (
        <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link, index)=>{
                return (
                    <SheetClose key={index} asChild>
                        <Button asChild variant='secondary' size='lg'>
                            <Link href={link.href}>{link.title}</Link>
                        </Button>
                    </SheetClose>
                )
            })}
        </div>
    )
}

export const DesktopNavLink = () => {
    return (
        <div className="flex items-center gap-1">
            {NAV_LINKS.map((item, index) => {
                return (
                    <Button key={index} variant='ghost' size='sm' asChild>
                        <Link href={item.href}>{item.title}</Link>
                    </Button>
                )
            })}
        </div>
    )
}