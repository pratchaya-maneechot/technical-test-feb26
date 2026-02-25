/**
 * Drizzle ORM schema.
 * This file is a placeholder for the technical test.
 * In production, you would define tables and relationships here.
 *
 * TODO (for candidate): Add branches table schema with fields:
 * - branchId (text, primary key, UUID)
 * - branchCode (text, unique)
 * - name (text)
 * - channelId (text, FK)
 * - managerId (text, nullable, FK to advisors)
 * - status (text: "ACTIVE" or "INACTIVE")
 * - region (text)
 * - attributes (jsonb)
 * - workspaceCode (text, default 'default')
 * - createdAt (timestamp)
 * - updatedAt (timestamp)
 * - createdBy (text)
 *
 * Reference: advisors table below
 */

/**
 * Advisors table schema (reference for pattern).
 * In a real repo, this would be imported from a Drizzle module.
 */
export const advisorTableDefinition = `
  id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  role TEXT NOT NULL,
  workspace_code TEXT NOT NULL DEFAULT 'default',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(email, workspace_code)
`

/**
 * TODO (for candidate): Define branches table schema.
 * Pattern: text columns for identifiers/text, jsonb for attributes,
 * timestamp for dates, NOT NULL for required fields.
 */
export const branchTableDefinition = `
  -- TODO: implement
`
