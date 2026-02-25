/**
 * Advisor Drizzle repository implementation.
 * This is a reference implementation. In the technical test,
 * this would use real Drizzle ORM to query PostgreSQL.
 *
 * For testing purposes, the mock implementation (packages/advisors/test/fixtures.ts)
 * provides a working in-memory store.
 */

import { Advisor, AdvisorCreate, AdvisorFilters, AdvisorRepository, AdvisorUpdate } from "@qmin/partner-advisors"

/**
 * TODO (real implementation): AdvisorDrizzleRepository
 * - Inject a database connection
 * - Implement each method using Drizzle query builders
 * - Handle date serialization (toISOString for createdAt/updatedAt)
 * - Support workspaceCode filtering
 *
 * Pattern:
 * async getById(id: string): Promise<Advisor | null> {
 *   const row = await db.query.advisors.findFirst({ where: eq(schema.advisors.id, id) })
 *   return row ? mapRow(row) : null
 * }
 */

export class AdvisorDrizzleRepository implements AdvisorRepository {
  // In the real implementation, receive a database connection
  // constructor(private db: Database) {}

  async getById(id: string): Promise<Advisor | null> {
    // TODO: implement with database query
    return null
  }

  async list(filters: AdvisorFilters, limit: number, offset: number): Promise<{ rows: Advisor[]; count: number }> {
    // TODO: implement with database query
    return { rows: [], count: 0 }
  }

  async create(input: AdvisorCreate): Promise<Advisor> {
    // TODO: implement with INSERT
    throw new Error("Not implemented")
  }

  async update(id: string, input: AdvisorUpdate): Promise<Advisor | null> {
    // TODO: implement with UPDATE
    return null
  }

  async delete(id: string): Promise<boolean> {
    // TODO: implement with DELETE
    return false
  }
}
