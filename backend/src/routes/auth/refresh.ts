import type {FastifyPluginAsyncZod} from "fastify-type-provider-zod"
import {hasToken} from "../../utils/hash.ts"
import {createAccessToken,generateRefreshToken} from "../../utils/token.ts"
import {eq} from "drizzle-orm"
import  {z} from "zod"
import { db } from "../../db/index.ts"
import {user} from "../../db/schema/user.ts"
import {refreshToken} from "../../db/schema/refresh-token.ts"




export const userRefreshToken:FastifyPluginAsyncZod= async (server)=>{
    server.post("/refresh",{
        schema:{
        
            response:{
                200:z.object({
                    message:z.string(),
                }).describe(`sucess refreshToken `),
                401:z.object({
                    message:z.string()
                }).describe("UNAUTHORIZED")
            }
        }
    },async(request,reply)=>{

        const refreshTokens=request.cookies.refresh_token

        if(!refreshTokens){
            return reply.status(401).send({message:"Refresh token ausente"})
        }

        const tokenHash=hasToken(refreshTokens)


            const [storedToken]= await db.select({
                refreshTokenId:refreshToken.id,
                userId:user.id,
                role:user.role,
                revokeAt:refreshToken.revokeAt,
                expiresAt:refreshToken.expiresAt,
                tokenHash:refreshToken.tokenHash

            }).from(refreshToken)
            .innerJoin(user,eq(refreshToken.userId,user.id))
            .where(eq(refreshToken.tokenHash,tokenHash))
            .limit(1)

        if(!storedToken){
            return reply.status(401).send({message:"Refresh token inválido"})
        }

        if(storedToken.revokeAt){
            return reply.status(401).send({message:"Refresh token revogado"})
        }

        if(storedToken.expiresAt < new Date){
            return reply.status(401).send({message:"Refresh token expirado"})
        }

        await db.update(refreshToken).set({
            revokeAt:new Date()
        }).where(eq(refreshToken.id,storedToken.refreshTokenId))
        
        const newgenerateRefreshToken=generateRefreshToken()
        const newRefreshToken=hasToken(newgenerateRefreshToken)


        await db.insert(refreshToken).values({
            userId:storedToken.userId,
            tokenHash:newRefreshToken,
            expiresAt:new Date(
                Date.now() + 1000 * 60 * 60 * 24 * 7
            )
        })

        const newAccessToken=createAccessToken(
            server,
            storedToken.userId,
            storedToken.role
        )

        reply.setCookie("access_token",newAccessToken,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:"lax",
            path:"/",
            maxAge:60*15
        })


        reply.setCookie("refresh_token",newRefreshToken,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:"lax",
            path:"/auth/refresh",
            maxAge:60*60*24*7
        })

        return reply.status(200).send({message:"tokens renovados"})

    })
}