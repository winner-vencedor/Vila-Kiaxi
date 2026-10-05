import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { PlantelPlayerProps } from '../types/plantel-player';
import { groupedplayers } from '../utils/group-player';

export default function PlantelCardPlayers({}: PlantelPlayerProps) {
  return (
    <div className="flex flex-col gap-3   md:mb-0">
      {Object.entries(groupedplayers).map(([position, group]) => (
        <div key={position} className='space-y-3'>
          <h2 className='text-foreground font-mono'>{position}</h2>

          <div className="grid min-w-0 grid-cols-2 justify-center gap-4 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-4">
            {group.map((item) => {
              return (
                <Card
                  key={item.id}
                  className="min-w-0 max-h-auto p-1 md:p-0 shadow-accent bg-card border border-border dark:bg-card dark:border-border "
                >
                  <CardContent className="relative h-64 overflow-hidden rounded-xl">
                    <Image
                      src={item.photo}
                      alt={item.name}
                      fill
                      className="object-cover"
                      priority
                    />

                    <div className="absolute inset-0 bg-black/40" />

                    <h1 className="absolute bottom-4 left-8 z-10 text-xl font-bold text-white">
                      {item.name}
                    </h1>
                  </CardContent>

                  <CardFooter className=" flex items-center justify-around bg-card">
                    <span className="font-mono text-emerald-600">
                      {item.Position}
                    </span>

                    <div className="h-4 w-px bg-black" />
                    <span className="text-emerald-600 font-mono">
                      {item.preferredFoot}
                    </span>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
