import {
  BRANCH_STATUSES, calculateOffset, PaginationOptions, RequestContext
} from "@qmin/partner-common"
import { Branch, BranchCreate, BranchFilters, BranchRepository, BranchUpdate } from "./types"
import { BranchConflictError, BranchNotFoundError, BranchStatusValidationError } from "./errors"
import { buildPaginationOptions } from "@qmin/common"

export class BranchService {
  constructor(private repository: BranchRepository) {}

  async getById(id: string, _: RequestContext): Promise<Branch> {
    const result = await this.repository.getById(id)
    if (!result) {
      throw new BranchNotFoundError()
    }
    return result
  }

  async list(filters: BranchFilters, options: PaginationOptions, _: RequestContext): Promise<{ branches: Branch[]; totalCount: number }> {
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

  async create(input: BranchCreate, _: RequestContext): Promise<Branch> {
    if (!BRANCH_STATUSES.includes(input.status)) {
      throw new BranchStatusValidationError()
    }

    const existingBranch = await this.repository.getByCode(input.branchCode)
    if (existingBranch) {
      throw new BranchConflictError()
    }
    return await this.repository.create(input)
  }

  async update(id: string, input: BranchUpdate, _: RequestContext): Promise<Branch> {
    const result = await this.repository.update(id, input)
    if (!result) {
      throw new BranchNotFoundError()
    }
    return result
  }

  async delete(id: string, _: RequestContext): Promise<void> {
    const result = await this.repository.delete(id)
    if (!result) {
      throw new BranchNotFoundError()
    }
  }
}
