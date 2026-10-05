
import {server} from "./app.ts"


server.listen({port:process.env.PORT ? parseInt(process.env.PORT) : 3000}).then(()=>{
    console.log(`server rodando http://localhost:${process.env.PORT}`)
    console.log(`swagger rodando na porta http://localhost:${process.env.PORT}/vila-kiaxi/api-docs`)
}).catch((err)=>{
    console.log(err)
})