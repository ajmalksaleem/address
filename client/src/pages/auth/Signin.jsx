import CommonForm from "@/components/common/Form";
import { loginFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { SigInAction } from "@/redux/auth/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [FormData, setFormData] = useState({});
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {toast} = useToast()
  
  const onSubmit = async (e)=>{
    e.preventDefault()
  const data = await dispatch(SigInAction(FormData))
    if(data?.payload?.success){
      toast({
        title : 'SignIn Successfull',
        description : data?.payload?.message,
        variant: "success",
      })
      navigate('/shop')
    }else{
      toast({
        title : 'SignIn Failed',
        description : data?.payload?.error?.message,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6 ">
      <div className="text-center ">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Create new Account</h1>
        <p className="mt-2">Don't have an Account?
          <Link className="text-indigo-500 hover:underline font-medium" to='/auth/sign-up'>{' '}SignUp</Link>
        </p>
      </div>
      <CommonForm 
      formControls={loginFormControls}
      buttonText='SignIn to Your Account'
      formData={FormData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      />
    </div>
  )
}

export default Signin