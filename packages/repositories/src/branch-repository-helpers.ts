/**
 * Branch-specific repository helpers.
 * These functions are used by BranchDrizzleRepository to build SQL conditions,
 * extract update values, and map database rows to domain entities.
 */

import { BranchFilters, BranchUpdate, Branch, BranchCreate } from "@qmin/partner-branches"
import { eq } from "drizzle-orm"
import { branches } from "./schema"
import { BranchInsert, BranchSelect } from "./types"

/**
 * Build SQL WHERE conditions from filter options.
 */
export function buildFilterConditions(filters: BranchFilters): unknown[] {
  const conditions: unknown[] = []

  if (filters.status) {
    conditions.push(eq(branches.status, filters.status))
  }
  if (filters.workspaceCode) {
    conditions.push(eq(branches.workspace_code, filters.workspaceCode))
  }

  return conditions
}


/**
 * Build SQL SET values from update input.
 * Exclude immutable fields (workspaceCode, createdAt, branchId).
 * Example: { name: "New Name", status: "INACTIVE" } → { name: "New Name", status: "INACTIVE" }
 */
export function buildUpdateValues(input: BranchUpdate): Partial<BranchInsert> {
  return {
    branch_code: input.branchCode,
    name: input.name,
    channel_id: input.channelId,
    manager_id: input.managerId,
    status: input.status,
    region: input.region,
    attributes: input.attributes,
    updated_at: new Date(),
  }
}

/**
 * Build SQL INSERT values from create input.
 * Example: { branchCode: "BR001", name: "Branch 1", status: "ACTIVE" } → { branch_code: "BR001", name: "Branch 1", ... }
 */
export function buildInsertValues(input: BranchCreate, createdBy: string): BranchInsert {
  return {
    branch_id: crypto.randomUUID(),
    branch_code: input.branchCode,
    name: input.name,
    channel_id: input.channelId,
    manager_id: input.managerId,
    status: input.status,
    region: input.region,
    attributes: input.attributes,
    created_at: new Date(),
    updated_at: new Date(),
    created_by: createdBy,
    workspace_code: input.workspaceCode,
  }
}

/**
 * Convert database row to Branch entity.
 * Handles column name mapping (snake_case → camelCase) and date serialization.
 */
export function mapRow(row: BranchSelect): Branch {
  return {
    branchId: row.branch_id,
    branchCode: row.branch_code,
    name: row.name,
    channelId: row.channel_id,
    managerId: row.manager_id,
    status: row.status as Branch['status'],
    region: row.region,
    attributes: row.attributes as Branch['attributes'],
    workspaceCode: row.workspace_code,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    createdBy: row.created_by
  }
}
