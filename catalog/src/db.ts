import { Pool } from "pg"

const connectionString = `postgresql://postgres:mysecretpassword@${process.env.API_PORT ? "catalog-db-1" : "localhost"}:5432/postgres`
export const rawDatabasePool: Pool = new Pool({
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0,
    connectionString: connectionString,
})