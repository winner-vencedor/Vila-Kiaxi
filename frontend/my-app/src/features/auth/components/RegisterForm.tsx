"use client"
import RegisterImage from '@/assets/Sign up-bro.svg';
import Image from 'next/image';
import Link from 'next/link';
import { MailIcon, LockIcon, User, Phone, Lock } from 'lucide-react';
import {createUserFormData} from "@/features/auth/schemas/CreateUserFormSchema"
import { useState} from 'react';
import {useRegisterForm} from "@/features/auth/hooks/registerForm"
import ModalSucess from "@/features/auth/components/SucessModal"
import {useRouter} from "next/navigation"

export default function RegisterForm() {
  const {register, handleSubmit, formState:{errors,isValid}}=useRegisterForm()
  const [ShowSucess,setShowSucess]=useState(false)
  const [show,setshow]=useState("")
  const router=useRouter()

   function create(data:createUserFormData){
    ///aqui dentro vou fazer o post para o banco de dados

       setShowSucess(true)
    // router.push("/home")


setshow(JSON.stringify(data,null,2))



  }


  return (
    <div className="min-h-screen bg-white flex items-center justify-center ">
      <div className="w-full max-w-6xl  grid  lg:grid-cols-2 gap-2 items-center justify-center ">
        <div className="flex items-center justify-center p-10   ">
          <Image
            src={RegisterImage}
            alt="Football Illustration"
            className="w-full max-w-md h-auto"
            priority
          />
        </div>

        <div className="relative flex flex-col p-5 justify-center lg:rounded-none md:rounded-none h-full  text-gray-700 lg:mt-0">
          <div className="mb-6 ">
            <h2 className="text-left text-3xl font-mono">Cadastrar</h2>
            <p className="text-left font-mono">Por favor, registre-se para continuar.</p>
          </div>

          <form
          onSubmit={handleSubmit(create)}
          className="space-y-5">
            <div className="space-y-1">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 bg-zinc-100  rounded-2xl outline-none transition-all  "
                  type="text"
                  placeholder="Nome de usuário"
                  {...register("name")}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  placeholder="Número de celular"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-100  rounded-2xl outline-none transition-all  "
                  {...register("phone")}
                />
              </div>
              {errors.phone && <span className='text-red-600'>{errors.phone.message}</span>}
            </div>

            <div className="space-y-1">
              <div className="text-gray-400">
                <label className="text-gray-400">Gênero</label>
                <select
                  className="w-full p-3 bg-zinc-100  rounded-2xl outline-none transition-all "
                  {...register("gender")}
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </select>
              </div>
            </div>

             <div className="space-y-1">
            <div className="relative">
              <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5  text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 bg-zinc-100  rounded-2xl outline-none transition-all"
                {...register("email")}

              />
            </div>
            {errors.email && <span className='text-red-600'>{errors.email.message}</span>}
            </div>

            <div className="space-y-1">
            <div className="relative">
              <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="Password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 bg-zinc-100 rounded-2xl outline-none transition-all"
                {...register("password")}
              />
            </div>
            {errors.password && <span  className='text-red-600'>{errors.password.message}</span>}
            </div>

            <div className="space-y-1">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Confirmar senha"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-100  rounded-2xl outline-none transition-all "
                  {...register("password_confirm")}
                />
              </div>
              {errors.password_confirm && <span className='text-red-600'>{errors.password_confirm.message}</span>}
            </div>

            <div className="flex flex-col gap-1 px-2 py-1">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 accent-gray-600 rounded border-gray-300"
                  {...register("terms")
                  }
                />
                <label htmlFor="terms" className="text-xs text-gray-500">
                  Eu aceito as{' '}
                  <span className="text-gray-600 font-medium underline">
                    políticas e termos
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className={` w-full rounded-2xl py-4 text-white font-mono ${
                isValid ? "bg-gray-600 hover:bg-gray-800" :"bg-gray-600"
              }`}
            >
              Cadastrar
            </button>
          </form>

          <div className="mt-6 text-center text-sm pb-4">
            <Link href="/login" className="text-gray-500">
              Já possui uma conta?{' '}
              <span className="text-gray-600 font-bold hover:underline">
                Faça login
              </span>
            </Link>
            <pre>{show}</pre>
          </div>
        </div>
      </div>
      {
                ShowSucess &&(
                  <ModalSucess
                    onclose={()=>setShowSucess(false)}
                  />
                )
              }
    </div>
  );
}
