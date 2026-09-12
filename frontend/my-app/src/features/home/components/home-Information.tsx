
import PlayerOfTheWeekCard from './player-of-the-week-card';
import NextGameCard from './next-game-card';
import TopPlayersCard from './top-players-card';
import TeamStatistics from './team-Statistics';
import LastGameCard from './last-game-card';
import {LucideUsers} from "lucide-react"
import { Button } from '@/components/ui/button';

const players = [
  {
    id: '1',
    position: '1',
    name: 'Jose Domingos',
    photo: '/assets/ildinha.png',
    goals: 12,
    assists: 3,
  },
  {
    id: '2',
    position: '2',
    name: 'João Claudio',
    photo: '/assets/ildinha.png',
    goals: 8,
    assists: 5,
  },
  {
    id: '3',
    position: '3',
    name: 'Pedro Rodrigo',
    photo: '/assets/ildinha.png',
    goals: 6,
    assists: 7,
  },
];


export default function HomeInformation() {
  const istrue = true;

  return (
    <div className="flex flex-col gap-5 min-h-screen  w-full pt-21 md:pt-0">
      {istrue && (
        <div className="flex justify-end w-full">
          <Button className="bg-primary hover:bg-emerald-600 p-2 rounded-xl font-sans text-xs text-foreground dark:text-background">
            <LucideUsers className='w-5 h-5'/>
            Aderir a equipe
          </Button>
        </div>
      )}

      <section className="flex flex-col gap-4 md:grid lg:grid-cols-[3fr_5fr_2fr] lg:flex-1 min-h-0 p-2">
        < PlayerOfTheWeekCard/>
        <NextGameCard/>
        <TopPlayersCard players={players}/>
      </section>

      <section className="flex flex-col  lg:flex-row gap-4 lg:flex-1 min-h-0 items-stretch p-2">
        <div className='flex-1'>
    <TeamStatistics/>
      </div>

      <div className='flex-1'>
        <LastGameCard/>
        </div>
      </section>
    </div>
  );
}
