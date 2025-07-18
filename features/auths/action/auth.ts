'use server'

import { InitialFormState } from "@/types/action"
import { signin, signout, signup } from "../db/auth"

export const authAction = async (_prevState: InitialFormState, formData: FormData) => {
    const rawData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirmPassword') as string
    }

    // mock result
    const result = rawData.confirmPassword ? await signup(rawData) : await signin(rawData);
    

    return result && result.message 
    ? {
        success: false, 
        message: result.message, 
        errors: result.error
    } : {
        success: true, 
        message: rawData.confirmPassword ? 'สมัครสมาชิกสำเร็จ' : 'เข้าสู่ระบบสำเร็จ'
    }
}

export const signOutAction = async () => {
    const result = await signout()
    return result && result.message ? {success: false, message: result.message}
        : {success: true, message: 'ออกจากระบบ'}
}