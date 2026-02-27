import {
  Branch,
  BranchCreate,
  BranchFilters,
  BranchRepository,
  BranchUpdate,
} from "../src/types"

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
  createdAt: new Date("2024-01-15T10:00:00Z"),
  updatedAt: new Date("2024-01-15T10:00:00Z"),
  createdBy: "test-user-id",
}

export const MOCK_BRANCH_INACTIVE: Branch = {
  branchId: "br-456",
  branchCode: "BKK-SOUTH-01",
  name: "Bangkok South Branch",
  channelId: "ch-456",
  managerId: null,
  status: "INACTIVE" as const,
  region: "Bangkok",
  attributes: { zone: "south", tier: "standard" },
  workspaceCode: "default",
  createdAt: new Date("2023-12-01T09:00:00Z"),
  updatedAt: new Date("2024-01-10T14:30:00Z"),
  createdBy: "test-user-id",
}

export function createMockBranchRepository(
  overrides?: Partial<BranchRepository>
): BranchRepository {
  const store = new Map<string, Branch>([
    [MOCK_BRANCH.branchId, MOCK_BRANCH],
    [MOCK_BRANCH_INACTIVE.branchId, MOCK_BRANCH_INACTIVE],
  ])

  return {
    getByCode: async (code: string) =>
      Array.from(store.values()).find((branch) => branch.branchCode === code) ?? null,

    getById: async (id: string) => store.get(id) ?? null,

    list: async (filters: BranchFilters, limit: number, offset: number) => {
      let rows = Array.from(store.values())

      if (filters.status) {
        rows = rows.filter((b) => b.status === filters.status)
      }
      if (filters.workspaceCode) {
        rows = rows.filter((b) => b.workspaceCode === filters.workspaceCode)
      }

      const count = rows.length
      rows = rows.slice(offset, offset + limit)

      return { rows, count }
    },

    create: async (input: BranchCreate) => {
      const branch: Branch = {
        ...input,
        branchId: `br-${Date.now()}`,
        workspaceCode: input.workspaceCode ?? "default",
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "test-user-id",
      }
      store.set(branch.branchId, branch)
      return branch
    },

    update: async (id: string, input: BranchUpdate) => {
      const branch = store.get(id)
      if (!branch) return null

      const updated: Branch = {
        ...branch,
        ...input,
        branchId: branch.branchId,
        workspaceCode: branch.workspaceCode,
        createdAt: branch.createdAt,
        updatedAt: new Date(),
      }
      store.set(id, updated)
      return updated
    },

    delete: async (id: string) => store.delete(id),

    ...overrides,
  }
}
