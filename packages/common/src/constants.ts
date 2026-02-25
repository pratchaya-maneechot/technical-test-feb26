/**
 * Domain constants — valid enum values.
 */

export const ADVISOR_TYPES = [
  "AGENCY",
  "BANCA",
  "BROKER",
] as const
export type AdvisorType = typeof ADVISOR_TYPES[number]

export const ADVISOR_STATUSES = [
  "INACTIVE",
  "ACTIVE",
  "SUSPENDED",
  "RESIGNED",
  "NOR_TERM",
  "SPEC_TERM",
  "HOLD",
  "ON_LEAVE",
] as const
export type AdvisorStatus = typeof ADVISOR_STATUSES[number]

export const ADVISOR_ROLES = [
  "AGENT",
  "AGENT_LEADER",
  "VICE_PRESIDENT",
  "GROUP_PRESIDENT",
] as const
export type AdvisorRole = typeof ADVISOR_ROLES[number]

export const BRANCH_STATUSES = [
  "ACTIVE",
  "INACTIVE",
] as const
export type BranchStatus = typeof BRANCH_STATUSES[number]
