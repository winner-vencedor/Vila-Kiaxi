import {Card,CardTitle,CardFooter,CardContent,CardDescription} from "@/components/ui/card"
export default function AdminDashboard(){
    return(
        <main className="min-h-screen min-w-screen flex justify-center items-center ">
            <section className="grid grid-cols-2 gap-4 container mx-auto">
                <Card className="bg-card">
                    <CardTitle> Agendar Jogos</CardTitle>
                    <CardContent>
                        <CardDescription>Agendar jogos da equipe</CardDescription>
                    </CardContent>
                </Card>

                <Card className="bg-card">
                    <CardTitle> Agendar Jogos</CardTitle>
                    <CardContent>
                        <CardDescription>Agendar jogos da equipe</CardDescription>
                    </CardContent>
                </Card>

                <Card className="bg-card">
                    <CardTitle> Agendar Jogos</CardTitle>
                    <CardContent>
                        <CardDescription>Agendar jogos da equipe</CardDescription>
                    </CardContent>
                </Card>

                <Card className="bg-card">
                    <CardTitle> Agendar Jogos</CardTitle>
                    <CardContent>
                        <CardDescription>Agendar jogos da equipe</CardDescription>
                    </CardContent>
                </Card>

                <Card className="bg-card">
                    <CardTitle> Agendar Jogos</CardTitle>
                    <CardContent>
                        <CardDescription>Agendar jogos da equipe</CardDescription>
                    </CardContent>
                </Card>
            </section>
        </main>
    )
}
