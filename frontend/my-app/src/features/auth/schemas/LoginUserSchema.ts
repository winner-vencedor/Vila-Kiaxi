import {z} from "zod"


export const UserLoginFormSchema=z.object({
    email:z.string().nonempty("O email é obrigatório"),
    password:z.string().nonempty("A password é obrigatório"),
    password_remember:z.boolean()
})
