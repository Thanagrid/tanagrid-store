import AuthHeader from "@/features/auths/components/authHeader"
import AuthForm from "@/features/auths/components/authForm"

const page = () => {
  return (
    <>
      <AuthHeader type="signin">
        <AuthForm  type="signin"/>
      </AuthHeader>
    </>
  )
}

export default page
