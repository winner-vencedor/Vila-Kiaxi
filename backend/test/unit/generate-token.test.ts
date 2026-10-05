import {describe,it,expect} from "vitest"
import {createAccessToken,generateRefreshToken} from "../../src/utils/token.ts"

describe("createAccessToken and generateRefreshToken",()=>{
    it("gerar token",async ()=>{
        const RefreshTokenGenerate=generateRefreshToken()

        expect(RefreshTokenGenerate).toBeDefined()
        expect(typeof RefreshTokenGenerate).toBe("string")
    })
})