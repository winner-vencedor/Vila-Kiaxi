import { Card,CardTitle,CardContent,} from "@/components/ui/card";
import Image from 'next/image';
import Photo from '@/assets/ildinha.png';


export default function PlayerOfTheWeekCard() {
    return(
        <Card className="bg-gray-100 min-h-0 min-w-0 overflow-hidden p-3 flex flex-col gap-4 border shadow-2xl shadow-gray-500 hover:translate-1">
          <CardTitle>
            <h2 className="font-mono text-xl md:text-2xl">
              Player of the Week
            </h2>
          </CardTitle>
          <CardContent className="flex justify-between  gap-2 *:md:text-xl">
            <div className="flex flex-col gap-4 w-full">
              <h3 className="font-mono text-xl">Winner</h3>

              <div className="flex justify-around text-xl  lg:flex-col lg:gap-2 ">

                <div className="font-mono flex flex-col gap-2 items-center lg:items-start ">
                  <h3 className="text-gray-900">Goals</h3>
                  <span className="">2</span>
                </div>
                <div className="font-mono flex flex-col gap-2 items-center lg:items-start ">
                  <h3>Assists</h3>
                  <span >1</span>
                </div>
                <div className="font-mono  flex-col gap-2 hidden md:flex">
                  <h3>Minutes</h3>
                  <span>90 minutos </span>
                </div>
              </div>
            </div>
            <Image
              src={Photo}
              alt="winner"
              loading="eager"
              priority
              className="w-15 h-15 md:w-30 md:h-30 rounded-2xl  hidden md:block"
            />
          </CardContent>
        </Card>
    )
}
