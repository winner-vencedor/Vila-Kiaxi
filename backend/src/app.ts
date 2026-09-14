import "dotenv/config"
import fastify from "fastify"
import {validatorCompiler,serializerCompiler,type ZodTypeProvider,jsonSchemaTransform} from "fastify-type-provider-zod"
import {fastifySwagger} from "@fastify/swagger"
import {fastifySwaggerUi} from "@fastify/swagger-ui"
import cors from "@fastify/cors"
import jwt from "./plugins/jwt.ts"


import {forgotPassword} from "./routes/auth/forgot-password.ts"
import {userLogin} from "./routes/auth/login.ts"
import {registerUser} from "./routes/auth/register.ts"
import {userRefreshToken} from "./routes/auth/refresh.ts"
import {userLogout} from "./routes/auth/logout.ts"
import cookie from "./plugins/cookie.ts"

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


// server.register(cors,{
//     origin:process.env.PORT,
//     credentials:true
// })

server.register(jwt)
server.register(cookie)


server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(registerUser,{prefix:"/auth"})
server.register(userLogin,{prefix:"/auth"})
server.register(userRefreshToken,{prefix:"/auth"})
server.register(userLogout,{prefix:"/auth"})
server.register(forgotPassword,{prefix:"/auth"})

export {server}