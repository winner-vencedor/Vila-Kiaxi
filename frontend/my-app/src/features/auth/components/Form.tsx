"use client"


import Link from 'next/link';
import { MailIcon, LockIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import {useRouter} from "next/navigation"
import {UserLoginFormSchema} from "@/features/auth/schemas/LoginUserSchema"
import { useState } from 'react';

type UserLoginFormData=z.infer<typeof UserLoginFormSchema>

export default function FormLogin() {
const {register ,
  handleSubmit,
   formState:{errors}}
   =useForm<UserLoginFormData>({
    resolver:zodResolver(UserLoginFormSchema)
   })
const [show,setShow]=useState("")

const {push}=useRouter()



  function createUser(data:UserLoginFormData){
    ///dentro desta função vou fazer a verificação ou o get para o meu banco de dados se o usuario existe ou não
    const error="email e senha errada"
     const emeil="winner@gmail.com"
    const pass="winner1234"
    if(data.email===emeil && data.password===pass){
        push("/painel")
    }else{
        setShow(error)
    }

    // setShow(JSON.stringify(data,null,2))
  }

  return (
    <div className="">
      <div className="relative flex flex-col p-5 justify-center lg:rounded-none md:rounded-none h-full  text-gray-700 lg:mt-0">
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
              className="w-full pl-10 pr-4 py-3 bg-zinc-100  rounded-2xl outline-none transition-all text-gray-600  "
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
              className="w-full pl-10 pr-4 py-3 bg-zinc-100 text-gray-600  rounded-2xl outline-none transition-all "
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
              <Link href="/recover">Esqueceu a senha?</Link>
            </div>
          </div>
          <Button
            type="submit"
            className="bg-gray-600 w-full rounded-2xl p-6 font-mono text-white hover:bg-gray-800"
          >
            Entrar
          </Button>
        </form>

        <div className="mt-8 text-sm space-x-2 text-center">
          <Link
            href="/cadastrar"
            className="text-gray-600 font-normal hover:underline"
          >
            Não tens uma conta?{' '}
            <span className="text-gray-600 font-bold hover:underline">
              Criar conta
            </span>
          </Link>
          <pre>{show}</pre>
        </div>
      </div>
    </div>
  );
}
