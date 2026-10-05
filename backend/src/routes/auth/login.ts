import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import {LoginService} from "../../services/auth/login.service.ts"
import {LoginController} from "../../controllers/auth/login.controller.ts"
import {RefreshTokenRepository} from "../../repository/auth/refresh-token.repository.ts"
import {userRepository, UserRepository} from "../../repository/auth/user.repository.ts"
import {
  loginSchema
} from "../../lib/zod/login-schema.ts";
import { z } from "zod";
import { createAccessToken, generateRefreshToken } from "../../utils/token.ts";
import { db } from "../../db/index.ts";
import { user } from "../../db/schema/user.ts";
import { refreshToken} from "../../db/schema/refresh-token.ts";
import { eq } from "drizzle-orm";
import { comparePassword} from "../../utils/password.ts";
import { hasToken} from "../../utils/hash-token.ts";

export const userLogin: FastifyPluginAsyncZod = async (server) => {

  // const loginService=new LoginService(
  //   new UserRepository(),
  //   new RefreshTokenRepository(),
  //   (email,password,role)=>createAccessToken(server,email,password,role)
  // )

  // const loginController=new LoginController(loginService)
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
            {message:z.string(),}
          ),
          401: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
    //  loginController.login(request.body.email,request.body.password,reply)
      const {email,password}=request.body
    const users= await userRepository.findByEmail(email)
    // db.select().from(user).where(eq(user.email,email)).limit(1)

    if(!users){
      return reply.status(401).send({message:"Email ou senha errada"})
    }

    const passwordIsValid=await comparePassword(password,users.password)

    if(!passwordIsValid){
      return reply.status(401).send({message:"Email ou senha errada"})
    }
    const accessToken=createAccessToken(
        server,
        users.email,
        users.id,
        users.role  
      )

      const refreshTokens=generateRefreshToken()
      const refreshTokenHash= hasToken(refreshTokens)

      await db.insert(refreshToken).values({
        userId:users.id,
        tokenHash: refreshTokenHash,
        expiresAt:new Date(Date.now() + 1000 *60 *60 * 27* 7)
      })

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
