import { describe, test, expect } from "bun:test"
import { createTestContext, NotFoundError, ValidationError, ConflictError } from "@qmin/partner-common"
import { BranchService } from "../src"
import { MOCK_BRANCH, createMockBranchRepository } from "./fixtures"

describe("BranchService", () => {
  test.skip("getById returns branch by id", async () => {
    const expected = MOCK_BRANCH
    const input = { repository: createMockBranchRepository() }
    const service = new BranchService(input.repository)
    const ctx = createTestContext()

    const result = await service.getById(MOCK_BRANCH.branchId, ctx)

    expect(result).toEqual(expected)
  })

  test.skip("getById throws NotFoundError for unknown id", async () => {
    const input = { repository: createMockBranchRepository() }
    const service = new BranchService(input.repository)
    const ctx = createTestContext()

    try {
      await service.getById("unknown-id", ctx)
      expect.unreachable()
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError)
    }
  })

  test.skip("create persists and returns new branch", async () => {
    const input = {
      repository: createMockBranchRepository(),
      createInput: {
        branchCode: "BKK-NORTH-02",
        name: "Bangkok North Branch",
        channelId: "ch-123",
        managerId: "adv-456",
        status: "ACTIVE" as const,
        region: "Bangkok",
        attributes: { zone: "north", tier: "premium" },
      },
    }
    const service = new BranchService(input.repository)
    const ctx = createTestContext()

    const result = await service.create(input.createInput, ctx)

    expect(result.name).toBe("Bangkok North Branch")
    expect(result.status).toBe("ACTIVE")
    expect(result.workspaceCode).toBe("default")
    expect(result.branchId).toBeDefined()
    expect(result.createdAt).toBeDefined()
  })

  test.skip("create throws ConflictError for duplicate branchCode", async () => {
    const input = {
      repository: createMockBranchRepository(),
      createInput: {
        branchCode: MOCK_BRANCH.branchCode,
        name: "Duplicate Branch",
        channelId: "ch-999",
        managerId: null,
        status: "ACTIVE" as const,
        region: "Bangkok",
        attributes: {},
      },
    }
    const service = new BranchService(input.repository)
    const ctx = createTestContext()

    try {
      await service.create(input.createInput, ctx)
      expect.unreachable()
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictError)
    }
  })

  test.skip("create throws ValidationError for invalid status", async () => {
    const input = {
      repository: createMockBranchRepository(),
      createInput: {
        branchCode: "BKK-TEST",
        name: "Test Branch",
        channelId: "ch-789",
        managerId: null,
        status: "INVALID_STATUS" as unknown as "ACTIVE",
        region: "Bangkok",
        attributes: {},
      },
    }
    const service = new BranchService(input.repository)
    const ctx = createTestContext()

    try {
      await service.create(input.createInput, ctx)
      expect.unreachable()
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError)
    }
  })

  test.skip("list returns branches filtered by status", async () => {
    const input = { repository: createMockBranchRepository() }
    const service = new BranchService(input.repository)
    const ctx = createTestContext()

    const result = await service.list({ status: "ACTIVE" }, {}, ctx)

    expect(result.branches.length).toBeGreaterThan(0)
    expect(result.branches[0].status).toBe("ACTIVE")
    expect(result.totalCount).toBeGreaterThan(0)
  })
})
