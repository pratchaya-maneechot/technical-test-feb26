import { Advisor, AdvisorRepository } from "../src/types"

export const MOCK_ADVISOR: Advisor = {
  advisorId: "adv-123",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  type: "AGENCY",
  status: "ACTIVE",
  role: "AGENT",
  workspaceCode: "default",
  createdAt: new Date("2024-01-15T10:00:00Z"),
  updatedAt: new Date("2024-01-15T10:00:00Z"),
}

export const MOCK_ADVISOR_SUSPENDED: Advisor = {
  advisorId: "adv-456",
  firstName: "Jane",
  lastName: "Smith",
  email: "jane.smith@example.com",
  type: "BANCA",
  status: "SUSPENDED",
  role: "AGENT_LEADER",
  workspaceCode: "default",
  createdAt: new Date("2023-12-01T09:00:00Z"),
  updatedAt: new Date("2024-01-10T14:30:00Z"),
}

export function createMockAdvisorRepository(overrides?: Partial<AdvisorRepository>): AdvisorRepository {
  const store = new Map<string, Advisor>([
    [MOCK_ADVISOR.advisorId, MOCK_ADVISOR],
    [MOCK_ADVISOR_SUSPENDED.advisorId, MOCK_ADVISOR_SUSPENDED],
  ])

  return {
    getById: async (id: string) => store.get(id) ?? null,
    list: async (filters, limit, offset) => {
      let rows = Array.from(store.values())

      if (filters.status) {
        rows = rows.filter((a) => a.status === filters.status)
      }
      if (filters.type) {
        rows = rows.filter((a) => a.type === filters.type)
      }
      if (filters.workspaceCode) {
        rows = rows.filter((a) => a.workspaceCode === filters.workspaceCode)
      }

      const count = rows.length
      rows = rows.slice(offset, offset + limit)

      return { rows, count }
    },
    create: async (input) => {
      const advisor: Advisor = {
        advisorId: `adv-${Date.now()}`,
        ...input,
        workspaceCode: input.workspaceCode ?? "default",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      store.set(advisor.advisorId, advisor)
      return advisor
    },
    update: async (id, input) => {
      const advisor = store.get(id)
      if (!advisor) return null

      const updated: Advisor = {
        ...advisor,
        ...input,
        advisorId: advisor.advisorId,
        workspaceCode: advisor.workspaceCode,
        createdAt: advisor.createdAt,
        updatedAt: new Date(),
      }
      store.set(id, updated)
      return updated
    },
    delete: async (id) => {
      return store.delete(id)
    },
    ...overrides,
  }
}
