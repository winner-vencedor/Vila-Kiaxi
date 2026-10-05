import {describe,it,expect} from "vitest"
import {render,screen} from "@testing-library/react"
import Greating from "./greating"


describe("Greating",()=>{
    it("deve mostrar o texto ola mundo ",()=>{
        render( <Greating /> )

        expect(
            screen.getByText("ola mundo")
        ).toBeInTheDocument()
    })
})
