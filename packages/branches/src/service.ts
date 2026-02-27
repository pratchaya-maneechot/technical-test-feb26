import {
  BRANCH_STATUSES,
  buildPaginationOptions,
  calculateOffset,
  type PaginationOptions,
  type RequestContext,
} from "@qmin/partner-common"
import { Branch, BranchCreate, BranchFilters, BranchRepository, BranchUpdate } from "./types"
import { BranchCodeConflictError, BranchNotFoundError, BranchStatusValidationError } from "./errors"

export class BranchService {
  constructor(private repository: BranchRepository) {}

  async getById(id: string, _ctx: RequestContext): Promise<Branch> {
    const result = await this.repository.getById(id)
    if (!result) {
      throw new BranchNotFoundError()
    }
    return result
  }

  async list(filters: BranchFilters, options: PaginationOptions, _ctx: RequestContext): Promise<{ branches: Branch[]; totalCount: number }> {
    const pagination = buildPaginationOptions(options)

    const result = await this.repository.list(
      filters,
      pagination.pageSize,
      calculateOffset(pagination.pageNumber, pagination.pageSize)
    )

    return {
      branches: result.rows,
      totalCount: result.count
    }
  }

  async create(input: BranchCreate, _ctx: RequestContext): Promise<Branch> {
    this.validateCreate(input)

    const existingBranch = await this.repository.getByCode(input.branchCode)
    if (existingBranch) {
      throw new BranchCodeConflictError()
    }

    return await this.repository.create({
      ...input,
      workspaceCode: input.workspaceCode ?? "default",
    })
  }

  async update(id: string, input: BranchUpdate, _ctx: RequestContext): Promise<Branch> {
    this.validateUpdate(input)

    if (input.branchCode) {
      const existingBranch = await this.repository.getByCode(input.branchCode)
      if (existingBranch && existingBranch.branchId !== id) {
        throw new BranchCodeConflictError()
      }
    }

    const result = await this.repository.update(id, input)
    if (!result) {
      throw new BranchNotFoundError()
    }
    return result
  }

  async delete(id: string, _ctx: RequestContext): Promise<void> {
    const result = await this.repository.delete(id)
    if (!result) {
      throw new BranchNotFoundError()
    }
  }

  private validateCreate(input: BranchCreate): void {
    if (!BRANCH_STATUSES.includes(input.status)) {
      throw new BranchStatusValidationError()
    }
  }

  private validateUpdate(input: BranchUpdate): void {
    if (input.status && !BRANCH_STATUSES.includes(input.status)) {
      throw new BranchStatusValidationError()
    }
  }
}
