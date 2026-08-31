import {createUserFormData,createUserFormSchema} from "@/features/auth/schemas/CreateUserFormSchema"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"



  export function useRegisterForm() {
  const {register,
    handleSubmit,
    formState:{errors,isValid}}
    =useForm<createUserFormData>({
    resolver:zodResolver(createUserFormSchema ),
    mode:"onChange",
    defaultValues:{
      name:"",
      phone:"",
      email:"",
      password:"",
      password_confirm:"",
      terms:false,
      gender:"",
  }
})

return {register, handleSubmit, formState:{errors, isValid}}

}



