import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  UserLoginFormSchema,
  UserLoginFormData,
} from '../schemas/LoginUserSchema';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useLoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserLoginFormData>({
    resolver: zodResolver(UserLoginFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      password_remember: false,
    },
  });

  async function userLogin(data: UserLoginFormData) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message);
        return;
      }

      router.push('/home');
    } catch (err) {
      console.log(err);
      toast.error('Não foi possível conectar ao servidor.');
    }
  }

  return { register, handleSubmit, formState: { errors, isValid }, userLogin };
}
