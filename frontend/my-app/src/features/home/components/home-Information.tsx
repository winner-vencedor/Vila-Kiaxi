
import PlayerOfTheWeekCard from './player-of-the-week-card';
import NextGameCard from './next-game-card';
import TopPlayersCard from './top-players-card';
import TeamStatistics from './team-Statistics';
import LastGameCard from './last-game-card';


export default function HomeInformation() {
  const istrue = true;

  return (
    <div className="flex flex-col gap-5 min-h-screen  w-full pt-19 md:pt-0">
      {istrue && (
        <div className="flex justify-end w-full">
          <button className="bg-emerald-400 hover:bg-emerald-600 p-2 rounded-xl font-mono text-xs">
            Aderir a equipe
          </button>
        </div>
      )}

      <section className="flex flex-col gap-2 md:grid lg:grid-cols-[3fr_5fr_2fr] lg:flex-1 min-h-0">
        < PlayerOfTheWeekCard/>
        <NextGameCard/>
        <TopPlayersCard/>
      </section>

      <section className="flex  md:flex gap-3 flex-1 min-h-0">
    <TeamStatistics/>

        <LastGameCard/>
      </section>
    </div>
  );
}
