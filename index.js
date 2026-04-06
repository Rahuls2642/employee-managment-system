import express from "express";
import cors from "cors";
import employeeRoutes from "./routes/employee.js"
import attendanceRoutes from "./routes/attendance.js"
import swaggerUi from "swagger-ui-express"
import swaggerSpec from "./swagger.js";

const app=express();
const port=3000;
app.use(cors());
app.use(express.json());

//API
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
}
)