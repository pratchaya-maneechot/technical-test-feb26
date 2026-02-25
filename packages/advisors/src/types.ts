import { AdvisorStatus, AdvisorType, AdvisorRole } from "@qmin/partner-common"

/**
 * Advisor domain entity.
 * Represents an insurance advisor/agent.
 */
export interface Advisor {
  advisorId: string
  firstName: string
  lastName: string
  email: string
  type: AdvisorType
  status: AdvisorStatus
  role: AdvisorRole
  workspaceCode: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Input for creating a new Advisor.
 * workspaceCode is optional, defaults to "default".
 */
export interface AdvisorCreate {
  firstName: string
  lastName: string
  email: string
  type: AdvisorType
  status: AdvisorStatus
  role: AdvisorRole
  workspaceCode?: string
}

/**
 * Input for updating an Advisor.
 * workspaceCode cannot be changed (immutable).
 */
export interface AdvisorUpdate {
  firstName?: string
  lastName?: string
  email?: string
  type?: AdvisorType
  status?: AdvisorStatus
  role?: AdvisorRole
}

/**
 * Filter options for listing Advisors.
 */
export interface AdvisorFilters {
  status?: AdvisorStatus
  type?: AdvisorType
  workspaceCode?: string
}

/**
 * Repository interface for Advisor storage.
 * Implementations: Drizzle, in-memory for testing.
 */
export interface AdvisorRepository {
  getById(id: string): Promise<Advisor | null>
  list(filters: AdvisorFilters, limit: number, offset: number): Promise<{ rows: Advisor[]; count: number }>
  create(input: AdvisorCreate): Promise<Advisor>
  update(id: string, input: AdvisorUpdate): Promise<Advisor | null>
  delete(id: string): Promise<boolean>
}
