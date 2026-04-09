# Company API — Employee & Attendance Management

A REST API built with Node.js, Express and PostgreSQL with Swagger documentation.



## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Swagger UI


## Project Structure


project/
├── app.js
├── swagger.js
├── db.js
├── package.json
├── .env.example
├── db/
│   └── schema.sql
├── routes/
│   ├── employee.js
│   └── attendance.js
└── controllers/
    ├── employeeController.js
    └── attendanceController.js


## Setup Instructions

### Step 1 — Install dependencies

npm install


### Step 2 — Create the database
Open pgAdmin or psql and run:
```sql
CREATE DATABASE company_db;
```

### Step 3 — Create the tables
Run the schema file present in schema.sql in pgadmin or psql


### Step 4 — Setup environment variables
Copy the example env file and fill in your details:

Then open `.env` and update your database password:

PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=company_db
DB_USER=postgres
DB_PASSWORD=your_password_here
SECRET_KEY=your secret key in string


### Step 5 — Start the server

npm run start


Server will start at `http://localhost:3000`



## Swagger Documentation

Once the server is running, open your browser and go to:

http://localhost:3000/api-docs


You can test all APIs directly from the Swagger UI.


## Developer

Rahul Singh
Software Development Intern
Knowforth Tech LLP
