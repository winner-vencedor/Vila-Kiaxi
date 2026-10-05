import Image from "next/image"
import ShoeCleat from "@/assets/shoe-cleat.svg"
export default  function PlantelHeader(){
    return(
        <header className="flex items-center gap-2">
            <Image
            src={ShoeCleat}
            className="w-8 h-12"
            alt="Imagem de chuteira"
            />
            <h1 className="font-mono text-foreground dark:text-foreground text-xl">O nosso Plantel</h1>
        </header>
    )
}
