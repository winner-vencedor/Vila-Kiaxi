import type {FastifyPluginAsyncZod} from "fastify-type-provider-zod"
import {hasToken} from "../../utils/hash.ts"
import {generateRefreshToken} from "../../utils/token.ts"
import {db} from "../../db/index.ts"
import {passwordResetToken,user} from "../../db/schema/index.ts"
import {sendPasswordReset} from "../../services/resendEmail.ts"
import {eq} from "drizzle-orm"
import {z} from "zod"


export const forgotPassword:FastifyPluginAsyncZod=async (server)=>{
    server.post("/forgot-password",{
        schema:{
            body:z.object({
                email:z.string().email()
            }),
            response:{
                    200:z.object({
                        message:z.string()
                    })
            }
        }
    },async (request,reply)=>{
        const {email}=request.body


        const [currentUser]= await db.select().
        from(user).
        where(eq(user.email,email))
        .limit(1)

        if(!currentUser){
            return reply.status(200).send({message: "Se o email existir, enviaremos instruções para recuperação da senha."})
        }

        const token=generateRefreshToken()
        const tokenHash=hasToken(token)

        await db.insert(passwordResetToken).values({
            userId:currentUser.id,
            tokenHash,
            expiresAt:new Date(
                Date.now() + 1000 * 60 * 15
            )
        })

        // console.log( `http://localhost:3000/reset-password?token=${token}`)

        await sendPasswordReset(currentUser.email,token)

        return reply.status(200).send({message:"Se o email existir, enviaremos instruções para recuperação da senha."})
    })
}