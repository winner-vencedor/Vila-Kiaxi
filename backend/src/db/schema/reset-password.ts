import {uuid,timestamp,pgTable,text} from "drizzle-orm/pg-core"
import {user} from "./user.ts"



export const passwordResetToken=pgTable("password_reset_token",{
    id:uuid("id").primaryKey().defaultRandom(),
    
    userId:uuid("user_id").notNull().references(()=> user.id,{onDelete:"cascade"}),
    tokenHash:text("token_hash").notNull().unique(),
    expiresAt:timestamp("expires_at",{withTimezone:true}).notNull(),
    usedAt:timestamp("used_at",{withTimezone:true}),
    createdAt:timestamp("created_at",{withTimezone:true}).notNull().defaultNow()

})