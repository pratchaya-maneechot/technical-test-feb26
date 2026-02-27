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
import { eq } from "drizzle-orm"
import { branches } from "./schema"
import { BranchInsert, BranchSelect } from "./types"

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
    createdBy: row.created_by || "system"
  }
}
