import "dotenv/config";
import fastify from "fastify";
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import cors from "@fastify/cors";
import jwt from "./plugins/jwt.ts";

import { resetPassword } from "./routes/auth/reset-password.ts";
import { forgotPassword } from "./routes/auth/forgot-password.ts";
import { userLogin } from "./routes/auth/login.ts";
import { registerUser } from "./routes/auth/register.ts";
import { userRefreshToken } from "./routes/auth/refresh.ts";
import { userLogout } from "./routes/auth/logout.ts";
import cookie from "./plugins/cookie.ts";
import type { FastifyRequest, FastifyReply } from "fastify";

const server = fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "FutVila-Kiaxi API",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

server.register(fastifySwaggerUi, {
  routePrefix: "/vila-kiaxi/api-docs",
});

server.register(cors, {
  origin: process.env.FRONTEND_URL,
  credentials: true,
});

server.register(jwt);
server.register(cookie);

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(registerUser, { prefix: "/auth" });
server.register(userLogin, { prefix: "/auth" });
server.register(userRefreshToken, { prefix: "/auth" });
server.register(userLogout, { prefix: "/auth" });
server.register(forgotPassword, { prefix: "/auth" });
server.register(resetPassword, { prefix: "/auth" });

server.decorate(
  "authenticated",
  async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify();
    } catch {
      return reply.status(401).send({ error: "Token inválido ou expirado" });
    }
  },
);

server.decorate(
  "isAdmin",

  async function (request: FastifyRequest, reply: FastifyReply) {
    if (request.user.role !== "ADMIN") {
      return reply.status(403).send({
        message: "forbiden",
      });
    }
  },
);

export { server };
