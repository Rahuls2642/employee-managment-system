import db from "../db.js";

//Attendance summarey logic
export const attendaceSummary = async (req, res) => {
  const { employee_id,month } = req.query;
  let query = ` SELECT e.employee_name,a.employee_id,
SUM(CASE WHEN is_full_day THEN 1 ELSE 0.5 END) as total_days
FROM attendance a
JOIN employee e ON a.employee_id=e.employee_id
GROUP BY a.employee_id, e.employee_name`;

  const value = [];
  if (employee_id) {
    value.push(employee_id);
    query += ` HAVING a.employee_id = $${value.length}`;
  }
  if (month) {
    value.push(parseInt(month));
    query += ` AND EXTRACT(MONTH FROM a.attendance_date) = $${value.length}`;
  }

  const result = await db.query(query, value);

  res.json(result.rows);
};

export const attendace = async (req, res) => {
  const { attendance_date, employee_id, is_full_day } = req.body;
  const result = await db.query(
    `INSERT INTO attendance
        (attendance_date,employee_id,is_full_day)
        VALUES($1,$2,$3) RETURNING *`,
    [attendance_date, employee_id, is_full_day],
  );
  res.json(result.rows[0]);
};

export const attendaceList = async (req, res) => {
  try {
    const { employee_id, date, page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    let query = `
      SELECT e.employee_name, a.attendance_date, a.is_full_day
      FROM attendance a
      JOIN employee e ON a.employee_id = e.employee_id
      WHERE 1=1
    `;

    const values = [];

    //Filters
    if (employee_id) {
      values.push(employee_id);
      query += ` AND a.employee_id = $${values.length}`;
    }

    if (date) {
      values.push(date);
      query += ` AND a.attendance_date = $${values.length}`;
    }

    //Pagination
    values.push(limitNum);
    query += ` ORDER BY a.attendance_date DESC LIMIT $${values.length}`;

    values.push(offset);
    query += ` OFFSET $${values.length}`;

    const result = await db.query(query, values);

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDashboard=async(req,res)=>{
  try {
const result=await db.query(
  ` SELECT 
        (SELECT COUNT(*) FROM employee) AS total_employees,
        (SELECT COUNT(DISTINCT attendance_date) FROM attendance) AS total_days,
        (SELECT 
          CASE 
            WHEN COUNT(DISTINCT attendance_date) = 0 THEN 0
            ELSE ROUND(COUNT(*)::numeric / COUNT(DISTINCT attendance_date), 2)
          END
         FROM attendance) AS avg_attendance_per_day`
);
res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
}

export const getReport = async (req, res) => {
  try {
    const { start_date, end_date, page = 1, limit = 5 } = req.query;
    
  
    if (!start_date || !end_date) {
      return res.status(400).json({ 
        error: "start_date and end_date are required",
        example: "?start_date=2026-04-01&end_date=2026-04-30"
      });
    }

    const offset = (page - 1) * limit;
    
    const result = await db.query(
      `SELECT attendance_date,
       SUM(CASE WHEN is_full_day THEN 1 ELSE 0.5 END) AS total_present
       FROM attendance
       WHERE attendance_date BETWEEN $1 AND $2
       GROUP BY attendance_date
       ORDER BY attendance_date
       LIMIT $3 OFFSET $4`,
      [start_date, end_date, limit, offset]
    );
    
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}