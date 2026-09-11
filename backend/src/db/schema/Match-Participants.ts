import {uuid,boolean,pgTable,integer,timestamp,unique} from "drizzle-orm/pg-core"
import {match} from "./match.ts"
import {user} from "./user.ts"



export const MatchParticipants=pgTable("match_participants",{
    id:uuid("id").primaryKey().defaultRandom(),
    userId:uuid("user_id").notNull().references(()=>user.id),
    matchId:uuid("match_id").notNull().references(()=>match.id),
    confirmed:boolean("confirmed").notNull().default(false),
    goal:integer("goal").notNull().default(0),
    assists:integer("assists").notNull().default(0),
    createdAt:timestamp("created_at").notNull().defaultNow()
},(table)=>({
    uniqueMatchUser:unique().on(
        table.matchId,
        table.userId
    ),
}))