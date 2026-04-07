import express from 'express';
import { attendaceSummary } from '../controller/attendance.controller.js';
import { attendace } from '../controller/attendance.controller.js';
import { attendaceList } from '../controller/attendance.controller.js';
const router=express.Router()
/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: Attendance APIs
 */

//attendace summary
/**
 * @swagger
 * /api/attendance/summary:
 *   get:
 *     summary: Get attendance summary per employee (full day = 1, half day = 0.5)
 *     tags: [Attendance]
 *     parameters:
 *       - in: query
 *         name: employee_id
 *         schema:
 *           type: integer
 *         required: false
 *         description: Filter by specific employee ID
 *     responses:
 *       200:
 *         description: Attendance summary list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   employee_name:
 *                     type: string
 *                   employee_id:
 *                     type: integer
 *                   total_days:
 *                     type: number
 *                     example: 2.5
 */
router.get('/summary',attendaceSummary)

// taking attendace
/**
 * @swagger
 * /api/attendance:
 *   post:
 *     summary: Mark attendance for an employee
 *     tags: [Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [attendance_date, employee_id]
 *             properties:
 *               attendance_date:
 *                 type: string
 *                 format: date
 *                 example: 2026-04-06
 *               employee_id:
 *                 type: integer
 *                 example: 1
 *               is_full_day:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Attendance marked successfully
 */
router.post('/',attendace)

//attendace list with filter feature
/**
 * @swagger
 * /api/attendance:
 *   get:
 *     summary: Get attendance list with optional filters
 *     tags: [Attendance]
 *     parameters:
 *       - in: query
 *         name: employee_id
 *         schema:
 *           type: integer
 *         required: false
 *         description: Filter by employee ID
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Filter by date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Attendance list with employee details
 */
router.get('/',attendaceList)



export default router;