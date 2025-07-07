'use client'

import { cn } from "@/lib/utils";
import { useSidebar } from "@/providers/SidebarProvider"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FolderTree, LayoutDashboard, X, LogOut } from "lucide-react";
import { UserType } from "@/types/user";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import SidebarLink from "./SidebarLink";
import { usePathname } from "next/navigation";
import { useSignOut } from "@/hook/use-signout";

interface SidebarAdminProps {
    user: UserType
}

const SidebarAdmin = ({user}: SidebarAdminProps) => {

    const { isSidebarOpen, toggleSidebar } = useSidebar();
    const pathname = usePathname();
    const {isPending, handleSignout} = useSignOut();

    const sidebarLink = [
        {
            label: 'Dashboard',
            href: '/admin', 
            icon: <LayoutDashboard size={20}></LayoutDashboard>
        },{
            label: 'Categories',
            href: '/admin/categories',
            icon: <FolderTree size={20}></FolderTree>
        }
    ]

    return (
        <div>
            {/* Mobile Overlay*/}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40
                md:hidden"
                onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                'fixed top-0 left-0 z-40 h-svh w-64 border-r flex flex-col transition-all dur',
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            )}>
                <div className="flex flex-row items-center justify-between h-16 px-4 border-b">
                    {/* logo */}
                    <Link href='/admin' className="flex items-center gap-2">
                        <div className="bg-primary rounded-md p-1">
                            <div className="size-6 text-primary-foreground font-bold flex items-center justify-center">A</div>
                        </div>
                        <span className="text-xl font-bold">Admin</span>
                    </Link>

                    {/* toggle */}
                    <Button variant='ghost' size='icon' className="md:hidden" onClick={toggleSidebar}>
                        <X size={20}/>
                    </Button>
                </div>
                {/* Main content */}
                <div className="flex-1 flex flex-col h-[calc(100-vw-128px)] overflow-hidden">
                    <ScrollArea className="flex-1">
                        <div className="p-4">
                            {/* Profile Box */}
                            <div className="flex items-center gap-3 bg-muted/50 p-3 rounded-lg mg-6">
                                <Avatar className="size-10">
                                    <AvatarImage src={user.picture || undefined} alt={user.name || 'User'}/>
                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                        {user.name?.charAt(0) || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="space-y-1.5">
                                    <p className="text-sm font-medium leading-none">{user.name || 'User'}</p>
                                    <p className="text-xs text-muted-foreground">{user.email}</p>
                                </div>
                            </div>
                            {/* Menu */}
                            <nav className="space-y-1.5 mt-3 flex flex-col">
                                {sidebarLink.map((item, index) => (
                                    <SidebarLink
                                    key={index}
                                    label={item.label}
                                    href={item.href}
                                    icon={item.icon}
                                    isActive={pathname === item.href}
                                    onClose={toggleSidebar}
                                    />
                                ))}
                            </nav>
                        </div>
                    </ScrollArea>
                </div>
                <div className="border-t p-4">
                    <Button variant='ghost' className="w-full justify-end gap-3 text-muted-foreground hover:text-foreground cursor-pointer"
                    onClick={handleSignout}
                    disabled={isPending}
                    >
                        <LogOut size={30}></LogOut>
                        <span>Logout</span>
                    </Button>
                </div>
            </aside> 
        </div>
    )
}

export default SidebarAdmin
