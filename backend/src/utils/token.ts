import crypto from "node:crypto";
import type { FastifyInstance } from "fastify";

export function generateRefreshToken() {
  return crypto.randomBytes(64).toString("base64url");
}

export function createAccessToken(
  server: FastifyInstance,
  userId: string,
  role: string,
) {
  return server.jwt.sign(
    {
      sub: userId,
      role,
    },
    {
      expiresIn: "15m",
    },
  );
}
