
import Image from 'next/image';
import FootbalIlustration from '@/assets/Soccer-bro.svg';
import FormLogin from '@/features/auth/components/Form';

export default function LoginForm() {
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

        <div>
          <FormLogin />
        </div>
      </div>
    </div>
  );
}
