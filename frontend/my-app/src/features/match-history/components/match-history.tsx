import HistoryHeader from "./match-history-header"
import LastGameHistory from "./last-games-history"
export default function MatchHistory(){
    return(
        <main className=" container mx-auto flex flex-col gap-5 pt-21 md:pt-0 bg-background min-h-screen">
            <HistoryHeader/>
            <section className="container mx-auto p-3 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <LastGameHistory/>
            {/* <LastGameHistory/>
            <LastGameHistory/>
            <LastGameHistory/> */}

            </section>
        </main>
    )
}
