import PlantelCardPlayers from "@/features/squad/components/plantel-card-player";
import PlantelHeaderMobile from "@/features/squad/components/plantel-header-mobile";
import SearchButtoms from "@/features/squad/components/search-buttoms";


export default function dashboard(){
    return(
        <div className="bg-background min-h-screen">
            <PlantelHeaderMobile/>
            <div className="p-3 flex flex-col gap-3">
            <SearchButtoms/>
              <section>
                 <PlantelCardPlayers/>
              </section>


            </div>
        </div>
    )
}
