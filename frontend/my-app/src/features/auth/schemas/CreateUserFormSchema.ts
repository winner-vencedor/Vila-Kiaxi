import { z } from 'zod';

export const createUserFormSchema = z
  .object({
    name: z
      .string()
      .nonempty('O nome é obrigatório')
      .min(10,"No minímo 10 caracteres")
      .max(100)
      .transform((name) => {
        return name
          .trim()
          .split(` `)
          .map((word) => {
            return word[0].toLocaleUpperCase().concat(word.substring(1));
          })
          .join(` `);
      }),
    phone: z
      .string()
      .regex(/^(\+244|244|0)?9[1-9]\d{7}$/, 'Formato inválido ex:923432234'),
    email: z
      .string()
      .nonempty('O email é obrigatório')
      .email('Formato de email inválido'),
    password: z.string().min(8, 'A senha precisa no mínimo 8 caracteres')
    .regex( /[!@#$%^&*(),.?":{}|<>]/, "Senha deve conter pelo menos um caractere especial"),
    password_confirm: z.string(),
    terms: z.boolean().refine((value) => value === true),
    gender: z.enum(["MALE","FEMALE"]),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.password_confirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['password_confirm'],
        message: 'As senhas não coincidem',
      });
      }
       if (!data.terms) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['terms'],
        });
    }
  });

export type createUserFormData = z.infer<typeof createUserFormSchema>;
