import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Calendar,
  ArrowRightIcon,
  LocationEdit,
  TimerIcon,
} from 'lucide-react';

export default function NextGameCard() {
  return (
    <Card className="bg-card dark:bg-card min-h-0 min-w-0 overflow-hidden p-4 flex justify-around border  ">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-emerald-700" />
          <strong>
            <h2 className="text-sm text-foreground font-mono">Próximo Jogo</h2>
          </strong>
        </div>
        <div className="flex gap-3">
          <h3 className="text-sm text-gray-400">23 March 2025</h3>
        </div>
      </div>

      <CardContent className="flex flex-col gap-5 p-4">
        <main className="flex flex-col items-center gap-4 justify-center h-full w-full ">
          <div className="flex justify-around w-full font-mono text-foreground dark:text-foreground text-sm md:text-2xl gap-3 md:gap-0">
            <h2>Barcelona</h2>
            <h1 className="text-2xl ">VS</h1>
            <h2>Real Madrid</h2>
          </div>

          <div className="flex gap-5">
            <div className="flex items-center gap-1">
              <LocationEdit className="w-4 h-4 text-primary" />
              <h2>Campo Municipal</h2>
            </div>

            <div className="flex items-center gap-1">
              <TimerIcon className="w-4 h-4 text-primary" />
              <h2>16:30</h2>
            </div>
          </div>
        </main>
        <Button className="w-full bg-emerald-700 p-5">
          Ver Detalhes <ArrowRightIcon className="w-5 h-5" />
        </Button>
      </CardContent>
    </Card>
  );
}
