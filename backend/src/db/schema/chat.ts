import { uuid, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const chat = pgTable("chat", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .notNull()
    .defaultNow()
});
