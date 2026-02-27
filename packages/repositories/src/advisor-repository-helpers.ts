/**
 * Advisor-specific repository helpers (reference for pattern).
 * These functions are used by AdvisorDrizzleRepository to build SQL conditions,
 * extract update values, and map database rows to domain entities.
 */

import { AdvisorFilters, AdvisorUpdate, Advisor, AdvisorCreate } from "@qmin/partner-advisors"
import { eq } from "drizzle-orm"
import { advisors } from "./schema"
import { AdvisorInsert, AdvisorSelect } from "./types"

/**
 * Build SQL WHERE conditions from filter options.
 */
export function buildFilterConditions(filters: AdvisorFilters): unknown[] {
  const conditions: unknown[] = []

  if (filters.status) {
    conditions.push(eq(advisors.status, filters.status))
  }
  if (filters.type) {
    conditions.push(eq(advisors.type, filters.type))
  }
  if (filters.workspaceCode) {
    conditions.push(eq(advisors.workspace_code, filters.workspaceCode))
  }

  return conditions
}

/**
 * Build SQL SET values from update input.
 * Exclude immutable fields (workspaceCode, createdAt, advisorId).
 * Example: { firstName: "John", status: "ACTIVE" } → { first_name: "John", status: "ACTIVE" }
 */
export function buildUpdateValues(input: AdvisorUpdate): Partial<AdvisorInsert> {
  return {
    first_name: input.firstName ?? undefined,
    last_name: input.lastName ?? undefined,
    email: input.email ?? undefined,
    type: input.type ?? undefined,
    status: input.status ?? undefined,
    role: input.role ?? undefined,
    updated_at: new Date(),
  }
}

/**
 * Build SQL INSERT values from create input.
 * Example: { firstName: "Jane", email: "jane@example.com", status: "ACTIVE" } → { first_name: "Jane", ... }
 */
export function buildInsertValues(input: AdvisorCreate): AdvisorInsert {
  return {
    id: crypto.randomUUID(),
    first_name: input.firstName,
    last_name: input.lastName,
    email: input.email,
    type: input.type,
    status: input.status,
    role: input.role,
    created_at: new Date(),
    updated_at: new Date(),
    workspace_code: input.workspaceCode,
  }
}

/**
 * Convert database row to Advisor entity.
 * Handles column name mapping (snake_case → camelCase) and date serialization.
 */
export function mapRow(row: AdvisorSelect): Advisor {
  return {
    advisorId: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    type: row.type as Advisor['type'],
    status: row.status as Advisor['status'],
    role: row.role as Advisor['role'],
    workspaceCode: row.workspace_code,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}
