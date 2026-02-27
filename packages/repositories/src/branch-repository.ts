/**
 * Branch Drizzle repository implementation.
 * Uses Drizzle ORM to query PostgreSQL for Branch entities.
 *
 * For testing purposes, the mock implementation (packages/branches/test/fixtures.ts)
 * provides a working in-memory store.
 */

import { Branch, BranchCreate, BranchFilters, BranchRepository, BranchUpdate } from "@qmin/partner-branches"
import { Database } from "./database"
import { branches } from "./schema"
import { eq, and, sql } from "drizzle-orm"
import { buildFilterConditions, buildInsertValues, buildUpdateValues, mapRow } from "./branch-repository-helpers"
import { RequestContext } from "@qmin/partner-common"

export class BranchDrizzleRepository implements BranchRepository {
  constructor(private readonly db: Database, private readonly ctx: RequestContext) {}

  async getById(id: string): Promise<Branch | null> {
    const rows = await this.db.select().from(branches).where(eq(branches.branch_id, id)).limit(1)
    return rows.length > 0 ? mapRow(rows[0]) : null
  }

  async getByCode(code: string): Promise<Branch | null> {
    const rows = await this.db.select().from(branches).where(eq(branches.branch_code, code)).limit(1)
    return rows.length > 0 ? mapRow(rows[0]) : null
  }

  async list(filters: BranchFilters, limit: number, offset: number): Promise<{ rows: Branch[]; count: number }> {
    const conditions = buildFilterConditions(filters)
    const whereClause = conditions.length > 0 ? and(...conditions as any[]) : undefined
    
    const [{ total }] = await this.db
      .select({ total: sql<number>`count(*)` })
      .from(branches)
      .where(whereClause)
      
    const DBRows = await this.db
      .select()
      .from(branches)
      .where(whereClause)
      .limit(limit)
      .offset(offset)

    return { rows: DBRows.map(mapRow), count: Number(total) }
  }

  async create(input: BranchCreate): Promise<Branch> {
    const values = buildInsertValues(input, this.ctx.userId)
    const [row] = await this.db.insert(branches).values(values).returning()
    return mapRow(row)
  }

  async update(id: string, input: BranchUpdate): Promise<Branch | null> {
    const updateValues = buildUpdateValues(input)
    const existingBranch = await this.getById(id)

    if (!existingBranch) {
      return null
    }

    if (Object.keys(updateValues).length === 0) {
      return existingBranch
    }

    const [row] = await this.db.update(branches)
      .set(updateValues)
      .where(eq(branches.branch_id, id))
      .returning()
    return mapRow(row)
  }

  async delete(id: string): Promise<boolean> {
    const [deleted] = await this.db.delete(branches).where(eq(branches.branch_id, id)).returning()
    return !!deleted
  }
}
