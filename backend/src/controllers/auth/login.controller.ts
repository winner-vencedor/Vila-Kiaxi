import type {FastifyReply} from "fastify"
import type {LoginService} from "../../services/auth/login.service.ts"


export class LoginController{
  private readonly loginService: LoginService;

  constructor(loginService: LoginService){
    this.loginService = loginService;
  }

    async login(email:string,password:string,reply:FastifyReply){
        const result =await this.loginService.execute(email,password)

        if(!result){
            return reply.status(401).send({message:"Credenciais inválidos"})
        }

        reply.setCookie("access_token", result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 15,
      });

      reply.setCookie("refresh_token", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/auth/refresh",
        maxAge: 60 * 60 * 24 * 7,
      });
            return reply.status(200).send({message:"sucesso"});

    }
}