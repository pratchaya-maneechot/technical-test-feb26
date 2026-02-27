import { advisors, branches } from "./schema"

export type AdvisorInsert = typeof advisors.$inferInsert
export type AdvisorSelect = typeof advisors.$inferSelect

export type BranchInsert = typeof branches.$inferInsert
export type BranchSelect = typeof branches.$inferSelect
