import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

import { users } from "./users"; 

export const sellerProfiles = pgTable("seller_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),

  userId: uuid("user_id") 
    .notNull()
    .unique() // ensures one seller profile per user
    .references(() => users.id),

  razorpayAccountId: text("razorpay_account_id").notNull(),

  bio: text("bio"),

  githubUrl: text("github_url"),

  isVerified: boolean("is_verified").default(false),

  acceptedTerms: boolean("accepted_terms").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});