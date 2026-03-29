import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { projects } from "./projects";

export const projectUpdates = pgTable("project_updates", {
  id: uuid("id").primaryKey().defaultRandom(),

  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id),

  version: text("version").notNull(),

  fileKey: text("file_key").notNull(),

  changelog: text("changelog"),

  createdAt: timestamp("created_at").defaultNow(),
});