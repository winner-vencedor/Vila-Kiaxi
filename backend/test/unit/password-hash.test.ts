import {describe,it,expect} from "vitest"
import {comparePassword,hashPassword} from "../../src/utils/password.ts"


describe("hashPassword and comparePassword",()=>{
    it("deve gerar mais de uma  hash da mesma password mas elas nunca devem ser iguais",async ()=>{
        const password="winneEuSouDev"
        const passwordHash=await hashPassword(password)
        const passwordHashSecond=await hashPassword(password)

            
        expect(passwordHash).not.toBe(passwordHashSecond)
    })

    it("deve comparar a password se é igual ao passwordHash gerada",async ()=>{
        const password="winneEuSouDev"
        const passwordHash=await hashPassword(password)

        const passwordCompare=await comparePassword(password,passwordHash)

        expect(passwordCompare).toBe(true)
})

it("deve rejeitar password errada",async ()=>{
        const password="winneEuSouDev"
        const passwordErrada="olaolaola"
        const passwordHash=await hashPassword(password)

        const passwordCompare=await comparePassword(passwordErrada,passwordHash)

        expect(passwordCompare).toBe(false)

})
})