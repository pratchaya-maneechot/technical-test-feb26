/**
 * Advisor Drizzle repository implementation.
 * This is a reference implementation. In the technical test,
 * this would use real Drizzle ORM to query PostgreSQL.
 *
 * For testing purposes, the mock implementation (packages/advisors/test/fixtures.ts)
 * provides a working in-memory store.
 */

import { Advisor, AdvisorCreate, AdvisorFilters, AdvisorRepository, AdvisorUpdate } from "@qmin/partner-advisors"
import { Database } from "./database"
import { advisors } from "./schema"
import { eq, and, sql } from "drizzle-orm"
import { buildFilterConditions, buildInsertValues, buildUpdateValues, mapRow } from "./advisor-repository-helpers"

export class AdvisorDrizzleRepository implements AdvisorRepository {
  constructor(private readonly db: Database) {}

  async getById(id: string): Promise<Advisor | null> {
    const rows = await this.db.select().from(advisors).where(eq(advisors.id, id)).limit(1)
    return rows.length > 0 ? mapRow(rows[0]) : null
  }

  async list(filters: AdvisorFilters, limit: number, offset: number): Promise<{ rows: Advisor[]; count: number }> {
    const conditions = buildFilterConditions(filters)
    const whereClause = conditions.length > 0 ? and(...conditions as any[]) : undefined

    const [{ total }] = await this.db
      .select({ total: sql<number>`count(*)` })
      .from(advisors)
      .where(whereClause)

    const DBRows = await this.db
      .select()
      .from(advisors)
      .where(whereClause)
      .limit(limit)
      .offset(offset)

    return { rows: DBRows.map(mapRow), count: Number(total) }
  }

  async create(input: AdvisorCreate): Promise<Advisor> {
    const values = buildInsertValues(input)

    const [row] = await this.db.insert(advisors).values(values).returning()
    return mapRow(row)
  }

  async update(id: string, input: AdvisorUpdate): Promise<Advisor | null> {
    const updateValues = buildUpdateValues(input)
    const existingAdvisor = await this.getById(id)

    if (!existingAdvisor) {
      return null
    }

    if (Object.keys(updateValues).length === 0) {
      return existingAdvisor
    }

    const [row] = await this.db.update(advisors)
      .set(updateValues)
      .where(eq(advisors.id, id))
      .returning()

    return mapRow(row)
  }

  async delete(id: string): Promise<boolean> {
    const [deleted] = await this.db.delete(advisors).where(eq(advisors.id, id)).returning()
    return !!deleted
  }
}
