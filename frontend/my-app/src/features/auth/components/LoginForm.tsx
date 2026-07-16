"use client";
import {useState} from "react";
import Image from "next/image";
import {BottomSheet } from "@/features/auth/components/customized/Bottom-Sheet/index"
import FootbalIlustration from "@/assets/Soccer-bro.svg";
import FormLogin from "@/features/auth/components/FormLogin";


export default function LoginForm() {
  const [open ,setopen] = useState(false);
  return (
    <div className="min-h-screen bg-white flex items-center justify-center lg:py-5 lg:px-4">
      <div className="w-full max-w-6xl  grid  lg:grid-cols-2 gap-4 items-center justify-center overflow-hidden lg:rounded-3xl lg:shadow-2xl">
      <div className="flex items-center justify-center p-10  ">
        <Image src={FootbalIlustration}
         alt="Football Illustration"
         className="w-full max-w-md h-auto"
         priority
         />
      </div>

        <div className="flex flex-col gap-6 items-center justify-center p-10 lg:hidden">
          <h1 className="text-3xl font-bold text-zinc-600">FutVila-Kiaxi</h1>


          <div className="flex flex-col  gap-4 ">
          <button className="text-black md:hidden bg-gray-200 rounded-2xl px-4 py-2 w-full text-xl font-semibold hover:bg-gray-500" onClick={()=>setopen(true)}>
              Login
          </button>

          <button className="text-black md:hidden bg-gray-200 rounded-2xl px-4 py-2 w-full text-xl font-mono hover:bg-gray-500" onClick={()=>setopen(true)}>
              Cadastrar
          </button>
          </div>



          <BottomSheet open={open} onClose={()=>setopen(false)}>
            <FormLogin />
          </BottomSheet>
        </div>
        <div className="hidden md:block">
          <FormLogin />
        </div>
      </div>
    </div>
  );
}
