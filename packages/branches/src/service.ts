import { RequestContext } from "@qmin/partner-common"
import { Branch, BranchCreate, BranchFilters, BranchRepository, BranchUpdate } from "./types"

/**
 * TODO: Implement BranchService.
 *
 * Reference AdvisorService in packages/advisors/src/service.ts for patterns.
 *
 * Methods:
 * - async getById(id: string, ctx: RequestContext): Promise<Branch>
 * - async list(filters: BranchFilters, options: { pageNumber?: number; pageSize?: number }, ctx: RequestContext): Promise<{ branches: Branch[]; totalCount: number }>
 * - async create(input: BranchCreate, ctx: RequestContext): Promise<Branch>
 * - async update(id: string, input: BranchUpdate, ctx: RequestContext): Promise<Branch>
 * - async delete(id: string, ctx: RequestContext): Promise<void>
 *
 * Error handling:
 * - Throw NotFoundError when entity not found
 * - Throw ValidationError for invalid status values
 * - Throw ConflictError for duplicate branchCode
 */
export class BranchService {
  constructor(private repository: BranchRepository) {}

  async getById(id: string, ctx: RequestContext): Promise<Branch> {
    throw new Error("TODO: implement BranchService.getById")
  }

  async list(filters: BranchFilters, options: { pageNumber?: number; pageSize?: number }, ctx: RequestContext): Promise<{ branches: Branch[]; totalCount: number }> {
    throw new Error("TODO: implement BranchService.list")
  }

  async create(input: BranchCreate, ctx: RequestContext): Promise<Branch> {
    throw new Error("TODO: implement BranchService.create")
  }

  async update(id: string, input: BranchUpdate, ctx: RequestContext): Promise<Branch> {
    throw new Error("TODO: implement BranchService.update")
  }

  async delete(id: string, ctx: RequestContext): Promise<void> {
    throw new Error("TODO: implement BranchService.delete")
  }
}
