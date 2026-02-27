import { createTestContext } from "@qmin/common"
import {
  Branch,
  BranchCreate,
  BranchFilters,
  BranchRepository,
  BranchUpdate
} from "../src/types"

/**
 * Define MOCK_BRANCH and other fixtures.
 *
 * Reference packages/advisors/test/fixtures.ts for patterns.
 */
export const MOCK_BRANCH: Branch = {
  branchId: "br-123",
  branchCode: "BKK-NORTH-01",
  name: "Bangkok North Branch",
  channelId: "ch-123",
  managerId: "adv-123",
  status: "ACTIVE" as const,
  region: "Bangkok",
  attributes: { zone: "north", tier: "premium" },
  workspaceCode: "default",
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: "mock"
}

/**
 * Implement createMockBranchRepository().
 *
 * Pattern:
 * 1. Create a Map<string, Branch> store
 * 2. Initialize with MOCK_BRANCH
 * 3. Implement all BranchRepository methods using the store
 * 4. Support filtering by status, workspaceCode
 * 5. Support pagination (limit, offset)
 */
export function createMockBranchRepository(
  overrides?: Partial<BranchRepository>
): BranchRepository {
  const store = new Map<string, Branch>()
  store.set(MOCK_BRANCH.branchId, MOCK_BRANCH)
  const ctx = createTestContext()
  return {
    getByCode: async (code: string) =>
      Array.from(store.values()).find((branch) => branch.branchCode === code) ??
      null,
    getById: async (id: string) => store.get(id) ?? null,
    list: async (filters: BranchFilters, limit: number, offset: number) => {
      const branches = Array.from(store.values())

      const filtered = branches.filter((branch) => {
        const statusFiltered =
          !filters.status || branch.status === filters.status

        const workspaceFiltered =
          !filters.workspaceCode ||
          branch.workspaceCode === filters.workspaceCode

        return statusFiltered && workspaceFiltered
      })

      const sorted = filtered.sort((a, b) =>
        a.branchId.localeCompare(b.branchId)
      )

      const paginated = sorted.slice(offset, offset + limit)
      return {
        rows: paginated,
        count: filtered.length
      }
    },
    create: async (input: BranchCreate) => {
      const branch: Branch = {
        ...input,
        branchId: "br-123",
        workspaceCode: input.workspaceCode ?? "default",
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: ctx.userId
      }
      store.set(branch.branchId, branch)
      return branch
    },
    update: async (id: string, input: BranchUpdate) => {
      const branch = store.get(id)
      if (!branch) {
        return null
      }
      const updatedBranch = {
        ...branch,
        ...input,
        updatedAt: new Date()
      }
      store.set(id, updatedBranch)
      return updatedBranch
    },
    delete: async (id: string) => {
      const branch = store.get(id)
      if (!branch) {
        return false
      }
      store.delete(id)
      return true
    },
    ...overrides
  }
}
