import type {FastifyPluginAsyncZod} from "fastify-type-provider-zod"
import {z} from "zod"
import {hasToken} from "../../utils/hash.ts"
import {db} from "../../db/index.ts"
import {eq} from "drizzle-orm"
import {refreshToken} from "../../db/schema/refresh-token.ts"



export const userLogout:FastifyPluginAsyncZod=async (server)=>{
    server.post("/logout",{
        schema:{
            response:{
                200:z.object({
                    message:z.string()
                })
            }
        }
    },async (request,reply)=>{
        const refresTokens=request.cookies.refresh_token


        if(refresTokens){
            const tokenHash=hasToken(refresTokens)

            await db.update(refreshToken).set({
                revokeAt:new Date(),
            }).where(eq(refreshToken.tokenHash,tokenHash,))
        }

        reply.clearCookie("access_token",{
            path:""
        })

        reply.clearCookie("refresh_token",{
            path:"/auth/refresh"
        })

        return reply.status(200).send({message:"Logout realizado com sucesso"})

    })
}