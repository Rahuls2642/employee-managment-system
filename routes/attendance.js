import express from 'express';
import db from "../db.js"
const router=express.Router()

//attendace summary
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