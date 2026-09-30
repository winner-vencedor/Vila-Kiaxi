

import {
  createUserFormData,
  createUserFormSchema,
} from '@/features/auth/schemas/CreateUserFormSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useState } from 'react';

export function useRegisterForm() {
  const [showSuccess,setShowSucess]=useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<createUserFormData>({
    resolver: zodResolver(createUserFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      password_confirm: '',
      terms: false,
      gender: 'MALE',
    },
  });

   async function create(data:createUserFormData){


    try{
      const response=await fetch("/api/auth/register",{
        method:"POST",
        headers:{
           "Content-Type": "application/json"
        },
        body:JSON.stringify(data)
      })

      const result= await response.json()

      if(!response.ok){

           toast.error(result.message || "Ocorreu um erro ao realizar o cadastro.");
      return;
      }


        // toast.success("Cadastro realizado com sucesso!")
  setShowSucess(true)
        console.log(result)
    }catch(err){
      console.log(err)
        toast.error("Não foi possível conectar ao servidor.");
    }
  }

  function resetSuccess() {
  setShowSucess(false);
}



  return { register, handleSubmit, formState: { errors, isValid },create ,showSuccess,resetSuccess};
}
