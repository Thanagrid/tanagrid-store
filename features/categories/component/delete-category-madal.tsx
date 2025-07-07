import React, { useEffect } from 'react'
import Modal from '@/components/shared/modal'
import { CategoryType } from '@/types/categories'
import Form from 'next/form'
import { Button } from '@/components/ui/button'
import SubmitBtn from '@/components/shared/submitBtn'
import { Trash2 } from 'lucide-react'
import { deleteCategoryAction } from '../action/category'
import { useForm } from '@/hook/use-form'

interface DeleteCategoryMadalProps {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    category: CategoryType | null
}

const DeleteCategoryMadal = ({open, onOpenChange, category}: DeleteCategoryMadalProps) => {

  const {state, formAction, isPending} = useForm(deleteCategoryAction);

  useEffect(()=>{
    if(state.success) onOpenChange(false)
  }, [state, onOpenChange])

  return (
    <Modal 
        open={open} 
        title='Delete Category' 
        description='Are you sure want to delete the category?'
        onOpenChange={onOpenChange}
    >
        <Form action={formAction}>
            <input type="hidden" name='category-id' value={category?.id}/>
            <div className='flex flex-col-reverse sm:flex-row gap-3 mt-3'>
                <Button type='button' variant='outline' className='flex-1' onClick={() => onOpenChange(false)} disabled={isPending}>
                    Cancel
                </Button>
                <SubmitBtn name='Delete' icon={Trash2} className='bg-destructive hover:bg-destructive/50 flex-1' disabled={isPending}></SubmitBtn>
            </div>
        </Form>
    </Modal>
  )
}

export default DeleteCategoryMadal
