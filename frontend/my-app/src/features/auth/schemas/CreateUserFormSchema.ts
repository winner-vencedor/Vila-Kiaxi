import { z} from "zod"

export const createUserFormSchema=z.object({
    name:z.string()
    .nonempty("O nome é obrigatório")
    .transform(name => {
        return name.trim().split(` `).map(word=>{
            return word[0].toLocaleUpperCase().concat(word.substring(1))
        }).join(` `)
    }),
    phone:z.string()
    .min(9, "Número inválido")
    .max(9, "Número inválido")
    .regex(   /^(\+244|244|0)?9[1-9]\d{7}$/, "Formato inválido"),
    email:z.string()
    .nonempty("O email é obrigatório")
    .email("Formato de email inválido"),
    password:z.string()
    .min(8,"A senha precisa no mínimo 8 caracteres"),
    password_confirm:z.string(),
    terms:z.boolean().refine((value)=>value===true),
    gender:z.string()

}).superRefine((data,ctx)=>{
    if(data.password !== data.password_confirm){
        ctx.addIssue({
            code:z.ZodIssueCode.custom,
            path:["password_confirm"],
            message:"As senhas não coincidem"
        })

        if(!data.terms){
            ctx.addIssue({
                code:z.ZodIssueCode.custom,
                path:["terms"]
            })
        }
    }
})

export type createUserFormData=z.infer<typeof createUserFormSchema>
