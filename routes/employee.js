import express from "express";

import db from "../db.js";
const router=express.Router();

//Crrate employee
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
router.post("/",async(req,res)=>{
const {employee_name,employee_dob,father_name,joining_date,designation}=req.body
const result=await db.query(
    `INSERT INTO employee
    (employee_name, employee_dob, father_name, joining_date, designation)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
     [employee_name, employee_dob, father_name, joining_date, designation]
)
res.json(result.rows[0])
})

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
router.put('/:id',async(req,res)=>{
    const { id } = req.params;
    const { employee_name, employee_dob, father_name, joining_date, designation, is_active } = req.body;

     const result = await db.query(
    `UPDATE employee 
     SET employee_name=$1, employee_dob=$2, father_name=$3, 
         joining_date=$4, designation=$5, is_active=$6, updated_date=NOW()
     WHERE employee_id=$7 RETURNING *`,
    [employee_name, employee_dob, father_name, joining_date, designation, is_active, id]
);

  res.json(result.rows[0]);
})


//List employees
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
router.get('/', async (req, res) => {
    const { active } = req.query;
    let query = `SELECT * FROM employee`;
    if (active === 'true') {
        query += ' WHERE is_active = true';
    }
    if(active === 'false'){
        query += ' WHERE is_active = false'
    }
    const result = await db.query(query);
    res.json(result.rows);
})

//employee detail by id
/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Get employee by ID
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee details
 */
router.get('/:id',async(req,res)=>{
   const result=await db.query(
    `SELECT * FROM employee WHERE employee_id=$1`,
    [req.params.id]

   ) ;
   res.json(result.rows[0])
})

export default router;