import HeaderCustomer from "@/components/customer-page/headers/header"
import { authCheck } from "@/features/auths/db/auth"

interface MainLayoutProps {
    children: React.ReactNode
}

const MainLayout = async ({ children }: MainLayoutProps) => {

    const user = await authCheck()

    return (
        <div className="min-h-svh flex flex-col">
            <HeaderCustomer user={user}/>
            <main className="pt-14 max-w-7xl mx-auto px-4">
                {children}    
            </main>
            
        </div>
    )
}

export default MainLayout
