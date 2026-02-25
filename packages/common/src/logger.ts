/**
 * Logger interface for structured logging.
 * Implemented by Pino in production, test stub in tests.
 */
export interface Logger {
  debug(msg: string, ...args: unknown[]): void
  info(msg: string, ...args: unknown[]): void
  warn(msg: string, ...args: unknown[]): void
  error(msg: string, ...args: unknown[]): void
}
