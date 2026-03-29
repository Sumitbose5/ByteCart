import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

export const payments = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(),

  amount: integer("amount").notNull(),

  provider: text("provider").notNull(), // "razorpay"

  transactionId: text("transaction_id"), // razorpay_payment_id

  status: text("status").notNull(), // "success" | "failed" | "pending"

  createdAt: timestamp("created_at").defaultNow(),
});