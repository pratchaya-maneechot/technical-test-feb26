/**
 * Advisor-specific repository helpers (reference for pattern).
 * These functions are used by AdvisorDrizzleRepository to build SQL conditions,
 * extract update values, and map database rows to domain entities.
 */

import { AdvisorFilters, AdvisorUpdate, Advisor } from "@qmin/partner-advisors"

/**
 * Build SQL WHERE conditions from filter options.
 * Example: if filters.status is "ACTIVE", returns condition: `status = 'ACTIVE'`
 */
export function buildFilterConditions(filters: AdvisorFilters): unknown[] {
  const conditions: unknown[] = []

  if (filters.status) {
    conditions.push(`status = '${filters.status}'`)
  }
  if (filters.type) {
    conditions.push(`type = '${filters.type}'`)
  }
  if (filters.workspaceCode) {
    conditions.push(`workspace_code = '${filters.workspaceCode}'`)
  }

  return conditions
}

/**
 * Build SQL SET values from update input.
 * Exclude immutable fields (workspaceCode, createdAt, advisorId).
 * Example: { firstName: "John", status: "ACTIVE" } → { first_name: "John", status: "ACTIVE" }
 */
export function buildUpdateValues(input: AdvisorUpdate): Record<string, unknown> {
  const values: Record<string, unknown> = {}

  if (input.firstName !== undefined) values.first_name = input.firstName
  if (input.lastName !== undefined) values.last_name = input.lastName
  if (input.email !== undefined) values.email = input.email
  if (input.type !== undefined) values.type = input.type
  if (input.status !== undefined) values.status = input.status
  if (input.role !== undefined) values.role = input.role

  values.updated_at = new Date()

  return values
}

/**
 * Convert database row to Advisor entity.
 * Handles column name mapping (snake_case → camelCase) and date serialization.
 */
export function mapRow(row: any): Advisor {
  return {
    advisorId: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    type: row.type,
    status: row.status,
    role: row.role,
    workspaceCode: row.workspace_code,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  }
}
