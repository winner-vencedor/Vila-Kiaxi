import crypto from "node:crypto";
import type { FastifyInstance } from "fastify";

type UserRole = "USER" | "ADMIN" | "PLAYER";

export function generateRefreshToken() {
  return crypto.randomBytes(64).toString("hex");
}

export function createAccessToken(
  server: FastifyInstance,
  email:string,
  userId: string,
  role: UserRole,
) {
  return server.jwt.sign(
    {
      sub: userId,
      email:email,
      role:role
    },
    {
      expiresIn: "15m",
    },
  );
}
