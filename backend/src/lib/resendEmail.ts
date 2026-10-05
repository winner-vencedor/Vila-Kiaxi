import nodemailer from "nodemailer"

const transporter=nodemailer.createTransport({
    host:"localhost",//em desenvolvimento usamos process.env.SMTP_HOST,da nossa provedora
    port:process.env.SMTP_PORT,
    secure:false//em desenvolvimento deve ser true
    // auth:{ //esta parte usamos apenas em desenvolvimento
    //     user:process.env.SMTP_USER,
    //     pass:process.env.SMTP_PASSWORD
    // }
})

export async function sendResetPassword(email:string,token:string){
      const resetLink = `http://localhost:3000/reset-password?token=${token}`;

      try{
              await transporter.sendMail({
                from:"winnerwr6@gmail.com",
                to:email,
                subject:"reset-password",
                html:`
                  <!DOCTYPE html>
                <h1>Recuperação de senha</h1>

      <p>Recebemos uma solicitação para alterar a sua senha.</p>

      <p>
        <a href="${resetLink}">
          Alterar minha senha
        </a>
      </p>

      <p>Este link expira em 15 minutos.</p>`
              })

      }catch(err){
        console.log(err)
      }



      
}
