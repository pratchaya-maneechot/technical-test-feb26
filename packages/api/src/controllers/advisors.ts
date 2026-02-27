/**
 * Advisor controller (reference implementation).
 * Registers Fastify routes for Advisor CRUD endpoints.
 *
 * Endpoints:
 * - GET /v1/advisors — list advisors (filterable, paginated)
 * - GET /v1/advisors/:advisorId — get one
 * - POST /v1/advisors — create
 * - PATCH /v1/advisors/:advisorId — update
 * - DELETE /v1/advisors/:advisorId — delete
 */

import { FastifyInstance } from "fastify"
import { handleError, createTestContext } from "@qmin/partner-common"
import { AdvisorCreate, AdvisorService, AdvisorUpdate } from "@qmin/partner-advisors"

export async function advisorsController(app: FastifyInstance, service: AdvisorService) {
  // List advisors
  app.get<{ Querystring: Record<string, string> }>("/v1/advisors", async (request, reply) => {
    try {
      const ctx = createTestContext(request.id)
      const filters = {
        status: request.query.status as any,
        type: request.query.type as any,
        workspaceCode: request.query.workspaceCode,
      }
      const options = {
        pageNumber: request.query.pageNumber ? parseInt(request.query.pageNumber) : undefined,
        pageSize: request.query.pageSize ? parseInt(request.query.pageSize) : undefined,
      }

      const { advisors, totalCount } = await service.list(filters, options, ctx)

      return {
        advisors,
        pagination: {
          pageNumber: options.pageNumber ?? 1,
          pageSize: options.pageSize ?? 30,
          totalCount,
        },
      }
    } catch (error) {
      const { status, body } = handleError(error)
      reply.status(status)
      return body
    }
  })

  // Get advisor by ID
  app.get<{ Params: { advisorId: string } }>("/v1/advisors/:advisorId", async (request, reply) => {
    try {
      const ctx = createTestContext(request.id)
      const advisor = await service.getById(request.params.advisorId, ctx)
      return { advisor }
    } catch (error) {
      const { status, body } = handleError(error)
      reply.status(status)
      return body
    }
  })

  // Create advisor
  app.post<{ Body: AdvisorCreate }>("/v1/advisors", async (request, reply) => {
    try {
      const ctx = createTestContext(request.id)
      const advisor = await service.create(request.body, ctx)
      reply.status(201)
      return { advisor }
    } catch (error) {
      const { status, body } = handleError(error)
      reply.status(status)
      return body
    }
  })

  // Update advisor
  app.patch<{ Params: { advisorId: string }; Body: AdvisorUpdate }>("/v1/advisors/:advisorId", async (request, reply) => {
    try {
      const ctx = createTestContext(request.id)
      const advisor = await service.update(request.params.advisorId, request.body, ctx)
      return { advisor }
    } catch (error) {
      const { status, body } = handleError(error)
      reply.status(status)
      return body
    }
  })

  // Delete advisor
  app.delete<{ Params: { advisorId: string } }>("/v1/advisors/:advisorId", async (request, reply) => {
    try {
      const ctx = createTestContext(request.id)
      await service.delete(request.params.advisorId, ctx)
      reply.status(204)
      return
    } catch (error) {
      const { status, body } = handleError(error)
      reply.status(status)
      return body
    }
  })
}
