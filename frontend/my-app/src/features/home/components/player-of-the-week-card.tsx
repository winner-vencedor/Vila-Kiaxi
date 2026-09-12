import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import Photo from '@/assets/ildinha.png';
import { Trophy } from 'lucide-react';


export default function PlayerOfTheWeekCard() {
    return(
        <Card className="min-h-0 min-w-0 border border-gray-300 bg-card dark:border-zinc-700 dark:bg-card">
          <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-border/60">
            <div className="space-y-1">
              <CardTitle className="text-xl font-semibold md:text-2xl">
                Player of the Week
              </CardTitle>
              <p className="text-sm text-muted-foreground">Destaque da última jornada</p>
            </div>
            <div className="flex shrink-0 items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
              <Trophy className="size-3.5" aria-hidden="true" />
              <span>Winner</span>
            </div>
          </CardHeader>

          <CardContent className="flex items-center gap-4 pt-1">
            <Image
              src={Photo}
              alt="Jogador da semana"
              loading="eager"
              priority
              className="size-16 shrink-0 rounded-2xl object-cover ring-2 ring-primary/20 md:size-20"
            />

            <div className="min-w-0 flex-1">
              <p className="truncate text-lg font-semibold text-foreground">Ilda Nhanga</p>
              <p className="text-sm text-muted-foreground">Melhor desempenho</p>

              <div className="mt-4 grid grid-cols-3 divide-x divide-border rounded-lg bg-background py-2">
                <div className="flex flex-col items-center gap-0.5 px-2">
                  <span className="text-lg font-bold text-primary">2</span>
                  <span className="text-[11px] font-medium text-muted-foreground">Golos</span>
                </div>
                <div className="flex flex-col items-center gap-0.5 px-2">
                  <span className="text-lg font-bold text-primary">1</span>
                  <span className="text-[11px] font-medium text-muted-foreground">Assistências</span>
                </div>
                <div className="flex flex-col items-center gap-0.5 px-2">
                  <span className="text-lg font-bold text-primary">90</span>
                  <span className="text-[11px] font-medium text-muted-foreground">Minutos</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
    )
}
