import type {FastifyRequest,FastifyReply} from "fastify"

declare module "fastify"{
    interface FastifyInstance{
        authenticated:(
            request:FastifyRequest,
            reply:FastifyReply
        )=> Promise<void>,
        isAdmin:(
            request:FastifyRequest,
            reply:FastifyReply
        )=> Promise<void>,
        checkPermition:(
            request:FastifyRequest,
            reply:FastifyReply
        )=>Promise <void>
    }
}

declare module "@fastify/jwt"{
    interface FastifyJWT{
        payload:{
            sub:string;
            email:string;
            role:"USER"|"ADMIN"|"PLAYER"
        }

        user:{
            sub:string;
            email:string;
            role:"USER"|"ADMIN"|"PLAYER"
        }
    }
}