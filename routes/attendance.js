import express from 'express';
import { attendaceSummary, getReport } from '../controller/attendance.controller.js';
import { attendace } from '../controller/attendance.controller.js';
import { attendaceList } from '../controller/attendance.controller.js';
import { getDashboard } from '../controller/attendance.controller.js';
import verifyToken from '../middleware/auth.js';
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
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *           example: 4
 *         required: false
 *         description: Filter by month (1-12)
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
router.get('/summary',verifyToken,attendaceSummary)

/**
 * @swagger
 * /api/attendance/dashboard:
 *   get:
 *     summary: Get dashboard data
 *     tags: [Attendance]
 *     responses:
 *       200:
 *         description: Dashboard summary
 */


router.get('/dashboard',verifyToken, getDashboard);

/**
 * @swagger
 * /api/attendance/report:
 *   get:
 *     summary: Get attendance report with date range
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         example: 2026-04-01
 *         description: Start date (YYYY-MM-DD)
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         example: 2026-04-30
 *         description: End date (YYYY-MM-DD)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Records per page
 *     responses:
 *       200:
 *         description: Report data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   attendance_date:
 *                     type: string
 *                     format: date
 *                   total_present:
 *                     type: number
 *       400:
 *         description: Missing required parameters
 *       401:
 *         description: Unauthorized
 */
router.get('/report', verifyToken, getReport)
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
router.post('/',verifyToken,attendace)

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
router.get('/',verifyToken,attendaceList)


export default router;