import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .nonempty('O email é obrigatório')
    .email('Formato de email inválido'),
});

export type forgotPasswordData = z.infer<typeof forgotPasswordSchema>;
