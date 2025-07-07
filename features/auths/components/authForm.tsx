'use client'

import { CardContent } from "@/components/ui/card"
import InputForm from "@/components/shared/inputForm"
import Form from 'next/form'
import { useForm } from "@/hook/use-form"
import { authAction } from "../action/auth"
import SubmitBtn from "@/components/shared/submitBtn"
import AuthFooter from "./authFooter"
import { CardFooter } from "@/components/ui/card"
import ErrorMessage from "@/components/shared/errorMessage"

interface AuthFormProps {
    type: 'signup' | 'signin'
}

const AuthForm = ({type}: AuthFormProps) => {

    const renderInput = (label: string, id: string, type = 'text', required = false) => {
        return (
        <div className="flex flex-col gap-2">
            <InputForm label={label} id={id} type={type} required={required}/>
            {errors[id] && <ErrorMessage errors={errors[id][0]}/>}
        </div>
        )
    }

    const { errors, formAction, isPending, clearErrors } = useForm(authAction, '/')

    return (
        <Form
            action={formAction}
            onChange={clearErrors}
        >
            <CardContent className='flex flex-col gap-3'>
                {type === 'signup' && renderInput('ชื่อผู้ใช้', 'name')}
                {renderInput('อีเมล', 'email', 'email', true)}
                {renderInput('รหัสผ่าน', 'password', 'password', true)}
                {type === 'signup' &&
                renderInput('ยืนยันรหัสผ่าน', 'confirmPassword', 'password', true)}
            </CardContent>
            <CardFooter className='pt-4 flex flex-col gap-2'>
                <AuthFooter type={type} />
                <SubmitBtn
                    name={type === 'signup' ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'}
                    className='w-full'
                    pending={isPending}
                />
            </CardFooter>
    </Form>
    )
}

export default AuthForm
