import type {FastifyPluginAsyncZod} from "fastify-type-provider-zod"
import {registerSchema,registerResponse} from "../../lib/zod/register-schema.ts"
import {or,eq} from "drizzle-orm"
import {hash} from "argon2"
import {z} from "zod"
import {db} from "../../db/index.ts"
import {user} from "../../db/schema/user.ts"


export const registerUser:FastifyPluginAsyncZod= async(server)=>{
    server.post("/register",{schema:{
        tag:["register"],
        summary:"register user",
        body:registerSchema,
        response:{
            201:registerResponse,
            409:z.object({
                message:z.string()
            })
        }
    }

    },async(request,reply)=>{
        const {name,email,gender,password,phone,terms}=request.body

        const userExist=await db.query.user.findFirst({
            where:or(
                eq(user.email,email),
                eq(user.phone,phone)
            )
        })

        if(userExist){
            return reply.status(409).send({message:"Email ou Telefone já cadastrado"})
        }


        const passwordHash=await hash(password)

        const [userRegister]= await db.insert(user).values({
            name,
            email,
            gender,
            password:passwordHash,
            phone,
            terms,
        }).returning({
            name:user.name,
            email:user.email,
            gender:user.gender,
            phone:user.phone,
            terms:user.terms,
            createdAt:user.createdAt
        })

        return reply.status(201).send(userRegister)
    })
}