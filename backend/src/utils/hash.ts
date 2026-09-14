import crypto from "node:crypto"

export function hasToken(token:string){
    return crypto.createHash("sHA256").update(token).digest("base64url")
}