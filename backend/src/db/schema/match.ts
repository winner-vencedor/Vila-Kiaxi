import {pgEnum,pgTable,uuid,text,date,time,varchar,timestamp} from "drizzle-orm/pg-core"


export const MacthStatus=pgEnum("match_status",[
    "SCHEDULED",
    "IN_PROGRESS",
    "FINISHED",
    "CANCELLED"
])

export const match=pgTable("match",{
    id:uuid("id").primaryKey().defaultRandom(),
    location:varchar("location",{length:255}).notNull(),
    time:time("time").notNull(),
    date:date("date").notNull(),
    opponent:varchar("opponent",{length:255}).notNull(),
    description:text("description"),
    createdAT:timestamp("created_at",{withTimezone:true}).notNull().defaultNow(),
    updatedAt:timestamp("updated_at",{withTimezone:true}).notNull().defaultNow()

})