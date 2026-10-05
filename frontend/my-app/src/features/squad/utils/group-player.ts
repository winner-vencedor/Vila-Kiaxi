import { players } from "@/data/mockei-plantel"
import { PlantelPlayer } from "../types/plantel-player"

export const groupedplayers=players.reduce<Record<string,PlantelPlayer[]>>((acc,player)=>{
    const position=player.Position

    if(!acc[position]){
      acc[position]=[]
    }
    acc[position].push(player)
    return acc
  },{} )
