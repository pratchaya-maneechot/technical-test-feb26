import { pgTable, text, timestamp, jsonb, unique, uuid } from "drizzle-orm/pg-core"

/**
 * Advisors table schema (reference for pattern).
 */
export const advisors = pgTable("advisors", {
  id: uuid().primaryKey(),
  first_name: text().notNull(),
  last_name: text().notNull(),
  email: text().notNull(),
  type: text().notNull(),
  status: text().notNull(),
  role: text().notNull(),
  workspace_code: text().notNull().default("default"),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
}, (t) => [
  unique("email_workspace_idx").on(t.email, t.workspace_code)
])

/**
 * Branches table schema.
 */
export const branches = pgTable("branches", {
  branch_id: uuid().primaryKey(),
  branch_code: text().notNull().unique(),
  name: text().notNull(),
  channel_id: text().notNull(),
  manager_id: uuid(),
  status: text().notNull(),
  region: text().notNull(),
  attributes: jsonb().notNull().default({}),
  workspace_code: text().notNull().default("default"),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
  created_by: text().notNull()
})
