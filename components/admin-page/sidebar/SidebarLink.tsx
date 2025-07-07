import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

interface SidebarLinkProps {
  label: string,
  href: string,
  icon: React.ReactNode,
  isActive: boolean
  onClose: () => void
}

const SidebarLink = ({label, href, icon, isActive, onClose}: SidebarLinkProps) => {
  return (
    <Button asChild variant={isActive ? 'secondary' : 'ghost'} onClick={onClose}>
      <Link href={href} className={cn('w-full justify-start gap-3 px-3', isActive ? 'font-semibold' : 'text-muted-foreground hover:text-foreground')}>{icon}{label}</Link>
    </Button>
  )
}

export default SidebarLink
