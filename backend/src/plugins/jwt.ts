import "dotenv/config"
import fp from "fastify-plugin"
import fastifyJwt from "@fastify/jwt"


export default fp (async (server)=>{
    await server.register(fastifyJwt,{
        secret:process.env.JWT_SECRET!
    })
})