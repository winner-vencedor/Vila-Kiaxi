import fp from "fastify-plugin"
import FastifyCookie, { fastifyCookie } from "@fastify/cookie"

export default fp(async(server)=>{
    return await server.register(fastifyCookie)
})