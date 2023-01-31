import { Pool } from "pg"

const connectionString = `postgresql://postgres:mysecretpassword@${process.env.API_PORT ? "feedback-db-1" : "localhost"}:5433/postgres`
export const rawDatabasePool: Pool = new Pool({
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0,
    connectionString: connectionString,
})