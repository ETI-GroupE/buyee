import express from 'express';
import { Response, Request } from "express";
import { rawDatabasePool } from "../../db";
import { Product } from "../../types/Product";
import { Category } from "../../types/Category";


const app = express();
export default app;

app.get('/products', async (req: Request, res: Response) => {
    console.log('/products (GET)')
    const { category_id } = req.query;

    const query = {
        text:
            `
        SELECT * FROM product ${category_id === undefined ? "" : `WHERE category_id = ${category_id}`}
        `,
    }

    rawDatabasePool.query(query, (err, result) => {
        const products = [];

        if (err) {
            res.status(400);
        } else {
            res.status(200);
            products.push(...result.rows)
        }

        res.send(products)
    })

})
