import { Card,CardHeader,CardTitle,CardContent} from "@/components/ui/card"
import {ArrowRight} from "lucide-react"
import Link from "next/link"
export default function LastGameHistory(){
return(
    <Card className="bg-card p-3 ">
        <CardTitle className="flex justify-between items-center">
            <h1 className="font-extralight">Últimos Jogos</h1>
            <Link
            href={"/"}
            className="flex items-center gap-2 text-primary text-sm hover:text-emerald-700 "
            >
                Ver todos
                <ArrowRight className="size-4"/>
            </Link>
            </CardTitle>

        <CardContent>
            <div className="flex justify-around">
                <section className="flex flex-col gap-2 items-center">
                    <p>data</p>

                    <main className="flex flex-col justify-between items-center">
                        <p>17 nov 2024</p>
                        <p>17 nov 2024</p>
                        <p>17 nov 2024</p>
                        <p>17 nov 2024</p>
                        <p>17 nov 2024</p>
                        <p>17 nov 2024</p>
                    </main>
                </section>
                <section className="flex flex-col gap-2 items-center">
                    <p>adversário</p>
                    <main className="flex flex-col justify-between items-center">
                        <p>camama 3</p>
                        <p>camama 3</p>
                        <p>camama 3</p>
                        <p>camama 3</p>
                        <p>camama 3</p>
                        <p>camama 3</p>
                    </main>
                </section>
                <section className="flex flex-col gap-2 items-center">
                    <p>resultado</p>
                    <main className="flex flex-col justify-between items-center ">
                        <p>3-1</p>
                        <p>3-2</p>
                        <p>3-4</p>
                        <p>4-5</p>
                        <p>2-5</p>
                        <p>5-6</p>
                    </main>
                </section>
                <section className="flex flex-col gap-2 items-center">
                    <p>nosso time</p>
                    <main className="flex flex-col justify-between items-center ">
                        <p>vila-kiaxi</p>
                        <p>vila-kiaxi</p>
                        <p>vila-kiaxi</p>
                        <p>vila-kiaxi</p>
                        <p>vila-kiaxi</p>
                        <p>vila-kiaxi</p>
                    </main>
                </section>
                <section className="flex flex-col gap-2 items-center">
                    <p>status</p>
                    <main className="flex flex-col justify-between items-center ">
                        <p>victoria</p>
                        <p>derrota</p>
                        <p>empate</p>
                        <p>empate</p>
                        <p>victoria</p>
                        <p>derrota</p>
                    </main>
                </section>
            </div>

        </CardContent>


    </Card>
)
}
