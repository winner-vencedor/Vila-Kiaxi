import  HeaderMobile from "@/features/home/components/header-mobile";
import MatchDays from "@/features/home/components/MatchDays";


export default function dashboard(){
    return(
        <div className="flex flex-col gap-2 p-3">
        <HeaderMobile/>
        < MatchDays/>

        </div>
    )
}
