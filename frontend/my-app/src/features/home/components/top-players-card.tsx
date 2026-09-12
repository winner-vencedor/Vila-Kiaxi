import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Trophy } from 'lucide-react';
import { TopPlayersProps } from '../types/top-players';
import Photo from '@/assets/ildinha.png';
import Link from 'next/link';
import Image from 'next/image';



export default function TopPlayersCard({ players }: TopPlayersProps) {
  return (
    <Card className="flex min-h-0 min-w-0 flex-col gap-4 overflow-hidden border border-border bg-card p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex  items-center justify-center rounded-full 10 text-emerald-600 dark:text-emerald-400">
            <Trophy className="size-4" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-mono text-sm font-semibold text-foreground">
              Top Jogadores
            </h2>

          </div>
        </div>

        <div>
          <Link
            href="#"
            className="flex items-center gap-1 text-xs  text-primary transition-colors hover:text-primary/80"
          >
            <span>Ver todos</span>
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <CardContent className="p-0">
        <ol className="divide-y divide-border/60">
          {players.map((player) => (
            <li key={player.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                {player.position}
              </span>

              <Image
                src={Photo}
                alt={`Foto de ${player.name}`}
                width={36}
                height={36}
                className="size-9 shrink-0 rounded-full object-cover ring-2 ring-background"
              />

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold text-foreground">
                  {player.name}
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {player.goals} {player.goals === 1 ? 'golo' : 'golos'}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
