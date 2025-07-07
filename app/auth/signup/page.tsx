import AuthForm from "@/features/auths/components/authForm"
import AuthHeader from "@/features/auths/components/authHeader"

const SingupPage = () => {

  const type = 'signup';

  return (
    <>
      <AuthHeader type={type}>
        <AuthForm type={type}/>
      </AuthHeader>
    </>
    
  )
}
export default SingupPage