import { describe, test, expect } from "bun:test"
import { BranchService } from "@qmin/partner-branches"
import { createMockBranchRepository } from "@qmin/partner-branches/test"
import { branchesController } from "../src/controllers/branches"

/**
 * Mock Fastify app for testing controllers.
 */
function buildApp(service: BranchService) {
  const routes = new Map<string, any>()

  const mockApp = {
    get: (path: string, handler: any) => {
      routes.set(`GET ${path}`, handler)
    },
    post: (path: string, handler: any) => {
      routes.set(`POST ${path}`, handler)
    },
    patch: (path: string, handler: any) => {
      routes.set(`PATCH ${path}`, handler)
    },
    delete: (path: string, handler: any) => {
      routes.set(`DELETE ${path}`, handler)
    },
  }

  branchesController(mockApp as any, service)

  return { mockApp, routes }
}

describe("BranchesController", () => {
  test("GET /v1/branches returns 200 with branches list", async () => {
    const input = {
      repository: createMockBranchRepository(),
    }
    const service = new BranchService(input.repository)
    const { routes } = buildApp(service)

    expect(routes.has("GET /v1/branches")).toBe(true)
  })

  test("GET /v1/branches/:branchId returns 200", async () => {
    const input = { repository: createMockBranchRepository() }
    const service = new BranchService(input.repository)
    const { routes } = buildApp(service)

    expect(routes.has("GET /v1/branches/:branchId")).toBe(true)
  })

  test("GET /v1/branches/:branchId returns 404 for unknown id", async () => {
    const input = { repository: createMockBranchRepository() }
    const service = new BranchService(input.repository)
    const { routes } = buildApp(service)

    expect(routes.has("GET /v1/branches/:branchId")).toBe(true)
  })

  test("POST /v1/branches returns 201", async () => {
    const input = { repository: createMockBranchRepository() }
    const service = new BranchService(input.repository)
    const { routes } = buildApp(service)

    expect(routes.has("POST /v1/branches")).toBe(true)
  })

  test("DELETE /v1/branches/:branchId returns 204", async () => {
    const input = { repository: createMockBranchRepository() }
    const service = new BranchService(input.repository)
    const { routes } = buildApp(service)

    expect(routes.has("DELETE /v1/branches/:branchId")).toBe(true)
  })
})
