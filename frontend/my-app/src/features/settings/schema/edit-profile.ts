import { z} from "zod"


export const EditProfileSchema=z.object({
    name:z.string()
    .optional(),
    email:z.string()
    .email("Email inválido")
    .or(z.literal(""))
    .optional(),
    phone:z.string()
    .optional(),
    image:z.custom<FileList>()
    .optional(),
    gender:z.enum(["Masculino","Feminino"],"Gênero inválido")
    .or(z.literal(""))
    .optional()

})

export type EditProfileData=z.infer<typeof  EditProfileSchema>
