"use client"


import Link from 'next/link';
import { MailIcon, LockIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {UserLoginFormData} from "@/features/auth/schemas/LoginUserSchema"
import { useState } from 'react';
import {useLoginForm} from "@/features/auth/hooks/useLoginForm"


export default function FormLogin() {
const {register, handleSubmit, formState:{errors}}=useLoginForm()
const [show,setShow]=useState("")

const router=useRouter()



  function createUser(data:UserLoginFormData){
    ///dentro desta função vou fazer a verificação ou o get para o meu banco de dados se o usuario existe ou não
    const error="email e senha errada"
     const emeil="winner@gmail.com"
    const pass="winner1234"
    if(data.email===emeil && data.password===pass){
        router.push("/home")
    }else if(data.email==="admin@gmail.com" && data.password==="admin"){
        router.push("/dashboard")
    }else{
      setShow(error)
    }

    // setShow(JSON.stringify(data,null,2))
  }

  return (
    <div className="bg-white text-gray-900">
      <div className="relative flex flex-col p-5 justify-center lg:rounded-none md:rounded-none h-full text-gray-900 lg:mt-0">
        <div className="mb-6 ">
          <h2 className="text-left text-3xl font-mono">Vila-Kiaxi</h2>
          <p className="text-left font-mono">Bem-vindo de volta.</p>
        </div>

        <form
        onSubmit={handleSubmit(createUser)}
        className="space-y-5">
           <div className="space-y-1">
          <div className="relative">
            <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5  text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-2xl outline-none transition-all text-gray-900 placeholder:text-gray-400"
              {...register("email")}
            />
          </div>
          {errors.email && <span className="text-red-600" >{errors.email.message}</span>}
          </div>

            <div className="space-y-1">
          <div className="relative">
            <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="Password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 bg-gray-100 text-gray-900 rounded-2xl outline-none transition-all placeholder:text-gray-400"
              {...register("password")}

            />
          </div>
          {errors.password && <span className='text-red-600'>{errors.password.message}</span>}
          </div>

          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 accent-gray-600 rounded border-gray-300 cursor-pointer"
                {...register("password_remember")}
              />
              <span className="font-mini">Lembrar da senha</span>
            </div>
            <div>
              <Link href="/forgot-password">Esqueceu a senha?</Link>
            </div>
          </div>
          <Button
            type="submit"
            className="bg-gray-600 text-white w-full rounded-2xl p-6 font-mono hover:bg-gray-700"
          >
            Entrar
          </Button>
        </form>

        <div className="mt-8 text-sm space-x-2 text-center">
          <Link
            href="/register"
            className="text-gray-500 font-normal hover:text-gray-900 hover:underline"
          >
            Não tens uma conta?{' '}
              <span className="text-gray-900 font-bold hover:underline">
              Criar conta
            </span>
          </Link>
          <pre>{show}</pre>
        </div>
      </div>
    </div>
  );
}
