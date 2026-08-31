import { Card,CardHeader,CardTitle,CardContent } from "@/components/ui/card";


export default function LastGameCard() {
    return(
        <Card className="bg-gray-100 min-h-0 min-w-0 overflow-hidden p-2 lg:flex-3 md:flex-5 border shadow-2xl shadow-gray-500  hover:translate-1   flex-col gap-4 hidden md:flex ">
          <CardHeader>
            <CardTitle className="text-xl font-mono text-gray-900">Last Game</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-3">
              <div className="flex justify-around w-full font-mono text-gray-900 lg:text-xs md:text-xs gap-3 md:gap-0">
                <h2>Barcelona</h2>
                <span className="text-xl font-bold">0</span>
                <h1 className="text-xl ">VS</h1>
                <span className="text-xl font-bold">0</span>
                <h2>Real Madrid</h2>
            </div>

            <div className="font-mono text-gray-900 flex flex-col">
              <div className="flex flex-col gap-2">
                <h3>Marcadores</h3>
                <div className="flex justify-around">
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


                   <div className="flex flex-col gap-3">
                <h3>Assitencia</h3>
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
    )
}
