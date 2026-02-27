/**
 * TODO: Implement BranchDrizzleRepository.
 *
 * Pattern (reference AdvisorDrizzleRepository):
 * 1. Accept database connection in constructor
 * 2. Implement getById, list, create, update, delete methods
 * 3. Support filtering by status, workspaceCode
 * 4. Use helper functions for SQL condition building (branch-repository-helpers.ts)
 * 5. Handle date serialization (toISOString)
 *
 * Unique logic for branches:
 * - branchCode must be unique (ConflictError on duplicate)
 * - managerId is nullable (Advisor FK)
 * - attributes is JSONB column
 */

import { Branch, BranchCreate, BranchFilters, BranchRepository, BranchUpdate } from "@qmin/partner-branches"
import { Database } from "./database"
import { branches } from "./schema"
import { eq, and, count } from "drizzle-orm"
import { buildFilterConditions, buildUpdateValues, mapRow } from "./branch-repository-helpers"
import crypto from "crypto"
import { RequestContext } from "@qmin/common"
import { BranchInsert } from "./types"

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
      .select({ total: count()})
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
    const values: BranchInsert = {
      branch_id: crypto.randomUUID(),
      branch_code: input.branchCode,
      name: input.name,
      channel_id: input.channelId,
      manager_id: input.managerId ?? null,
      status: input.status,
      region: input.region,
      attributes: input.attributes,
      workspace_code: input.workspaceCode ?? "default",
      created_by: this.ctx.userId
    }
    const [row] = await this.db.insert(branches).values(values).returning()
    return mapRow(row)
  }

  async update(id: string, input: BranchUpdate): Promise<Branch | null> {
    const updateValues = buildUpdateValues(input)
    if (Object.keys(updateValues).length === 0) {
      return this.getById(id)
    }
    const [row] = await this.db.update(branches)
      .set(updateValues)
      .where(eq(branches.branch_id, id))
      .returning()
    return row ? mapRow(row) : null
  }

  async delete(id: string): Promise<boolean> {
    const [deleted] = await this.db.delete(branches).where(eq(branches.branch_id, id)).returning()
    return !!deleted
  }
}
