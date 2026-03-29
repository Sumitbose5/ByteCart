import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),

  clerkId: text("clerk_id").notNull().unique(),

  email: text("email").notNull().unique(),
  name: text("name"),

  role: text("role").default("buyer").notNull(), // "buyer" | "seller" | "admin"

  createdAt: timestamp("created_at").defaultNow(),
});