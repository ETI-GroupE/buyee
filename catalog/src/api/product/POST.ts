import express from 'express';
import { Response, Request } from "express";
import { rawDatabasePool } from "../../db";

const app = express();
export default app;

app.post('/product', async (req: Request, res: Response) => {
    console.log('/product (POST)')
    upsert(req, res)
})

export async function upsert(req: Request, res: Response) {
    const { product_name, product_description, product_price, product_category, product_ship_location, product_stock } = req.body;

    if ([product_name, product_description, product_price, product_category, product_ship_location, product_stock].includes(undefined)) {
        res.status(400);
        res.send();
        return;
    }

    const query = {
        text:
            `
        INSERT INTO product(product_name, product_description, product_price, product_category, product_ship_location, product_stock) VALUES ($1, $2, $3, $4, $5, $6)

        `,
        values: [product_name, product_description, product_price, product_category, product_ship_location, product_stock],
    }

    rawDatabasePool.query(query, (err, result) => {
        if (err) {
            res.status(400);
        } else {
            res.status(200);
        }

        res.send()
    })
}