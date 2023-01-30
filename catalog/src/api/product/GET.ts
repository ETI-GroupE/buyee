import express from 'express';
import { Response, Request } from "express";
import { rawDatabasePool } from "../../db";
import { Product } from "../../types/Product";
import { Category } from "../../types/Category";


const app = express();
export default app;

app.get('/products', async (req: Request, res: Response) => {
    console.log('/products (GET)')
    const { product_category, product_id, owner_id, product_name } = req.query;

    let productCategoryCondition = '';
    if (Array.isArray(product_category)) {
        productCategoryCondition = `product_category IN (${product_category.join(", ")})`
    } else {
        productCategoryCondition = `${product_category === undefined ? "" : `product_category = ${product_category}`}`
    }

    let productIdCondition = '';
    if (Array.isArray(product_id)) {
        productIdCondition = `product_id IN (${product_id.join(", ")})`
    } else {
        productIdCondition = `${product_id === undefined ? "" : `product_id = ${product_id}`}`
    }

    let ownerIdCondition = '';
    if (Array.isArray(owner_id)) {
        ownerIdCondition = `owner_id IN (${owner_id.join(", ")})`
    } else {
        ownerIdCondition
            = `${owner_id === undefined ? "" : `owner_id = ${owner_id}`}`
    }

    let productNameCondition = '';
    if (Array.isArray(product_name)) {
        product_name.forEach((pn, index) => {
            product_name[index] = `'${pn}'`
        });
        productNameCondition = `product_name IN (${product_name.join(", ")})`
    } else {
        productNameCondition
            = `${product_name === undefined ? "" : `product_name = '${product_name}'`}`
    }

    const conditionString = [productCategoryCondition, productIdCondition, ownerIdCondition, productNameCondition].filter(i => i !== '')
    const query = {
        text: `SELECT * FROM product 
        ${conditionString.length ? 'WHERE' : ''} 
        ${conditionString.join(" AND ")}
        `,
    }
    console.log(query.text)
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
