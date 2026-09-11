import {uuid,pgEnum,pgTable, varchar, time, date, text, timestamp} from "drizzle-orm/pg-core"
import {user} from "./user.ts"



export const MatchSuggestionStatus=pgEnum("MatchSuggestion_status",[
    "PENDING",
    "REJECT",
    "APPROVED"
])

export const MatchSuggestion=pgTable("MatchSuggestion",{
    id:uuid("id").primaryKey().defaultRandom(),
    userId:uuid("user_id").notNull().references(()=>user.id),
    status:MatchSuggestionStatus().notNull().default("PENDING"),
    location:varchar("location",{length:255}).notNull(),
        time:time("time").notNull(),
        date:date("date").notNull(),
        opponent:varchar("opponent",{length:255}).notNull(),
        description:text("description"),
        createdAt:timestamp("created_at",{withTimezone:true}).notNull().defaultNow(),
        updatedAt:timestamp("updated_at",{withTimezone:true}).notNull().defaultNow().$onUpdate(()=>new Date())
    
})