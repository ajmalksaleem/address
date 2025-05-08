import CommonForm from "@/components/common/Form";
import { registerFromControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { SignUpAction } from "@/redux/auth/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"


const Signup = () => {
  const [FormData, setFormData] = useState({});
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {toast} = useToast()

const onSubmit = async (e)=>{
  e.preventDefault()
const data = await dispatch(SignUpAction(FormData))
  if(data?.payload?.success){
    toast({
      title : 'SignUp Successfull',
      description : data?.payload?.message,
      variant: "success",
    })
    navigate('/auth/sign-in')
  }else{
    console.log(data)
    toast({
      title : 'SignUp Failed',
      description : data?.payload?.error?.message,
      variant: "destructive",
    })
  }
}
  

  return (
    <div className="mx-auto w-full max-w-md space-y-6 ">
      <div className="text-center ">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Create new Account</h1>
        <p className="mt-2">Already have an account?
          <Link className="text-indigo-500 hover:underline font-medium" to='/auth/sign-in'>{' '}SignIn</Link>
        </p>
      </div>
      <CommonForm 
      formControls={registerFromControls}
      buttonText='Create an Account'
      formData={FormData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      />
    </div>
  )
}

export default Signup