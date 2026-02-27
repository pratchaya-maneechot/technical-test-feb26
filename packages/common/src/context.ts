import { Logger } from "./logger"

/**
 * Request context passed through service layer.
 * Contains request ID and logger for structured logging.
 */
export interface RequestContext {
  requestId: string
  log: Logger
  userId: string
}

/**
 * Create a test context for unit tests.
 */
export function createTestContext(
  requestId = "test-request-id",
  userId = "test-user-id"
): RequestContext {
  return {
    userId,
    requestId,
    log: {
      debug: () => {},
      info: () => {},
      warn: () => {},
      error: () => {},
    },
  }
}
