import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {EditProfileData,EditProfileSchema} from "../schema/edit-profile"


export function useEditProfile(){
    const {register,handleSubmit,formState:{errors}}=useForm<EditProfileData>({
        resolver:zodResolver(EditProfileSchema),
            mode:"onChange",
            defaultValues:{
             name:"",
                  email:"",
             phone:"",
             image:undefined,
             gender:""
            }
        }
    )
    return {register,handleSubmit,formate:{errors}}

}
