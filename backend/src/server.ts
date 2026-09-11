
import {server} from "./app.ts"


server.listen({port:process.env.PORT ? parseInt(process.env.PORT) : 3000}).then(()=>{
    console.log(`server rodando`)
}).catch((err)=>{
    console.log(err)
})