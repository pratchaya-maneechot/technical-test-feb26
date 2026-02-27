import { ConflictError, NotFoundError, ValidationError } from "@qmin/common"

export class BranchNotFoundError extends NotFoundError {
  constructor(msg?:string) {
    super(msg ?? "Branch not found")
    this.name = "BranchNotFoundError"
  }
}

export class BranchConflictError extends ConflictError {
  constructor(msg?:string) {
    super(msg ?? "Branch code already exists")
    this.name = "BranchConflictError"
  }
}

export class BranchStatusValidationError extends ValidationError {
  constructor(msg?:string) {
    super(msg ?? "Invalid status")
    this.name = "BranchStatusValidationError"
  }
}