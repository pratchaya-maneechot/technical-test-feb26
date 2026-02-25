import { Logger } from "./logger"

/**
 * Request context passed through service layer.
 * Contains request ID and logger for structured logging.
 */
export interface RequestContext {
  requestId: string
  log: Logger
}

/**
 * Create a test context for unit tests.
 */
export function createTestContext(
  requestId = "test-request-id"
): RequestContext {
  return {
    requestId,
    log: {
      debug: () => {},
      info: () => {},
      warn: () => {},
      error: () => {},
    },
  }
}
