
CREATE TABLE IF NOT EXISTS employee (
    employee_id SERIAL PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    employee_dob DATE,
    father_name VARCHAR(100),
    joining_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    designation VARCHAR(50),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS attendance (
    attendance_id SERIAL PRIMARY KEY,
    attendance_date DATE NOT NULL,
    employee_id INT REFERENCES employee(employee_id) ON DELETE CASCADE,
    is_full_day BOOLEAN
);