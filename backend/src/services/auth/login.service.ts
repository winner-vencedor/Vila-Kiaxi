
import type { RefreshTokenRepository } from "../../repository/auth/refresh-token.repository.ts";
import type {FastifyReply} from "fastify"
import type {  UserRepository} from "../../repository/auth/user.repository.ts";
import { hasToken } from "../../utils/hash-token.ts";
import { comparePassword } from "../../utils/password.ts";
import { generateRefreshToken } from "../../utils/token.ts";

type UserRole = "USER" | "ADMIN" | "PLAYER";

type SignAccessToken = (
	email: string,
	userId: string,
	role: UserRole,
) => string;

export class LoginService {
	private readonly users: UserRepository;
	private readonly refreshTokens: RefreshTokenRepository;
	private readonly signAccessToken: SignAccessToken;

	constructor(
		users: UserRepository,
		refreshTokens: RefreshTokenRepository,
		signAccessToken: SignAccessToken,
	) {
		this.users = users;
		this.refreshTokens = refreshTokens;
		this.signAccessToken = signAccessToken;
	}

	async execute(email: string, password: string) {
		const userRecord = await this.users.findByEmail(email);

		if (!userRecord) {
			return null;
		}

		const passwordMatches = await comparePassword(
			password,
			userRecord.password,
		);

		if (!passwordMatches) {
			return null;
		}

		const accessToken = this.signAccessToken(
			userRecord.email,
			userRecord.id,
			userRecord.role,
		);
		const rawRefreshToken = generateRefreshToken();
		const refreshTokenExpiresAt = new Date(
			Date.now() + 1000 * 60 * 60 * 24 * 7,
		);

		await this.refreshTokens.createRefreshToken({
			userId: userRecord.id,
			tokenHash: hasToken(rawRefreshToken),
			expiresAt: refreshTokenExpiresAt,
		});

		return { accessToken, refreshToken: rawRefreshToken };
	}
}