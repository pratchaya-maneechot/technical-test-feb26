/**
 * Domain-specific errors for partner API.
 * Thrown by service layer, caught by controllers.
 */

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "NotFoundError"
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ValidationError"
  }
}

export class ConflictError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ConflictError"
  }
}

/**
 * Handle service errors and return HTTP response.
 * Returns { status: number, body: object }
 */
export function handleError(error: unknown): { status: number; body: unknown } {
  if (error instanceof NotFoundError) {
    return {
      status: 404,
      body: { error: "not_found", message: error.message },
    }
  }

  if (error instanceof ConflictError) {
    return {
      status: 409,
      body: { error: "conflict", message: error.message },
    }
  }

  if (error instanceof ValidationError) {
    return {
      status: 400,
      body: { error: "validation_error", message: error.message },
    }
  }

  if (error instanceof Error) {
    return {
      status: 500,
      body: { error: "internal_error", message: "Internal server error" },
    }
  }

  return {
    status: 500,
    body: { error: "internal_error", message: "Internal server error" },
  }
}
