import React, { useEffect } from 'react'
import Modal from '@/components/shared/modal'
import { CategoryType } from '@/types/categories'
import Form from 'next/form'
import { Button } from '@/components/ui/button'
import SubmitBtn from '@/components/shared/submitBtn'
import { RefreshCcw } from 'lucide-react'
import { restoreCategoryAction } from '../action/category'
import { useForm } from '@/hook/use-form'

interface RestoreCategoryMadalProps {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    category: CategoryType | null
}

const RestoreCategoryMadal = ({open, onOpenChange, category}: RestoreCategoryMadalProps) => {

  const {state, formAction, isPending} = useForm(restoreCategoryAction);

  useEffect(()=>{
    if(state.success) onOpenChange(false)
  }, [state, onOpenChange])

  return (
    <Modal 
        open={open} 
        title='Restore Category' 
        description='Are you sure want to delete the category?'
        onOpenChange={onOpenChange}
    >
        <Form action={formAction}>
            <input type="hidden" name='category-id' value={category?.id}/>
            <div className='flex flex-col-reverse sm:flex-row gap-3 mt-3'>
                <Button type='button' variant='outline' className='flex-1' onClick={() => onOpenChange(false)} disabled={isPending}>
                    Cancel
                </Button>
                <SubmitBtn name='Restore' icon={RefreshCcw} className='bg-green-600 hover:bg-green-600/50 flex-1' disabled={isPending}></SubmitBtn>
            </div>
        </Form>
    </Modal>
  )
}

export default RestoreCategoryMadal
