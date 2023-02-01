import { Pool, createPool } from "mysql2"

export const rawDatabasePool: Pool = createPool({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'db',
    port: 3306,
})