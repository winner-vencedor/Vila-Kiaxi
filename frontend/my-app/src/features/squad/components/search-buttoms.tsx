import { Button } from "@/components/ui/button"
import { SearchButtomsItems } from "./search-buttoms-item"

export default function SearchButtoms(){
    return(
        <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:gap-3">
            {
             SearchButtomsItems.map((item)=>{
                return(
                    <Button
                    key={item.id}
                    >
                       <h3> {item.label}</h3>
                        </Button>
                )
            })
            }
        </div>
    )
}
