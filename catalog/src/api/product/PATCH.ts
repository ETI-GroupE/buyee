import { Pool, PoolClient } from "pg";
import express from "express";
import { Response, Request } from "express";
import bodyParser from "body-parser";
import { rawDatabasePool } from "../../db";
import { upsert } from "./POST";

const app = express();
export default app;

app.patch("/product/:id", async (req: Request, res: Response) => {
    console.log("/product/:id (PATCH)");
    const product_id = req.params.id;

    const { product_status } = req.body;

    if ([product_status].includes(undefined)) {
        res.status(400);
        res.send();
        return;
    }

    const query = {
        text: `
        UPDATE product
        SET product_status = $1
        WHERE product_id = $2;
        `,
        values: [product_status, product_id],
    };
    await rawDatabasePool.query(query, (err, result) => {
        if (err) {
            res.status(400);
        } else {
            res.status(200);
        }

        res.send();
    });
});
