import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { SearchButtomsItems } from './search-buttoms-item';
import { playersMonckei } from './mockei-plantel';
import { FootprintsIcon } from 'lucide-react';

export default function PlantelCardPlayers() {
  return (
    <div className="flex flex-col gap-3 mb-16 md:mb-0">
      {SearchButtomsItems.map((item) => {
        return (
          <div key={item.id} className="flex min-w-0 flex-col gap-2">
            <h3 className="font-mono text-xl text-gray-950">{item.label}</h3>

            <div className="grid min-w-0 grid-cols-2 justify-center gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-3">
              {playersMonckei.map((item) => {
                return (
                  <Card
                    key={item.id}
                    className="min-w-0 max-h-70 p-1 md:p-0 shadow-2xl bg-card border hover:translate-1"
                  >
                    <CardContent className="p-3 space-y-2">
                      <div>
                        <Image
                          src={item.photo}
                          alt=""
                          priority
                          className="h-20  w-20 rounded-xl"
                        />
                      </div>

                      <CardFooter className="flex flex-col items-start justify-center gap-1 bg-card">
                        <h1 className="min-w-0 wrap-break-word font-sans text-foreground">
                          {item.name}
                        </h1>
                        <div className="hidden md:flex md:flex-col ">
                          <div className="flex gap-1">
                            <p className="from-accent-foreground">Age:</p>
                            <span className="font-mono text-emerald-600">
                              {item.age}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <FootprintsIcon size={12} />
                            <p className="font-mono">Foot:</p>
                            <span className="font-mono text-emerald-600">
                              {item.preferredFoot}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <p className="font-mono">Position:</p>
                            <span className="text-emerald-600 font-mono">
                              {item.Position}
                            </span>
                          </div>
                        </div>
                      </CardFooter>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
