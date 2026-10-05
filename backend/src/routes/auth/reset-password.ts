import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { hashPassword } from "../../utils/password.ts";
import { hasToken } from "../../utils/hash-token.ts";
import { db } from "../../db/index.ts";
import { user, passwordResetToken } from "../../db/schema/index.ts";
import { z } from "zod";
import { eq, isNull, and } from "drizzle-orm";

export const resetPassword: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/reset-password",
    {
      schema: {
        body: z.object({
          token: z.string(),
          password: z
            .string()
            .min(8, "A senha deve ter pelo menos 8 caracteres")
            .regex(/[!@#$%^&*(),.?":{}|<>]/, {
              message: "A senha deve conter pelo menos um caractere especial",
            }),
        }),
        Response: {
          200: {
            message: z.string(),
          },
          400: {
            message: z.string(),
          },
        },
      },
    },
    async (request, reply) => {
      const { password, token } = request.body;

      const tokenHash = hasToken(token);

      const [resetToken] = await db
        .select()
        .from(passwordResetToken)
        .where(
          and(
            eq(passwordResetToken.tokenHash, tokenHash),
            isNull(passwordResetToken.usedAt),
          ),
        )
        .limit(1);

      if (!resetToken) {
        return reply.status(400).send({ message: "token inválido" });
      }

      if (resetToken.expiresAt < new Date()) {
        return reply.status(400).send({ message: "token revoagado" });
      }

      const passwordHash = await hashPassword(password);

      await db
        .update(user)
        .set({
          password: passwordHash,
          updatedAt: new Date(),
        })
        .where(eq(user.id, resetToken.userId))
        .returning();

      await db
        .update(passwordResetToken)
        .set({
          usedAt: new Date(),
        })
        .where(eq(passwordResetToken.id, resetToken.id))
        .returning();

      return reply.status(200).send({ message: "senha alterada com sucesso" });
    },
  );
};
