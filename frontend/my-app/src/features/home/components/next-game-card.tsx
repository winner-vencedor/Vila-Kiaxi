import { Card,CardHeader,CardContent } from "@/components/ui/card";


export default function NextGameCard() {
    return(
        <Card className="bg-gray-100 min-h-0 min-w-0 overflow-hidden p-2 flex flex-col justify-center gap-4 border shadow-2xl shadow-gray-500 hover:translate-1">
          <CardHeader>
            <h2 className="font-mono text-xl md:text-2xl">Next Game</h2>
          </CardHeader>

          <CardContent className="flex flex-col items-center gap-4">
            <div className="font-mono text-gray-900">
            <h3>21:00, 03 March,2025</h3>
            </div>


            <div className="flex justify-around w-full font-mono text-gray-900 text-sm md:text-2xl gap-3 md:gap-0">
                <h2>Barcelona</h2>
                <h1 className="text-2xl ">VS</h1>
                <h2>Real Madrid</h2>
            </div>

          </CardContent>

        </Card>
    )
}
