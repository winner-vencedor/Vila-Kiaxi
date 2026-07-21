import './globals.css';
import { Metadata } from 'next';
import NotFoundImage from '@/assets/Monster 404 Error-bro.svg';
import Image from 'next/image';
import Link from 'next/link';
import {ArrowRight} from "lucide-react"

export const metadata: Metadata = {
  title: '404 -Not found',
  description: 'Página não encontrada',
};

export default function GlobalNotFound() {
  return (
    <div className="min-h-screen  flex flex-col justify-center items-center bg-gray-100">
      <Image src={NotFoundImage} alt="Not found" priority />
      <div>
        <Link href="/login" className='flex gap-3 hover:text-emerald-900 transition-all font-bold'>
          <p className="text-emerald-700">Voltar a página principal</p>
          <ArrowRight className='text-emerald-700'/>
        </Link>
      </div>
    </div>
  );
}
