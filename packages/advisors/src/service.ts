import { ADVISOR_STATUSES, ADVISOR_TYPES, ADVISOR_ROLES, NotFoundError, ValidationError, calculateOffset, type RequestContext } from "@qmin/partner-common"
import { Advisor, AdvisorCreate, AdvisorFilters, AdvisorRepository, AdvisorUpdate } from "./types"

export class AdvisorService {
  constructor(private repository: AdvisorRepository) {}

  async getById(id: string, _ctx: RequestContext): Promise<Advisor> {
    const advisor = await this.repository.getById(id)
    if (!advisor) {
      throw new NotFoundError(`Advisor ${id} not found`)
    }
    return advisor
  }

  async list(filters: AdvisorFilters, options: { pageNumber?: number; pageSize?: number }, _ctx: RequestContext): Promise<{ advisors: Advisor[]; totalCount: number }> {
    const pageNumber = Math.max(1, options.pageNumber ?? 1)
    const pageSize = Math.max(1, Math.min(100, options.pageSize ?? 30))
    const offset = calculateOffset(pageNumber, pageSize)

    const { rows, count } = await this.repository.list(filters, pageSize, offset)
    return { advisors: rows, totalCount: count }
  }

  async create(input: AdvisorCreate, _ctx: RequestContext): Promise<Advisor> {
    this.validateCreate(input)
    const advisor = await this.repository.create({
      ...input,
      workspaceCode: input.workspaceCode ?? "default",
    })
    return advisor
  }

  async update(id: string, input: AdvisorUpdate, _ctx: RequestContext): Promise<Advisor> {
    this.validateUpdate(input)
    const advisor = await this.repository.update(id, input)
    if (!advisor) {
      throw new NotFoundError(`Advisor ${id} not found`)
    }
    return advisor
  }

  async delete(id: string, _ctx: RequestContext): Promise<void> {
    const deleted = await this.repository.delete(id)
    if (!deleted) {
      throw new NotFoundError(`Advisor ${id} not found`)
    }
  }

  private validateCreate(input: AdvisorCreate): void {
    if (!ADVISOR_STATUSES.includes(input.status)) {
      throw new ValidationError(`Invalid status: ${input.status}`)
    }
    if (!ADVISOR_TYPES.includes(input.type)) {
      throw new ValidationError(`Invalid type: ${input.type}`)
    }
    if (!ADVISOR_ROLES.includes(input.role)) {
      throw new ValidationError(`Invalid role: ${input.role}`)
    }
  }

  private validateUpdate(input: AdvisorUpdate): void {
    if (input.status && !ADVISOR_STATUSES.includes(input.status)) {
      throw new ValidationError(`Invalid status: ${input.status}`)
    }
    if (input.type && !ADVISOR_TYPES.includes(input.type)) {
      throw new ValidationError(`Invalid type: ${input.type}`)
    }
    if (input.role && !ADVISOR_ROLES.includes(input.role)) {
      throw new ValidationError(`Invalid role: ${input.role}`)
    }
  }
}
