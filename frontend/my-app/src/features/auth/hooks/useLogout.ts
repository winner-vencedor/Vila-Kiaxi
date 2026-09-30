import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function useLogout(){
    const router = useRouter()

    async function logout(){
        try{
            const response=await fetch("/api/auth/logout",{
                method:"POST",
            })

            const result= await response.json()

            if(!response.ok){
                toast.error(result.message || "Logout com sucesso")
                return
            }

            toast.success(result.message)
            router.push("/login")
            router.refresh()


        }catch(err){
            console.log(err)
            toast.error("Não foi possível conectar ao servidor.")
        }
    }

    return {logout}
}
