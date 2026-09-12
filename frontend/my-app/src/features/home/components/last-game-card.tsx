import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Trophy, Volleyball } from 'lucide-react';
import SoccerCleat from '@/assets/shoe-cleat.svg';
import Image from 'next/image';
import Link from 'next/link';

export default function LastGameCard() {
  return (
    <Card className="bg-card min-h-0 min-w-0 overflow-hidden p-2 lg:flex-3 md:flex-5 border border-border dark:bg-card flex-col gap-4  md:flex ">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-emerald-700" />
          <strong>
            <h6 className=" text-foreground font-mono">Último Jogo</h6>
          </strong>
        </div>
        <div>
          <Link
            href="#"
            className="flex gap-2 text-sm text-primary/80 hover:text-primary/90"
          >
            <h3 className="text-sm ">Ver Histórico</h3>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <CardContent className="flex flex-col gap-3">
        <div className="flex justify-around w-full font-mono text-foreground lg:text-xs md:text-xs gap-3 md:gap-0 bg-emerald-100/40 p-4">
          <strong>
            <h2>Barcelona</h2>
          </strong>
          <span className="text-xl font-bold">0</span>
          <h1 className="text-xl ">VS</h1>
          <span className="text-xl font-bold">0</span>
          <strong>
            <h2>Real Madrid</h2>
          </strong>
        </div>

        <div className="font-mono text-foreground dark:text-foreground flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Volleyball className="w-4 h-4 text-primary" />
              <strong>
                <h6 className="text-foreground">Marcadores</h6>
              </strong>
            </div>

            <div className="flex justify-around ">
              <p>Winner</p>
              <span>3</span>
            </div>
            <div className="flex justify-around">
              <p>piter</p>
              <span>3</span>
            </div>
            <div className="flex justify-around">
              <p>rosario</p>
              <span>3</span>
            </div>
            <div className="flex justify-around">
              <p>benilson</p>
              <span>3</span>
            </div>
          </div>
          <hr />

          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <Image
                src={SoccerCleat}
                alt="Soccer Cleat"
                className="w-6 h-6 text-primary"
              />
              <strong>
                <h6 className="text-foreground">Assitencia</h6>
              </strong>
            </div>
            <div className="flex justify-around">
              <p>Winner</p>
              <span>1</span>
            </div>
            <div className="flex justify-around">
              <p>piter</p>
              <span>2</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
