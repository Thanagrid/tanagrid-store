import { NextRequest, NextResponse } from "next/server"
import { JWTPayload, jwtVerify } from 'jose'

interface Payload extends JWTPayload {
    id: string
}

const decryptJwtToken = async (token: string): Promise<Payload | null> => {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KET)
    try{
        const { payload } = await jwtVerify(token, secret);
        return payload as Payload
    }catch(error){
        console.log(error);
        return null
    }
}

export const middleware = async (req: NextRequest) => {
    const res = NextResponse.next();

    const token = req.cookies.get('token')?.value
    
    if(!token) return res

    const payload = await decryptJwtToken(token)
    const isTokenExpired = payload?.exp && payload.exp < Date.now() / 1000;

    if(!payload || isTokenExpired){
        res.cookies.delete('token');
        return res
    }

    res.headers.set('x-user-id', payload.id)
    return res
}

export const config = {
    matcher: [
        '/',
        '/auth/:path*',
        '/admin/:path*'
    ]
}