/**
 * TODO: Implement branchesController.
 *
 * Pattern (reference branchesController):
 * 1. Accept Fastify app instance and brancheservice
 * 2. Register endpoints:
 *    - GET /v1/branches — list (filterable, paginated)
 *    - GET /v1/branches/:branchId — get one
 *    - POST /v1/branches — create
 *    - PATCH /v1/branches/:branchId — update (optional, but include)
 *    - DELETE /v1/branches/:branchId — delete
 * 3. Extract query params, request body, URL params
 * 4. Call service methods passing RequestContext
 * 5. Handle errors with handleError()
 * 6. Return appropriate status codes (200, 201, 204, 400, 404, 409)
 */

import { FastifyInstance } from "fastify"
import { BranchCreate, BranchService, BranchUpdate } from "@qmin/partner-branches"
import { buildPaginationMeta, createTestContext, handleError } from "@qmin/common"

export async function branchesController(app: FastifyInstance, service: BranchService) {
  // List branches
  app.get<{ Querystring: Record<string, string> }>("/v1/branches", async (request, reply) => {
    try {
      const ctx = createTestContext(request.id)
      const filters = {
        status: request.query.status as any ,
        workspaceCode: request.query.workspaceCode,
      }
      const options = {
        pageNumber: request.query.pageNumber ? parseInt(request.query.pageNumber) : undefined,
        pageSize: request.query.pageSize ? parseInt(request.query.pageSize) : undefined,
      }

      const { branches, totalCount } = await service.list(filters, options, ctx)

      return {
        branches,
        pagination: buildPaginationMeta(totalCount, options),
      }
    } catch (error) {
      const { status, body } = handleError(error)
      reply.status(status)
      return body
    }
  })

  // Get branch by ID
  app.get<{ Params: { branchId: string } }>("/v1/branches/:branchId", async (request, reply) => {
    try {
      const ctx = createTestContext(request.id)
      const branch = await service.getById(request.params.branchId, ctx)
      return { branch }
    } catch (error) {
      const { status, body } = handleError(error)
      reply.status(status)
      return body
    }
  })

  // Create branch
  app.post<{ Body: BranchCreate }>("/v1/branches", async (request, reply) => {
    try {
      const ctx = createTestContext(request.id)
      const branch = await service.create(request.body, ctx)
      reply.status(201)
      return { branch }
    } catch (error) {
      const { status, body } = handleError(error)
      reply.status(status)
      return body
    }
  })

  // Update branch
  app.patch<{ Params: { branchId: string }; Body: BranchUpdate }>("/v1/branches/:branchId", async (request, reply) => {
    try {
      const ctx = createTestContext(request.id)
      const branch = await service.update(request.params.branchId, request.body, ctx)
      return { branch }
    } catch (error) {
      const { status, body } = handleError(error)
      reply.status(status)
      return body
    }
  })

  // Delete branch
  app.delete<{ Params: { branchId: string } }>("/v1/branches/:branchId", async (request, reply) => {
    try {
      const ctx = createTestContext(request.id)
      await service.delete(request.params.branchId, ctx)
      reply.status(204)
      return
    } catch (error) {
      const { status, body } = handleError(error)
      reply.status(status)
      return body
    }
  })

}
