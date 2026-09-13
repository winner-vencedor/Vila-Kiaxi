import {pgTable,uuid,timestamp,pgEnum,varchar,text,boolean} from "drizzle-orm/pg-core"



export const userRole=pgEnum("user_role",[
    "USER",
    "ADMIN",
    "PLAYER"
])


export const gender=pgEnum("gender",[
    "MALE",
    "FEMALE"
])


export const user=pgTable("user",{
    id:uuid("id").primaryKey().defaultRandom(),
    name:varchar("name",{length:255}).notNull(),
    email:varchar("email",{length:255}).notNull().unique(),
    password:text("password").notNull(),
    phone:varchar("phone",{length:9}).notNull().unique(),
    terms:boolean("terms").notNull(),
    gender:gender("gender").notNull(),
    role:userRole("role").notNull().default("USER"),
    createdAt:timestamp("created_at",{withTimezone:true}).notNull().defaultNow(),
    updatedAt:timestamp("updated_at",{withTimezone:true}).notNull().defaultNow()

})