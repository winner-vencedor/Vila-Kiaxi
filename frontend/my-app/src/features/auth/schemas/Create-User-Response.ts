import { z} from "zod"

export const createUserResponse=z.object({
    user:z.object({
        id:z.string().uuid(),
        name:z.string(),
        email:z.string().email()
    }),
    message:z.string()

})


export type CreateUserResponse=z.infer<typeof createUserResponse>
