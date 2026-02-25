/**
 * TODO: Implement branchesController.
 *
 * Pattern (reference advisorsController):
 * 1. Accept Fastify app instance and BranchService
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
import { BranchService } from "@qmin/partner-branches"

export async function branchesController(app: FastifyInstance, service: BranchService) {
  // TODO: register routes
  // GET /v1/branches
  // GET /v1/branches/:branchId
  // POST /v1/branches
  // PATCH /v1/branches/:branchId
  // DELETE /v1/branches/:branchId
}
