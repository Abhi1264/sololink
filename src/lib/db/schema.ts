import {
  pgTable,
  text,
  timestamp,
  integer,
  boolean,
  serial,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Import Better-Auth tables
export {
  user,
  session,
  account,
  verification,
  userRelations,
  sessionRelations,
  accountRelations,
} from "./auth-schema";

// Import user from auth-schema for reference
import { user } from "./auth-schema";

export const links = pgTable("links", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  url: text("url").notNull(),
  order: integer("order").notNull().default(0),
  isEnabled: boolean("is_enabled").notNull().default(true),
  clicks: integer("clicks").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const linksRelations = relations(links, ({ one }) => ({
  user: one(user, {
    fields: [links.userId],
    references: [user.id],
  }),
}));

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
