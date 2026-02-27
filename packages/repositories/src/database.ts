import type { PostgresJsDatabase } from "drizzle-orm/postgres-js"
import * as schema from "./schema"
import { drizzle } from 'drizzle-orm/postgres-js';

/**
 * Database type
 */
export type Database = PostgresJsDatabase<typeof schema>

export interface NewPostgresJsDatabaseOptions {
  connectionString: string
  ssl?: boolean
}

export function NewPostgresJsDatabase(options: NewPostgresJsDatabaseOptions): Database {
  return drizzle({
    connection: {
      url: options.connectionString,
      ssl: options.ssl ?? false
    }
  });
}
