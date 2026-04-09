import db from "../db.js";

//Attendance summarey logic
export const attendaceSummary = async (req, res) => {
  const { employee_id, month } = req.query;
  
  let query = `
    SELECT e.employee_name, a.employee_id,
    SUM(CASE WHEN is_full_day THEN 1 ELSE 0.5 END) as total_days
    FROM attendance a
    JOIN employee e ON a.employee_id = e.employee_id
    WHERE 1=1
  `;

  const value = [];

  if (employee_id) {
    value.push(parseInt(employee_id));
    query += ` AND a.employee_id = $${value.length}`;
  }

  if (month) {
    value.push(parseInt(month));
    query += ` AND EXTRACT(MONTH FROM a.attendance_date) = $${value.length}`;
  }

  query += ` GROUP BY a.employee_id, e.employee_name`;

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
  const { employee_id, date } = req.query;
  let query = `
    SELECT e.employee_name,a.attendance_date,a.is_full_day
    FROM attendance a
    JOIN employee e ON a.employee_id = e.employee_id
    WHERE 1=1
    `;
  const values = [];
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
};
