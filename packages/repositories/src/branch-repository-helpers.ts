/**
 * TODO: Implement branch-specific repository helpers.
 *
 * Helper functions for BranchDrizzleRepository:
 * - buildFilterConditions(filters: BranchFilters): SQL WHERE conditions
 * - buildUpdateValues(input: BranchUpdate): SQL SET values
 * - mapRow(row: any): Branch — converts DB row to domain entity
 *
 * Pattern (reference advisor-repository-helpers.ts):
 * 1. buildFilterConditions accepts filters (status, workspaceCode, branchCode, region)
 * 2. Returns array of Drizzle conditions
 * 3. mapRow handles date serialization: createdAt.toISOString(), updatedAt.toISOString()
 * 4. buildUpdateValues excludes immutable fields (workspaceCode, createdAt)
 */

import { BranchFilters, BranchUpdate, Branch } from "@qmin/partner-branches"

/**
 * TODO: Build SQL WHERE conditions from filter options.
 */
export function buildFilterConditions(filters: BranchFilters): unknown[] {
  throw new Error("TODO: implement buildFilterConditions")
}

/**
 * TODO: Build SQL SET values from update input.
 * Exclude immutable fields (workspaceCode, createdAt, branchId).
 */
export function buildUpdateValues(input: BranchUpdate): Record<string, unknown> {
  throw new Error("TODO: implement buildUpdateValues")
}

/**
 * TODO: Convert database row to Branch entity.
 * Handle date serialization: createdAt.toISOString(), updatedAt.toISOString()
 */
export function mapRow(row: any): Branch {
  throw new Error("TODO: implement mapRow")
}
