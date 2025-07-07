import type { Metadata } from "next"
import { authCheck } from "@/features/auths/db/auth"
import { redirect } from "next/navigation"
import HeaderCustomer from "@/components/customer-page/headers/header"

interface AuthLayoutProps {
    children: React.ReactNode
}

export const metadata: Metadata = {
    title: 'Signup',
    description: "ร้านค้าออนไลน์อันดับ 1 สำหรับสินค้า IT ครบวงจร พร้อมบริการจัดส่งทั่วประเทศ"
}

const AuthLayout = async ({children}: AuthLayoutProps) => {

  const user = await authCheck()
  
  if(user){
    redirect('/')
  }
  

  return (
    <div className="flex flex-col justify-center min-h-svh">
      <HeaderCustomer user={null}/>
      <main>{children}</main>
    </div>
  )
}

export default AuthLayout
