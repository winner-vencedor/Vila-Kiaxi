import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {resetPasswordData,resetPasswordSchema} from "../schemas/reset-password"


export function useResetPassword(){

 const {handleSubmit,register,formState:{errors}}=useForm<resetPasswordData>({
    resolver:zodResolver(resetPasswordSchema),
    mode:"onChange",
    defaultValues:{
        password:"",
        confirm_password:""
    }

})
    return{handleSubmit,register,formState:{errors}}
}
