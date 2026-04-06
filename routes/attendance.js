import express from 'express';
import db from "../db.js"
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
 *     responses:
 *       200:
 *         description: Attendance summary list
 */
router.get('/summary',async(req,res)=>{
    const result=await db.query(`
        SELECT 
        employee_id,
        SUM(CASE WHEN is_full_day THEN 1 ELSE 0.5 END) as total_days
    FROM attendance
    GROUP BY employee_id
        
        `);
        res.json(result.rows);

})

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
router.post('/',async(req,res)=>{
    const {attendance_date,employee_id,is_full_day}=req.body;
    const result=await db.query(
        `INSERT INTO attendance
        (attendance_date,employee_id,is_full_day)
        VALUES($1,$2,$3) RETURNING *`,
        [attendance_date, employee_id, is_full_day]
    )
    res.json(result.rows[0]);
})

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
router.get('/',async(req,res)=>{
    const {employee_id,date}=req.query;
    let query=`
    SELECT e.employee_name,a.attendance_date,a.is_full_day
    FROM attendance a
    JOIN employee e ON a.employee_id = e.employee_id
    WHERE 1=1
    `;
    const values=[]
    if (employee_id) {
    values.push(employee_id);
    query += ` AND a.employee_id = $${values.length}`;
  }
  if (date) {
    values.push(date);
    query += ` AND a.attendance_date = $${values.length}`;
  }
    const result = await db.query(query, values);
  res.json(result.rows);


})



export default router;