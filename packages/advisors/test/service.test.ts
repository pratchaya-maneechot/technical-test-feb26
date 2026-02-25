import { describe, test, expect } from "bun:test"
import { createTestContext, NotFoundError, ValidationError } from "@qmin/partner-common"
import { AdvisorService } from "../src"
import { MOCK_ADVISOR, MOCK_ADVISOR_SUSPENDED, createMockAdvisorRepository } from "./fixtures"

describe("AdvisorService", () => {
  test("getById returns advisor by id", async () => {
    const expected = MOCK_ADVISOR
    const input = { repository: createMockAdvisorRepository() }
    const service = new AdvisorService(input.repository)
    const ctx = createTestContext()

    const result = await service.getById(MOCK_ADVISOR.advisorId, ctx)

    expect(result).toEqual(expected)
  })

  test("getById throws NotFoundError for unknown id", async () => {
    const input = { repository: createMockAdvisorRepository() }
    const service = new AdvisorService(input.repository)
    const ctx = createTestContext()

    try {
      await service.getById("unknown-id", ctx)
      expect.unreachable()
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError)
    }
  })

  test("create persists and returns new advisor", async () => {
    const input = {
      repository: createMockAdvisorRepository(),
      createInput: {
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice@example.com",
        type: "BROKER" as const,
        status: "ACTIVE" as const,
        role: "VICE_PRESIDENT" as const,
      },
    }
    const service = new AdvisorService(input.repository)
    const ctx = createTestContext()

    const result = await service.create(input.createInput, ctx)

    expect(result.firstName).toBe("Alice")
    expect(result.status).toBe("ACTIVE")
    expect(result.workspaceCode).toBe("default")
    expect(result.advisorId).toBeDefined()
    expect(result.createdAt).toBeDefined()
  })

  test("create throws ValidationError for invalid status", async () => {
    const input = {
      repository: createMockAdvisorRepository(),
      createInput: {
        firstName: "Bob",
        lastName: "Lee",
        email: "bob@example.com",
        type: "AGENCY" as const,
        status: "INVALID_STATUS" as unknown as "ACTIVE",
        role: "AGENT" as const,
      },
    }
    const service = new AdvisorService(input.repository)
    const ctx = createTestContext()

    try {
      await service.create(input.createInput, ctx)
      expect.unreachable()
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError)
    }
  })

  test("list returns advisors filtered by status", async () => {
    const input = { repository: createMockAdvisorRepository() }
    const service = new AdvisorService(input.repository)
    const ctx = createTestContext()

    const result = await service.list({ status: "SUSPENDED" }, {}, ctx)

    expect(result.advisors).toHaveLength(1)
    expect(result.advisors[0]).toEqual(MOCK_ADVISOR_SUSPENDED)
    expect(result.totalCount).toBe(1)
  })

  test("delete removes advisor and throws NotFoundError on re-fetch", async () => {
    const input = { repository: createMockAdvisorRepository() }
    const service = new AdvisorService(input.repository)
    const ctx = createTestContext()

    await service.delete(MOCK_ADVISOR.advisorId, ctx)

    try {
      await service.getById(MOCK_ADVISOR.advisorId, ctx)
      expect.unreachable()
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError)
    }
  })
})
