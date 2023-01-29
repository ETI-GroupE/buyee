import { Pool, PoolClient } from "pg";
import express from 'express';
import { Response, Request } from "express";
import bodyParser from 'body-parser';
import { rawDatabasePool } from "../../db";
import { upsert } from "./POST";

const app = express();
export default app;

app.delete('/product/:id', async (req: Request, res: Response) => {
    console.log('/product/:id (DELETE)')
    const product_id = req.params.id

    const query = {
        text:
            `
        DELETE FROM product
        WHERE product_id = $1;
        `,
        values: [product_id],
    }
    await rawDatabasePool.query(query, (err, result) => {
        if (err) {
            res.status(400);
        } else {
            res.status(200);
        }

        res.send()
    })
})