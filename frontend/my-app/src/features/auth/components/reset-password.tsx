"use client"

import { Button } from "@/components/ui/button";
import {useResetPassword} from "@/features/auth/hooks/useReset-password"
import {resetPasswordData} from "@/features/auth/schemas/reset-password"
import {useRouter} from "next/navigation"
export default function ResetPassword() {
  const router=useRouter()
  const {formState:{errors},handleSubmit,register}=useResetPassword()

  function resetpassword(data:resetPasswordData){
    if(data.password===data.confirm_password){
      router.push("/login")
    }
  }
  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-10  p-2 ">
      <div>
      <h1 className="text-xl font-mono text-gray-900">Inserir nova senha</h1>
      </div>

      <form
      onSubmit={handleSubmit(resetpassword)}
          className=" flex flex-col gap-5   "
      >
        <div className="space-y-2">
          <label htmlFor="">Nova senha</label>
          <div>
            <input
            className="w-full p-2 rounded-md  bg-gray-100 placeholder-gray-900 border-gray-400"
            {...register("password")}
            />
          </div>
            <div>
            {errors.password && <span className="text-red-400">{errors.password.message}</span>}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="">confirmar senha senha</label>
          <div>
            <input
            className="w-full p-2 rounded-md  bg-gray-100 placeholder-gray-900 border-gray-400"
            {...register("confirm_password")}
            />
          </div>
          <div>
            {errors.confirm_password && <span className="text-red-400">{errors.confirm_password.message}</span>}
          </div>
        </div>
        <div>
        <Button
        type="submit"
        className={`bg-gray-400 hover:bg-gray-700 flex justify-end`}
        >
          Enviar
        </Button>
        </div>
      </form>
    </div>
  );
}
