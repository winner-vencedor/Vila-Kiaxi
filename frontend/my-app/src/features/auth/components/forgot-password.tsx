"use client"


import { MailIcon } from 'lucide-react';
import {useRouter} from "next/navigation"
import {useForgotPassword} from "@/features/auth/hooks/useForgot-password"
import { forgotPasswordData } from '../schemas/forgot-password';
import { Button } from '@/components/ui/button';

export default function ForgotPassword() {
  const {handleSubmit,register,formState:{errors}} =useForgotPassword()
  const router=useRouter()

  function forgotpassword(data:forgotPasswordData){
      if(data.email==="winner@gmail.com"){
            router.push("/forgot-password/reset-password")
      }else{
        alert("email errado")}
  }
  return (
    <div className="  flex flex-col justify-center items-center gap-10  p-2 ">
      <h2 className="text-2xl text-gray-900 font-mono">Recuperar a senha</h2>

      <div className="space-y-6">
        <div className='p-2'>
          <p className="text-sm md:text-xl text-gray-900">
                Para poder recuperar a senha precisa enviar o seu email para
            confirmar
          </p>
        </div>
        <form
        onSubmit={handleSubmit(forgotpassword)}
        className=" flex flex-col justify-center gap-3  md:items-center p-2    ">
          <div>
          <div className="relative">
            <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5  text-gray-900" />
            <input
              placeholder="Digite o Email"
              className="bg-gray-100 w-full md:w-100 p-2 pl-10 rounded-md border border-gray-400 outline-0 placeholder-gray-900"
              {...register("email")}
            />

          </div>
          <div>
              {errors.email && <span className="text-red-600">{errors.email.message}</span>}
            </div>
          </div>

          <div className='flex justify-end'>
            <Button
            type='submit'
              className={`bg-gray-400 p-2 text-gray-900  text-sm  hover:bg-gray-500 `}
            >
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
