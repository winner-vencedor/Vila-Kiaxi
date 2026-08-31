'use client';
import { useState } from 'react';
import Image from 'next/image';
// import { BottomSheet } from '@/features/auth/components/custom/Bottom-Sheet/index';
import FootbalIlustration from '@/assets/Soccer-bro.svg';
import FormLogin from '@/features/auth/components/Form';

export default function LoginForm() {
  const [open, setopen] = useState(false);
  return (
    <div className="min-h-screen flex bg-white text-gray-900 items-center justify-center">
      <div className="w-full max-w-6xl  grid  lg:grid-cols-2 gap-2 items-center justify-center ">
        <div className="flex items-center justify-center p-10  ">
          <Image
            src={FootbalIlustration}
            alt="Football Illustration"
            className="w-full max-w-md h-auto"
            priority
          />
        </div>

        {/* <div className="relative flex flex-col gap-5 p-4 h-full items-center md:block ">
          <div className="space-y-1 text-center md:hidden">
            <h1 className="text-3xl font-bold text-gray-600 lg:text-left">
              Vila-Kiaxi
            </h1>
            <p className="text-xl font-medium text-gray-600 lg:text-left">
              Bem-vindo de volta
            </p>
          </div>
          <div className="flex flex-col gap-3 ">
            <Button
              className="text-zinc-50 text-center md:hidden bg-gray-400 rounded-2xl p-4.5 w-full text-xl font-semibold hover:bg-gray-600"
              onClick={() => setopen(true)}
            >
              Login
            </Button>

            <Button className="text-zinc-100 text-center md:hidden bg-gray-400 rounded-2xl p-4.5 w-full text-xl font-semibold hover:bg-gray-600">
              <Link href="/register">Cadastrar</Link>
            </Button>
          </div>

          <div className="hidden md:block">
            <FormLogin />
          </div>

          <BottomSheet open={open} onClose={() => setopen(false)}>
            <FormLogin />
          </BottomSheet>
        </div> */}

        <div>
          <FormLogin />
        </div>
      </div>
    </div>
  );
}
