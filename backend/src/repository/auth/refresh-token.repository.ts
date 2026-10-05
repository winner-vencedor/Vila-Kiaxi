import type {
  NewRefreshToken,
  RefreshToken,
} from "../../db/schema/refresh-token.ts";
import { eq } from "drizzle-orm";
import { refreshToken } from "../../db/schema/refresh-token.ts";
import { db } from "../../db/index.ts";

export class RefreshTokenRepository {
  async createRefreshToken(data: NewRefreshToken): Promise<RefreshToken> {
    const [refreshTokenRecord] = await db
      .insert(refreshToken)
      .values(data)
      .returning();
    return refreshTokenRecord;
  }

  async findRefreshTokenById(tokenHash: string): Promise<RefreshToken | null> {
    const [refreshTokens] = await db
      .select()
      .from(refreshToken)
      .where(eq(refreshToken.tokenHash, tokenHash))
      .limit(1);
    return refreshTokens || null;
  }

  async revokeRefreshToken(tokenHash: string): Promise<void> {
    await db
      .update(refreshToken)
      .set({ revokeAt: new Date() })
      .where(eq(refreshToken.tokenHash, tokenHash));
  }
}
