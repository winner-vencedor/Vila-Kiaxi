import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(10).max(100),
  email: z.string().email().max(255),
  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "A senha deve conter pelo menos um caractere especial",
    }),
  phone: z.string().regex(/^(\+244|244|0)?9[1-9]\d{7}$/, {
    message:
      "O número de telefone deve começar com 9 e conter exatamente 9 dígitos",
  }),
  gender: z.enum(["MALE", "FEMALE"]),
  terms: z.boolean(),
  photo: z.string().optional(),
});


export const registerResponse=z.object({
    name:z.string(),
    email:z.string(),
    phone:z.string(),
    gender:z.enum(["MALE", "FEMALE"]),
    terms:z.boolean(),
    createdAt:z.date()
})


