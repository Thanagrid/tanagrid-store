import { UserType } from "@/types/user"
import MobileMenu from "./mobileMenu"
import CartIcon from "./cart-icon"
import { DesktopNavLink } from "./navlink"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import DesktopUserMenu from "./desktop-user-menu"

interface NavbarProps {
  user: UserType | null
}

const Navbar = ({user}: NavbarProps) => {
  return (
    <nav className="flex items-center gap-3">
      {/* Mobile  */}
      {user && <div><CartIcon/></div>}
      <MobileMenu user={user}/>

      {/* Desktop  */}
      <div className="hidden md:flex md:items-center gap-2">
        <DesktopNavLink/>
        {user ? (
          <DesktopUserMenu user={user}/>
        ) : (
          <Button asChild size="sm">
            <Link href='/auth/signin'>เข้าสู่ระบบ</Link>
          </Button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
