import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const waitlistMembersTable = pgTable("waitlist_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type InsertWaitlistMember = typeof waitlistMembersTable.$inferInsert;
export type SelectWaitlistMember = typeof waitlistMembersTable.$inferSelect;
