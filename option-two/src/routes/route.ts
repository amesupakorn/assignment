import { Router } from "express";
import { getUserSummary } from "../controllers/index";

/**
 * @swagger
 * /users/summary:
 *   get:
 *     summary: Get user summary
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Summary data grouped by department
 */

const router = Router();

router.get("/summary", getUserSummary);

export default router;