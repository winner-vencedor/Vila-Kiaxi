import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { forgotPasswordData, forgotPasswordSchema } from "../schemas/forgot-password"


export function useForgotPassword(){
    const {handleSubmit,register,formState:{errors}}=useForm<forgotPasswordData>({
        resolver:zodResolver(forgotPasswordSchema  ),
        mode:"onChange",
        defaultValues:{
            email:""
        }
    })

    return {handleSubmit,register,formState:{errors}}
}

