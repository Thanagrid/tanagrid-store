import { getUserById } from "@/features/user/db/user"
import { signupSchema, signinSchema } from "../schemas/auth"
import { prisma } from "@/lib/db"
import { hash, genSalt, compare } from "bcryptjs"
import { SignJWT } from 'jose'
import { cookies, headers } from "next/headers"
import { revalidateUserCache } from "@/features/user/db/cache"


interface SignupInput {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

interface SigninInput {
    email: string,
    password: string
}

const generateJWWTToken = async (userID: string) => {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KET);
    return await new SignJWT({id: userID})
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt() //iat: ms
        .setExpirationTime('30d')
        .sign(secret)
}

const setCookieToken = async (token: string) => {
    const cookie = await cookies();
    cookie.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60*60*24*30
    })
}

export const signup = async (input: SignupInput) => {
    try{
        const {success, data, error} = signupSchema.safeParse(input)

        if(!success){
            return {
                message: 'กรุณากรอกข้อมูลให้ถูกต้อง',
                error: error?.flatten().fieldErrors
            }
        }

        const user = await prisma.user.findUnique({
            where: {
                email: data?.email
            }
        })

        if(user){
            return {
                message: 'อีเมลนี้มีผู้ใช้งานแล้ว'
            }
        }

        const salt = await genSalt(10);
        const hashedPassword = await hash(data.password, salt)

        const newUser = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword
            }
        })

        const token = await generateJWWTToken(newUser.id)
        await setCookieToken(token)

        revalidateUserCache(newUser.id)


    }catch(err){
        console.error(err)
        return {
            message: 'เกิดข้อผิดพลาดในการสมัครสมาชิก'
        }
    }
}

export const signin = async (input: SigninInput) => {
    try{
        const {success, data, error} = signinSchema.safeParse(input);

        if(!success){
            return {
                message: 'กรุณากรอกข้อมูลให้ถูกต้อง',
                error: error.flatten().fieldErrors
            }
        }

        const user = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })

        if(!user){
            return {
                message: 'อีเมล หรือรหัสผ่านไม่ถูกต้อง'
            }
        }

        if(user.status !== 'Active'){
            return {
                message: 'บัญชีของคุณไม่พร้อมใช้งาน'
            }
        }

        const isValidPassword = await compare(data.password, user.password);

        if(!isValidPassword){
            return {
                message: 'อีเมล หรือรหัสผ่านไม่ถูกต้อง'
            }
        }

        const token = await generateJWWTToken(user.id)
        await setCookieToken(token)

    }catch(error){
        console.error(`Error sign in ${error}`);
        return {
            message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ'
        }
    }
}

export const authCheck = async () => {
    const header = await headers()
    const userId = header.get('x-user-id')
    
    if(!userId){
        return null
    }
    
    const user = await getUserById(userId)

    return user
}

export const signout = async () => {
    try{
        const cookie = await cookies()
        cookie.delete('token')
    }catch(err){
        console.error(err);
        return {message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ'}
    }
}