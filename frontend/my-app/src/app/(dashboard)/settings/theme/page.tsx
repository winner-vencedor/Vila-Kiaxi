"use client"


import { useTheme } from "next-themes"
import {useRouter} from "next/navigation"
import { Check, Moon, Sun, Monitor,ArrowLeft } from "lucide-react"


export default function ThemeSelector() {
  const { theme, setTheme } = useTheme()
    const router=useRouter()

  return (
    <div className="space-y-2">

        <button
        onClick={()=>router.back()}
        className="flex gap-2 items-center">
            <ArrowLeft/>
            <span>voltar</span>
        </button>


      <button
        onClick={() => setTheme("light")}
        className="flex w-full items-center justify-between rounded-xl p-4 hover:bg-muted"
      >
        <div className="flex items-center gap-3">
          <Sun className="h-5 w-5" />
          <span>Light</span>
        </div>


        {theme === "light" && (
          <Check className="h-5 w-5 text-primary" />
        )}
      </button>


      <button
        onClick={() => setTheme("dark")}
        className="flex w-full items-center justify-between rounded-xl p-4 hover:bg-muted"
      >
        <div className="flex items-center gap-3">
          <Moon className="h-5 w-5" />
          <span>Dark</span>
        </div>


        {theme === "dark" && (
          <Check className="h-5 w-5 text-primary" />
        )}
      </button>


      <button
        onClick={() => setTheme("system")}
        className="flex w-full items-center justify-between rounded-xl p-4 hover:bg-muted"
      >
        <div className="flex items-center gap-3">
          <Monitor className="h-5 w-5" />
          <span>System</span>
        </div>


        {theme === "system" && (
          <Check className="h-5 w-5 text-primary" />
        )}
      </button>


    </div>
  )
}


///melhorar os themes para ele adaptart no meu código
