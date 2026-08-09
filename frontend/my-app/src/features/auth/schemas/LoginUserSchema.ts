import {z} from "zod"


export const UserLoginFormSchema=z.object({
    email:z.string()
    .nonempty("O email é obrigatório")
    .email("Formato de email inválido"),
    password:z.string().nonempty("A password é obrigatório"),
    password_remember:z.boolean()
})

export type UserLoginFormData=z.infer<typeof UserLoginFormSchema>
