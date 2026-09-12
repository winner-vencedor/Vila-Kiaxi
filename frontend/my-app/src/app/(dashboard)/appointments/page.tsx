import HomeInformation from "@/features/home/components/home-Information";


export default function dashboard(){
    return(
            <main className="flex flex-col gap-2 w-full min-h-screen bg-background dark:bg-background">
              <div className="p-2 flex-1 ">
                <HomeInformation />
              </div>
            </main>
    )
}
