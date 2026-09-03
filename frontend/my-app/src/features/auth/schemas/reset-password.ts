import {z} from "zod"

export const resetPasswordSchema=z.object({
    password:z.string()
    .min(8,"8 caracteres no mínimo")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Senha deve conter pelo menos um caractere especial")
    .nonempty("Campo obrigatório "),
    confirm_password:z.string()
}).refine((data)=>data.password===data.confirm_password,{
  message:"As senhas não coencidem",
  path:["confirm_password"]
})


export type resetPasswordData=z.infer<typeof resetPasswordSchema>
