import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import React from 'react'

interface ModalProps {
    children: React.ReactNode,
    open: boolean,
    onOpenChange: (open: boolean) => void
    title: string,
    description: string
}

const Modal = ({children, open, onOpenChange, title, description}: ModalProps) => {
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className='sm:max-w-md'>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
                {children}
            </DialogContent>
    </Dialog>
    </>
  )
}

export default Modal
