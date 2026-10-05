"use client"

import {Volleyball,CalendarPlusIcon} from "lucide-react"
import { Button } from "@/components/ui/button"
import {useRouter} from "next/navigation"

export default function HistoryHeader(){
        const router=useRouter()
    return(
        <header className="flex justify-between">
                <div className="flex gap-3 items-center">
                <Volleyball size={30} className="text-primary"/>
                <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-foreground">Histórico da Equipa</h1>
                <h6 className=" text-foreground hidden md:block">Acompanhe todos os jogos,resultados,e estatísticas da Vila-kiaxi</h6>
                </div>
                </div>
                <Button
                onClick={(()=>router.push("/appointments"))}
                className={`bg-slate-50 border border-border dark:hover:bg-muted hover:muted`}>
                    <CalendarPlusIcon  className="text-primary hover:text-foreground w-9 h-9"/>
                </Button>
            </header>
    )

}
