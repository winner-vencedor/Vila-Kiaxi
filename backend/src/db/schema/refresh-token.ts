import {pgTable,text,uuid,timestamp} from "drizzle-orm/pg-core"
import {user} from "./user.ts"




export const refreshToken=pgTable("refresh_token",{
    id:uuid("refresh_tokenId").primaryKey().defaultRandom(),
    tokenHash:text("token_hash").notNull(),
    userId:uuid("user_id").notNull().references(()=> user.id,{onDelete:"cascade"}),
    revokeAt:timestamp("revoke_at",{withTimezone:true}),
    expiresAt:timestamp("expires_at",{withTimezone:true}).notNull(),
    createdAt:timestamp("created_at",{withTimezone:true}).notNull().defaultNow()
})