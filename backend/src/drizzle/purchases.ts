import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { users } from "./users"
import { projects } from "./projects";
import { payments } from "./payments"

import { uniqueIndex } from "drizzle-orm/pg-core";

export const purchases = pgTable(
  "purchases",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    buyerId: uuid("buyer_id").notNull().references(() => users.id),
    projectId: uuid("project_id").notNull().references(() => projects.id),
    paymentId: uuid("payment_id").references(() => payments.id),
    amountPaid: integer("amount_paid").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    uniquePurchase: uniqueIndex("unique_purchase_idx").on(
      table.buyerId,
      table.projectId
    ),
  })
);