import { index, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const apiUsageTable = pgTable(
  "api_usage",
  {
    id: serial("id").primaryKey(),
    ipHash: text("ip_hash").notNull(),
    endpoint: text("endpoint").notNull(),
    timestamp: timestamp("timestamp").notNull().defaultNow(),
  },
  (t) => [
    // we query by ip hash, endpoint, and timestamp
    index("ip_hash_endpoint_timestamp_index").on(
      t.ipHash,
      t.endpoint,
      t.timestamp,
    ),
  ],
);

export type InsertApiUsage = typeof apiUsageTable.$inferInsert;
export type SelectApiUsage = typeof apiUsageTable.$inferSelect;
