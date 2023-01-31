import express from 'express';
import { Response, Request } from "express";
import { rawDatabasePool } from "../../db";
import { Product } from "../../types/Product";
import { Category } from "../../types/Category";


const app = express();
export default app;

app.get('/categories', async (req: Request, res: Response) => {
    console.log('/categories (GET)')

    const query = {
        text: `SELECT * FROM category
        `,
    }
    rawDatabasePool.query(query, (err, result) => {
        const categories = [];

        if (err) {
            res.status(400);
        } else {
            res.status(200);
            categories.push(...result.rows)
        }

        res.send(categories)
    })

})

app.get('/category/stats', async (req: Request, res: Response) => {
    console.log('/category/stats (GET)')

    const { order_by, limit } = req.query;

    const query = {
        text: `SELECT category.category_name, category.category_id, count(*) AS count FROM product
        INNER JOIN
        category ON product.product_category_id = category.category_id
        WHERE product.product_status = 'ACTIVE'
        GROUP BY category.category_name, category.category_id
        ORDER BY count ${order_by ? order_by : 'DESC'}
        ${limit ? `LIMIT ${limit}` : ''}
        `,
    }
    rawDatabasePool.query(query, (err, result) => {
        const categories = [];

        if (err) {
            res.status(400);
        } else {
            res.status(200);
            categories.push(...result.rows)
        }

        res.send(categories)
    })

})