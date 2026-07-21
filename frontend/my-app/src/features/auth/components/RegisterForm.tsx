import RegisterImage from '@/assets/Sign up-bro.svg';
import Image from 'next/image';
import Link from 'next/link';
import { MailIcon, LockIcon, User, Phone, Lock } from 'lucide-react';

export default function RegisterForm() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center lg:py-5 lg:px-4">
      <div className="w-full max-w-6xl  grid  lg:grid-cols-2 gap-2 items-center justify-center overflow-hidden lg:rounded-3xl lg:shadow-2xl">
        <div className="flex items-center justify-center p-10  ">
          <Image
            src={RegisterImage}
            alt="Football Illustration"
            className="w-full max-w-md h-auto"
            priority
          />
        </div>

        <div className="relative flex flex-col p-5 justify-center lg:rounded-none md:rounded-none h-full  text-gray-700 lg:mt-0">

          <div className="mb-6 ">
            <h2 className="text-left text-3xl font-bold">Cadastrar</h2>
            <p className="text-left">Por favor, registre-se para continuar.</p>
          </div>

          <form className="space-y-5">

            <div className="space-y-1">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 bg-zinc-100  rounded-2xl outline-none transition-all  focus:right-2 focus:ring-emerald-200"
                  type="text"
                  placeholder="Nome de usuário"/>
              </div>
            </div>

            <div className="space-y-1">
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  placeholder="Número de celular"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-100  rounded-2xl outline-none transition-all  focus:right-2 focus:ring-emerald-200"
                />
              </div>
            </div>

            <div className="relative">
              <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5  text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 bg-zinc-100 text-gray-400 rounded-2xl outline-none transition-all  focus:right-2 focus:ring-emerald-200"
                required
              />
            </div>

            <div className="relative">
              <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="Password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 bg-zinc-100 text-gray-400  rounded-2xl outline-none transition-all focus:right-2 focus:ring-zinc-200"
                required
              />
            </div>

            <div className="space-y-1">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Confirmar senha"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-100  rounded-2xl outline-none transition-all text-gray-400 focus:right-2 focus:ring-zinc-200"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 px-2 py-1">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 accent-gray-600 rounded border-gray-300"
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
              className="bg-gray-600 w-full rounded-2xl py-4 text-white hover:bg-gray-800"
            >
              Entrar
            </button>
                 <div className="mt-6 text-center text-sm pb-4">
            <Link href="/login" className="text-gray-500">
              Já possui uma conta?{" "}
              <span className="text-gray-600 font-bold hover:underline">Faça login</span>
            </Link>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}
