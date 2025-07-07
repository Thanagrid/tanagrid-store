import Modal from '@/components/shared/modal'
import Form from 'next/form'
import InputForm from '@/components/shared/inputForm'
import SubmitBtn from '@/components/shared/submitBtn'
import { Save } from 'lucide-react'
import { CategoryType } from '@/types/categories'
import { useForm } from '@/hook/use-form'
import { categoryAction } from '../action/category'
import ErrorMessage from '@/components/shared/errorMessage'
import { useEffect } from 'react'

interface EditCategoryModalProps {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    category: CategoryType | null,
}

const EditCategoryModal = ({open, onOpenChange, category}: EditCategoryModalProps) => {

    const {state, errors, formAction, isPending, clearErrors} = useForm(categoryAction)

    useEffect(()=>{
        if(state.success) onOpenChange(false)
    }, [state, onOpenChange])
  
    useEffect(()=>{
        if(open) clearErrors();
    }, [open, clearErrors])

    return (
        <Modal open={open} onOpenChange={onOpenChange} title='Edit your category name' description='enter your category name'>
            <Form action={formAction} onChange={clearErrors} className='space-y-4'>
                <input type="hidden" name="category-id" value={category?.id}/>
                <div className='space-y-2'>
                    <InputForm label='Category name' id='category-name' placeholder='Enter name' required defaultValue={category?.name}></InputForm>
                    {/* error message */}
                    {errors.name && <ErrorMessage errors={errors.name[0]}/>}
                </div>
                <SubmitBtn name='Update' icon={Save} className='w-full' disabled={isPending}></SubmitBtn>
            </Form>
        </Modal>      
  )
}

export default EditCategoryModal
