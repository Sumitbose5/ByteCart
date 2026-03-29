import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),

  sellerId: uuid("seller_id")
    .notNull()
    .references(() => users.id),

  title: text("title").notNull(),
  description: text("description"),

  fileKey: text("file_key").notNull(), 
  // e.g. "projects/react-auth-v1.zip"

  price: integer("price").notNull(), // in paise

  isActive: boolean("is_active").default(true),

  createdAt: timestamp("created_at").defaultNow(),
});