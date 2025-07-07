import { useTransition } from 'react'
import { signOutAction } from '@/features/auths/action/auth'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const useSignOut = () => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleSignout = () => {
        startTransition(async () => {
            const result = await signOutAction()
            if(result.success) {
                toast.success(result.message)
                router.push('/auth/signin')
            }else{
                toast.error(result.message)
            }
        })
    }

    return {isPending, handleSignout}
}