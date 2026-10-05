import { z } from "zod";
export const loginSchema = z.object({
  email: z.string().email().trim(),
  password: z
    .string()
    .nonempty('A password é obrigatório'),
    password_remember:z.boolean()
});

export const loginSchemaResponse = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string(),
  role: z.enum(["USER", "PLAYER", "ADMIN"]),
  gender: z.enum(["MALE", "FEMALE"]),
  photo: z.string().nullable(),
   createdAt:z.date(),
   updatedAt:z.date()
});
