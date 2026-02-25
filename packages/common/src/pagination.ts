export interface PaginationOptions {
  pageNumber?: number
  pageSize?: number
}

export interface PaginationMeta {
  pageNumber: number
  pageSize: number
  totalCount: number
}

/**
 * Parse and validate pagination options from query params.
 * Defaults: pageNumber=1, pageSize=30
 */
export function buildPaginationMeta(
  totalCount: number,
  options: PaginationOptions
): PaginationMeta {
  const pageNumber = Math.max(1, options.pageNumber ?? 1)
  const pageSize = Math.max(1, Math.min(100, options.pageSize ?? 30))

  return {
    pageNumber,
    pageSize,
    totalCount,
  }
}

/**
 * Calculate offset for database queries.
 * Offset = (pageNumber - 1) * pageSize
 */
export function calculateOffset(
  pageNumber: number,
  pageSize: number
): number {
  return (pageNumber - 1) * pageSize
}
