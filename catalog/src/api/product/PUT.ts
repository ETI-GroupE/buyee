// import express from 'express';
// import { Response, Request } from "express";
// import { upsert } from "./POST";

// const app = express();
// export default app;

// /**
//  * @openapi
//  * /upsertLecturerModuleAllocation:
//  *   put:
//  *     tags:
//  *       - LecturerModuleAllocation
//  *     description: Upsert lecturer module allocation
//  *     requestBody:
//  *       description: The lecturer_module_allocation to edit.
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - lecturer_id
//  *               - module_id
//  *               - semester
//  *               - is_module_leader
//  *               - no_class
//  *             properties:
//  *               lecturer_id:
//  *                 example: 1
//  *                 type: integer
//  *               module_id:
//  *                 example: 1
//  *                 type: integer
//  *               semester:
//  *                 example: 2022-2
//  *                 type: string
//  *               is_module_leader:
//  *                 example: false
//  *                 type: boolean
//  *               no_class:
//  *                 example: 1
//  *                 type: integer
//  *     responses:
//  *       200:
//  *         description: Result is returned.
//  *       400:
//  *         description: Error occured.
// */
// app.put('/upsertLecturerModuleAllocation', async (req: Request, res: Response) => {
//     console.log('/upsertLecturerModuleAllocation (PUT)')
//     upsert(req, res)
// })