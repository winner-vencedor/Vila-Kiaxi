import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user.ts";
import { chat } from "./chat.ts";

export const message = pgTable("message", {
  id: uuid("id").primaryKey().defaultRandom(),
  chatId: uuid("chat_id")
    .notNull()
    .references(() => chat.id),
  sendId: uuid("send_id")
    .notNull()
    .references(() => user.id),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
