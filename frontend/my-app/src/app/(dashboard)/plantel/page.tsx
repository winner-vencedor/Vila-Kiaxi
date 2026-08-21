import PlantelCardPlayers from "@/features/plantel/components/plantel-card-player";
import PlantelHeaderMobile from "@/features/plantel/components/plantel-header-mobile";
import SearchButtoms from "@/features/plantel/components/search-buttoms";


export default function dashboard(){
    return(
        <div className="bg-gray-200">
            <PlantelHeaderMobile/>
            <div className="p-3 flex flex-col gap-3">
            <SearchButtoms/>
            <main>
                 <PlantelCardPlayers/>
            </main>


            </div>
        </div>
    )
}
