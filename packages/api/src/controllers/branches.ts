/**
 * Branch controller.
 * Registers Fastify routes for Branch CRUD endpoints.
 *
 * Endpoints:
 * - GET /v1/branches — list branches (filterable, paginated)
 * - GET /v1/branches/:branchId — get one
 * - POST /v1/branches — create
 * - PATCH /v1/branches/:branchId — update
 * - DELETE /v1/branches/:branchId — delete
 */

import { FastifyInstance } from "fastify"
import { BranchCreate, BranchService, BranchUpdate } from "@qmin/partner-branches"
import { buildPaginationMeta, createTestContext, handleError } from "@qmin/partner-common"

export async function branchesController(app: FastifyInstance, service: BranchService) {
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
