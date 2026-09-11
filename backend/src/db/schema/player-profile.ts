import {pgEnum,pgTable,text,varchar,timestamp,uuid,integer,numeric } from "drizzle-orm/pg-core"
import {user} from "./user.ts"

export const position=pgEnum("position",[
        "GOALKEEPER",
        "DEFENDER",
        "MIDFIELDER",
        "FORWARD"
])

export  const preferredFoot=pgEnum("preferrer_foot",[
    "LEFT",
    "RIGHT",
    "BOTH"
])


export const playerProfile=pgTable("player_profile",{
    id:uuid("id").primaryKey().defaultRandom(),
    userId:uuid("user_id").notNull().references(()=>user.id),
    position:position("position").notNull(),
    weight:numeric("weighr").notNull(),
    height:numeric("heigth").notNull(),
    createdAT:timestamp("created_at",{withTimezone:true}).notNull().defaultNow(),
    updatedAt:timestamp("updated_at",{withTimezone:true}).notNull().defaultNow()
})