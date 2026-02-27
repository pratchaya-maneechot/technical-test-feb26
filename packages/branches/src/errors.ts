import { ConflictError, NotFoundError, ValidationError } from "@qmin/partner-common"

export class BranchNotFoundError extends NotFoundError {
  constructor(msg?: string) {
    super(msg ?? "Branch not found")
    this.name = BranchNotFoundError.name
  }
}

export class BranchCodeConflictError extends ConflictError {
  constructor(msg?: string) {
    super(msg ?? "Branch code already exists")
    this.name = BranchCodeConflictError.name
  }
}

export class BranchStatusValidationError extends ValidationError {
  constructor(msg?: string) {
    super(msg ?? "Invalid status")
    this.name = BranchStatusValidationError.name
  }
}