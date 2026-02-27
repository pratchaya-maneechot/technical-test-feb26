import { BranchStatus } from "@qmin/partner-common"

/**
 * Define the Branch domain entity.
 */
export interface Branch {
  branchId: string
  branchCode: string
  name: string
  channelId: string
  managerId: string | null
  status: BranchStatus
  region: string
  attributes: Record<string, string>
  workspaceCode: string
  createdAt: Date
  updatedAt: Date
  createdBy: string
}

/**
 * Define input for creating a Branch.
 * workspaceCode is optional, defaults to "default".
 */
export interface BranchCreate {
  branchCode: string
  name: string
  channelId: string
  managerId: string | null
  status: BranchStatus
  region: string
  attributes: Record<string, string>
  workspaceCode?: string
}

/**
 * Define input for updating a Branch.
 * workspaceCode cannot be changed (immutable).
 */
export interface BranchUpdate {
  branchCode?: string
  name?: string
  channelId?: string
  managerId?: string | null
  status?: BranchStatus
  region?: string
  attributes?: Record<string, string>
}

/**
 * Define filter options for listing Branches.
 */
export interface BranchFilters {
  status?: BranchStatus
  workspaceCode?: string
}

/**
 * Define the BranchRepository interface.
 * Methods: getById, list, create, update, delete
 */
export interface BranchRepository {
  getById(id: string): Promise<Branch | null>
  getByCode(code: string): Promise<Branch | null>
  list(
    filters: BranchFilters,
    limit: number,
    offset: number
  ): Promise<{ rows: Branch[]; count: number }>
  create(input: BranchCreate): Promise<Branch>
  update(id: string, input: BranchUpdate): Promise<Branch | null>
  delete(id: string): Promise<boolean>
}
