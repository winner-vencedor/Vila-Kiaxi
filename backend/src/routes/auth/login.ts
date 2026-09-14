import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import {
  loginSchema,
  loginSchemaResponse,
} from "../../lib/zod/login-schema.ts";
import { comparePassword } from "../../utils/password.ts";
import { createAccessToken, generateRefreshToken } from "../../utils/token.ts";
import { hasToken } from "../../utils/hash.ts";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { user } from "../../db/schema/user.ts";
import { refreshToken } from "../../db/schema/refresh-token.ts";
import { db } from "../../db/index.ts";

export const userLogin: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/login",
    {
      schema: {
        tags: [`login`],
        summary: `user login`,
        description: `this route make user login`,
        body: loginSchema,
        response:{
          200: z.object(
            {message:z.string()}
          ),
          401: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body;

      const [userLogin] = await db
        .select()
        .from(user)
        .where(eq(user.email, email))
        .limit(1);

      if (!user?.password) {
        return reply.status(401).send({ message: "Credenciais inválidos" });
      }

      const passwordMatch = await comparePassword(userLogin.password, password);

      if (!passwordMatch) {
        return reply.status(401).send({ message: "Email ou senha  inválido" });
      }

      const accessToken = createAccessToken(
        server,
        userLogin.id,
        userLogin.role,
      );

      const refreshTokens = generateRefreshToken();
      const refreshTokenHash = hasToken(refreshTokens);

      await db.insert(refreshToken).values({
        userId: userLogin.id,
        tokenHash: refreshTokenHash,
        expiresAt: new Date(Date.now() + 1000 * 60 * 24 * 7),
      });

      reply.setCookie("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 15,
      });

      reply.setCookie("refresh_token", refreshTokens, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/auth/refresh",
        maxAge: 60 * 60 * 24 * 7,
      });

      return reply.status(200).send({message:"sucesso"});
    },
  );
};
