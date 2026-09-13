import { uuid, pgEnum, pgTable, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user.ts";

export const MembersShipRequestStatus = pgEnum("MembersShipRequest_status", [
  "PENDING",
  "REJECT",
  "APPROVED",
]);

export const MembersShipRequest = pgTable("members_shipRequest", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id,{onDelete:"cascade"}),
  Status: MembersShipRequestStatus().notNull().default("PENDING"),
  requestedAt: timestamp("requestedAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
  reviewedAt: timestamp("reviewedAt", { withTimezone: true }),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
