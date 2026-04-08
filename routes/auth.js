import express from "express"
import { registerUser } from "../controller/auth.controller.js";
import { loginUser } from "../controller/auth.controller.js";
const router=express.Router()


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, mobile_no, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rahul Sharma
 *               mobile_no:
 *                 type: string
 *                 example: "9876543210"
 *               password:
 *                 type: string
 *                 example: rahul@123
 *     responses:
 *       200:
 *         description: User registered successfully
 */
router.post('/register',registerUser);


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login with mobile and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [mobile_no, password]
 *             properties:
 *               mobile_no:
 *                 type: string
 *                 example: "9876543210"
 *               password:
 *                 type: string
 *                 example: rahul@123
 *     responses:
 *       200:
 *         description: Login successful returns token
 */
router.post('/login',loginUser);

export default router;