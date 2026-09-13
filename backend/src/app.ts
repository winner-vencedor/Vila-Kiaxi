import fastify from "fastify"
import {validatorCompiler,serializerCompiler,type ZodTypeProvider,jsonSchemaTransform} from "fastify-type-provider-zod"
import {fastifySwagger} from "@fastify/swagger"
import {fastifySwaggerUi} from "@fastify/swagger-ui"
import {registerUser} from "./routes/auth/register.ts"

const server=fastify({
    logger:true
}).withTypeProvider<ZodTypeProvider>()

server.register(fastifySwagger,{
    openapi:{
        info:{
            title:"FutVila-Kiaxi API",
            version:"1.0.0"
        }
    },
    transform:jsonSchemaTransform
})

server.register(fastifySwaggerUi,{
    routePrefix:"/vila-kiaxi/api-docs"
})



server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(registerUser,{prefix:"/auth"})


export {server}