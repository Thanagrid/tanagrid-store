import './globals.css'
import type { Metadata } from "next"
import { Toaster } from '@/components/ui/sonner'

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: {
    default: 'Tanagrid Store | E-Commerce Workshop',
    template: "Tanagrid Store | %s"
  },
  description: "ร้านค้าออนไลน์อันดับ 1 สำหรับสินค้า IT ครบวงจร พร้อมบริการจัดส่งทั่วประเทศ"
}

const layout = ({children} : RootLayoutProps) => {
  return (
    <html lang="en">
      <body className='bg-gray-100'>
        {children}
        <Toaster/>
      </body>
    </html>
  )
}

export default layout
