import Link from "next/link";
import {
MailIcon,
LockIcon
} from "lucide-react";


export default function FormLogin(){
    return(

      <div className="relative flex flex-col p-8 justify-center rounded-t-[50px] lg:rounded-none md:rounded-none h-full text-zinc-900 lg:mt-0  md:bg-white">
        <div className="mb-5 ">
          <h2 className="text-3xl text-emerald-600 font-bold lg:text-left text-center">Login</h2>
          <p className=" hidden md:block text-sl font-mono text-zinc-600 text-center lg:text-left ">Footbal Vila-Kiaxi</p>
        </div>

        <form action="" className="space-y-5">
          <div className="relative">
            <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 " />
            <input type="email"
            placeholder="Email"
            className="w-full pl-10 pr-4 py-3 bg-zinc-50  rounded-2xl outline-none transition-all border-2 border-emerald-300 focus:right-2 focus:ring-emerald-200"
            required
            />
          </div>

            <div className="relative">
            <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 " />
            <input type="Password"
            placeholder="Password"
            className="w-full pl-10 pr-4 py-3 bg-zinc-50  rounded-2xl outline-none transition-all  border-2 border-emerald-300 focus:right-2 focus:ring-zinc-200"
            required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label htmlFor=""className="flex items-center gap-2 text-zinc-600">
              <input type="checkbox" className="accent-emerald-300 cursor-pointer" />
              Lembrar-me
            </label>
            <Link href="#" className="font-medium text-zinc-600" >
            Esqueceu a senha?
            </Link>
          </div>
          <button
          type="submit"
          className="bg-emerald-600 w-full rounded-2xl py-4 text-white hover:bg-emerald-800"
          >
            Entrar
          </button>
        </form>

        <div className="mt-8 text-sm">
          <span>Não tens uma conta?</span>
          <Link href="Cadastrar" className="text-emerald-600 font-normal">
            Criar conta
          </Link>
        </div>
      </div>
    )
}
