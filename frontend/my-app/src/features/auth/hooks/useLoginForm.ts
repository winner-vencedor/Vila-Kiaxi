import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {UserLoginFormSchema,UserLoginFormData} from "@/features/auth/schemas/LoginUserSchema"

export function useLoginForm() {
  const {register,
    handleSubmit,
    formState:{errors,isValid}}
    =useForm<UserLoginFormData>({
    resolver:zodResolver(UserLoginFormSchema ),
    mode:"onChange",
    defaultValues:{
      email:"",
      password:"",
      password_remember:false
  }
})

return {register, handleSubmit, formState:{errors, isValid}}

}
