import { players } from "@/data/mockei-plantel";
import PlantelCardPlayers from "@/features/squad/components/plantel-card-player";
import PlantelHeader from "@/features/squad/components/plantel-header"


export default function dashboard(){
    return(
        <div className="bg-background dark:bg-background min-h-screen">
            <div className=" flex flex-col gap-5 p-2 pt-21 md:pt-2">
            <PlantelHeader/>
              <section>
                 <PlantelCardPlayers players={players}/>
              </section>


            </div>
        </div>
    )
}
