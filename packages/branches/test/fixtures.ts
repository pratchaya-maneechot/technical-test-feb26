import { BranchRepository } from "../src/types"

/**
 * TODO: Define MOCK_BRANCH and other fixtures.
 *
 * Reference packages/advisors/test/fixtures.ts for patterns.
 */
export const MOCK_BRANCH = {} as any

/**
 * TODO: Implement createMockBranchRepository().
 *
 * Pattern:
 * 1. Create a Map<string, Branch> store
 * 2. Initialize with MOCK_BRANCH
 * 3. Implement all BranchRepository methods using the store
 * 4. Support filtering by status, workspaceCode
 * 5. Support pagination (limit, offset)
 *
 * Reference packages/advisors/test/fixtures.ts.
 */
export function createMockBranchRepository(overrides?: Partial<BranchRepository>): BranchRepository {
  return {} as any
}
