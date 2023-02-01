import express from 'express';
import { Response, Request } from "express";
import { rawDatabasePool } from "../../db";


const app = express();
export default app;

app.get('/feedbacks', async (req: Request, res: Response) => {
    console.log('/feedbacks (GET)')
    const { product_id, user_id, limit, offset } = req.query;

    let productIdCondition = '';
    if (Array.isArray(product_id)) {
        productIdCondition = `product_id IN (${product_id.join(", ")})`
    } else {
        productIdCondition = `${product_id === undefined ? "" : `product_id = ${product_id}`}`
    }

    let userIdCondition = '';
    if (Array.isArray(user_id)) {
        userIdCondition = `user_id IN (${user_id.join(", ")})`
    } else {
        userIdCondition = `${user_id === undefined ? "" : `user_id = ${user_id}`}`
    }

    const conditionString = [productIdCondition, userIdCondition].filter(i => i !== '')
    const query = {
        text: `
        SELECT * FROM feedback
        ${conditionString.length ? 'WHERE' : ''} 
        ${conditionString.join(" AND ")}
        ORDER BY feedback_id DESC
        LIMIT ${limit ? limit : 10}
        OFFSET ${offset ? offset : 0};
        `,
    }
    rawDatabasePool.query(query, (err, result) => {
        const products = [];
        console.log(err)
        if (err) {
            res.status(400);
        } else {
            res.status(200);
            result.rows.forEach(row => {
                const date = new Date(row.created_at_date)
                row.created_at_date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
            });
            products.push(...result.rows)
        }

        res.send(products)
    })

})

app.get('/feedbacks/length', async (req: Request, res: Response) => {
    console.log('/feedbacks (GET)')
    const { product_id, user_id } = req.query;

    let productIdCondition = '';
    if (Array.isArray(product_id)) {
        productIdCondition = `product_id IN (${product_id.join(", ")})`
    } else {
        productIdCondition = `${product_id === undefined ? "" : `product_id = ${product_id}`}`
    }

    let userIdCondition = '';
    if (Array.isArray(user_id)) {
        userIdCondition = `user_id IN (${user_id.join(", ")})`
    } else {
        userIdCondition = `${user_id === undefined ? "" : `user_id = ${user_id}`}`
    }

    const conditionString = [productIdCondition, userIdCondition].filter(i => i !== '')
    const query = {
        text: `
        SELECT COUNT(*) FROM feedback
        ${conditionString.length ? 'WHERE' : ''} 
        ${conditionString.join(" AND ")}
        `,
    }
    rawDatabasePool.query(query, (err, result) => {
        const products = {};
        console.log(err)
        if (err) {
            res.status(400);
        } else {
            res.status(200);
            products["count"] = result.rows[0].count
        }

        res.send(products)
    })

})