import type {FastifyPluginAsyncZod} from "fastify-type-provider-zod"
import {loginSchema,loginSchemaResponse} from "../../lib/zod/login-schema.ts"
import {verify} from "argon2"
import {z} from "zod"
import {or,eq} from "drizzle-orm"
import {user} from "../../db/schema/user.ts"
import { db } from "../../db/index.ts"


export const userLogin:FastifyPluginAsyncZod= async(server)=>{
    server.get("/login",{
        schema:{
            body:loginSchema,
            response:z.object({
                200:loginSchemaResponse,
                401:z.object({
                    message:z.string()
                })
            })
        }

    },async(request,reply)=>{
        const {email,password} =request.body

        const [userLogin]= await db.select().from(user)
        .where(eq(user.email,email))
        .limit(1)

        if(!user?.password){
            return reply.status(401).send({message:"Credenciais inválidos"})
        }

        const passwordMatch= await verify(userLogin.password,password)

        if(!passwordMatch){
            return reply.status(401).send({message:"Email ou senha  inválido"})
        }
    })
}