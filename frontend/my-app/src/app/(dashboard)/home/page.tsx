import  HeaderMobile from "@/features/home/components/header-mobile";
import HomeInformation from "@/features/home/components/home-Information";


export default function dashboard(){
    return(
        <main className="flex flex-col gap-2 w-full min-h-screen bg-gray-300">
               <HeaderMobile/>
            <div className="p-3 flex-1 w-full">
        <  HomeInformation/>
            </div>

        </main>
    )
}
