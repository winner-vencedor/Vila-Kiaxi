import {resend} from "../lib/resend.ts"

export async function sendPasswordReset(email:string,token:string){
    const reserUrl=`http://localhost:3000/reset-password?token=${token}`

    const {data,error}= await resend.emails.send({
        from:"onboarding@resend.dev",
        to:email,
        subject:"redefinir senha",
        html: `
      <h1>Redefinição de senha</h1>
      <p>Clique no link abaixo para redefinir sua senha:</p>
      <a href="${reserUrl}">Redefinir senha</a>
      <p>Este link expira em 15 minutos.</p>
    `,
        
    })
    if(error){
        throw new Error(error.message)
    }

    return data
}