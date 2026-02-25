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

export class BranchDrizzleRepository implements BranchRepository {
  // TODO: implement constructor accepting Database

  async getById(id: string): Promise<Branch | null> {
    throw new Error("TODO: implement BranchDrizzleRepository.getById")
  }

  async list(filters: BranchFilters, limit: number, offset: number): Promise<{ rows: Branch[]; count: number }> {
    throw new Error("TODO: implement BranchDrizzleRepository.list")
  }

  async create(input: BranchCreate): Promise<Branch> {
    throw new Error("TODO: implement BranchDrizzleRepository.create")
  }

  async update(id: string, input: BranchUpdate): Promise<Branch | null> {
    throw new Error("TODO: implement BranchDrizzleRepository.update")
  }

  async delete(id: string): Promise<boolean> {
    throw new Error("TODO: implement BranchDrizzleRepository.delete")
  }
}
