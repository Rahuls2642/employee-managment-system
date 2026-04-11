import db from "../db.js"
export const createEmployee=async(req,res)=>{
    const {employee_name,employee_dob,father_name,joining_date,designation}=req.body
const result=await db.query(
    `INSERT INTO employee
    (employee_name, employee_dob, father_name, joining_date, designation)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
     [employee_name, employee_dob, father_name, joining_date, designation]
)
res.json(result.rows[0])
}

export const editEmployee=async(req,res)=>{
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
}
export const deleteEmployee=async(req,res)=>{
  try {
    await db.query(
      'DELETE FROM employee WHERE employee_id = $1',
      [req.params.id]
    );

    res.json({ message: "Employee deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const listEmployee = async (req, res) => {
  try {
    const { active, page = 1, limit = 3 } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    let query = `SELECT * FROM employee`;
    let conditions = [];
    let values = [];

    if (active === 'true') {
      conditions.push(`is_active = true`);
    } else if (active === 'false') {
      conditions.push(`is_active = false`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(' AND ');
    }

    query += ` ORDER BY employee_id LIMIT $1 OFFSET $2`;
    values.push(limitNum, offset);

    const result = await db.query(query, values);

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const employeeDeatils=async(req,res)=>{
      const result=await db.query(
    `SELECT * FROM employee WHERE employee_id=$1`,
    [req.params.id]

   ) ;
   res.json(result.rows[0])
}