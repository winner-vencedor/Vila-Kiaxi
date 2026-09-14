import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import {hasToken} from "../../utils/hash.ts"
import {db} from "../../db/index.ts"
import {user,passwordResetToken} from "../../db/schema/index.ts"
import { z } from "zod";

export const resetPassword: FastifyPluginAsyncZod = async (server) => {
  server.post("/reset-password", {
    schema: {
      body: z.object({
        token: z.string(),
        password: z
          .string()
          .min(8, "A senha deve ter pelo menos 8 caracteres")
          .regex(/[!@#$%^&*(),.?":{}|<>]/, {
            message: "A senha deve conter pelo menos um caractere especial",
          })
      }),
      Response:{
            200:{
                message:z.string()
            }
          }
    },
  },async (request,reply)=>{

    const {password,token} =request.body

    const tokenHash=hasToken(token)

    const [resetToken]=await db.select().from(passwordResetToken)
  });
};
