import {z} from "zod"
export const loginSchema=z.object({
    email:z.string().email(),
    password:z.string().min(8, "A senha deve ter pelo menos 8 caracteres")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "A senha deve conter pelo menos um caractere especial",
    })
})



export const loginSchemaResponse=z.object({
    user:z.object({
        id:z.string().uuid(),
        name:z.string(),
        email:z.string(),
        role:z.enum(["USER","PLAYER","ADMIN"]),
        gender:z.enum(["MALE","FEMALE"]),
        photo:z.string().nullable()
    }),
    
})