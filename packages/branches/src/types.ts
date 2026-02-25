import { BranchStatus } from "@qmin/partner-common"

/**
 * TODO: Define the Branch domain entity.
 *
 * Reference the Advisor entity in packages/advisors/src/types.ts for patterns.
 *
 * Fields:
 * - branchId: string (UUID)
 * - branchCode: string (unique, e.g. "BKK-NORTH-01")
 * - name: string
 * - channelId: string (Channel FK)
 * - managerId: string | null (optional Advisor FK)
 * - status: BranchStatus ("ACTIVE" or "INACTIVE")
 * - region: string
 * - attributes: Record<string, string> (key-value metadata)
 * - workspaceCode: string (immutable after creation)
 * - createdAt: Date
 * - updatedAt: Date
 * - createdBy: string
 */
export interface Branch {
  // TODO: implement
}

/**
 * TODO: Define input for creating a Branch.
 * workspaceCode is optional, defaults to "default".
 */
export interface BranchCreate {
  // TODO: implement
}

/**
 * TODO: Define input for updating a Branch.
 * workspaceCode cannot be changed (immutable).
 */
export interface BranchUpdate {
  // TODO: implement
}

/**
 * TODO: Define filter options for listing Branches.
 */
export interface BranchFilters {
  // TODO: implement
}

/**
 * TODO: Define the BranchRepository interface.
 * Methods: getById, list, create, update, delete
 * Reference AdvisorRepository in packages/advisors/src/types.ts.
 */
export interface BranchRepository {
  // TODO: implement
}
