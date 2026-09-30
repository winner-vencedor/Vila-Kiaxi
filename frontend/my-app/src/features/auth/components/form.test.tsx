
import {describe,it,expect} from "vitest"
import {render,screen} from "@testing-library/react"
import {userEvent} from "@testing-library/user-event"
import LoginForm from "./Form"


describe("FormLogin",()=>{
    it("mostrar erro quando o email é inválido",async()=>{
        const user=userEvent.setup()
        render(<LoginForm/>)

        await user.type(screen.getByPlaceholderText("Email"),"Email-inválido")
        await user.click(screen.getByRole("button",{name:"Entrar"}))

        expect(await screen.findByText(/email/i)).toBeInTheDocument()


    })
})
