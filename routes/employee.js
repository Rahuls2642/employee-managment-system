import express from "express";
import { createEmployee } from "../controller/employee.controller.js";
import { editEmployee } from "../controller/employee.controller.js";
import { listEmployee } from "../controller/employee.controller.js";
import { employeeDeatils } from "../controller/employee.controller.js";
import { deleteEmployee } from "../controller/employee.controller.js";
import verifyToken from "../middleware/auth.js";


const router=express.Router();


/**
 * @swagger
 * tags:
 *   name: Employee
 *   description: Employee APIs
 */

/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Create employee
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_name:
 *                 type: string
 *               employee_dob:
 *                 type: string
 *                 format: date
 *               father_name:
 *                 type: string
 *               joining_date:
 *                 type: string
 *                 format: date
 *               designation:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employee created successfully
 */
router.post("/",verifyToken,createEmployee)

//Edit employess
/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Update employee
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_name:
 *                 type: string
 *               employee_dob:
 *                 type: string
 *                 format: date
 *               father_name:
 *                 type: string
 *               joining_date:
 *                 type: string
 *                 format: date
 *               designation:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Employee updated successfully
 */
router.put('/:id',verifyToken,editEmployee)



/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Get all employees (filter active optional)
 *     tags: [Employee]
 *     parameters:
 *       - in: query
 *         name: active
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Filter active employees
 *     responses:
 *       200:
 *         description: List of employees
 */
router.get('/',verifyToken,listEmployee)


/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Get employee by ID
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee details
 *       401:
 *         description: Unauthorized
 */
router.get('/:id',verifyToken,employeeDeatils)

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Delete employee by ID
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted employee
 *       401:
 *         description: Unauthorized
 */

router.delete('/:id',verifyToken,deleteEmployee)

export default router;