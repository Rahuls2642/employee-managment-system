import db from "../db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const SECRET_KEY=process.env.SECRET_KEY;
//Register user
export const registerUser=async(req,res)=>{
    if (!SECRET_KEY) {
    console.error("ERROR: SECRET_KEY not set in .env file");
}

   try {
    const{name,mobile_no,password}=req.body;
    //check if user already exist
  
    const existing=await db.query(
        ` SELECT * FROM users WHERE mobile_no=$1`,
        [mobile_no]
    );
    if(existing.rows.length>0){
        return res.status(400).json({error:"Mobile no already registeres use diffrent mobile number"})
    }
    //hash password
    const hashedPassword=await bcrypt.hash(password,10)

    const result=await db.query(
        ` INSERT INTO users (name, mobile_no, password)
        VALUES($1, $2, $3) RETURNING user_id, name, mobile_no`,
        [name, mobile_no, hashedPassword]
    );
    res.json({message:"Registered succesfully", user:result.rows[0]})
    
   } catch (error) {
    res.status(500).json({ error: error.message });
    
   } 
}

//Login user
export const loginUser=async(req,res)=>{
    try {
        const {mobile_no,password}=req.body;
        //check if mobile no exist
        const result=await db.query(
            ` SELECT * FROM users WHERE mobile_no=$1`,
            [mobile_no]
        )
        if(result.rows.length===0){
            return res.status(400).json({error:"Invalid details"});
        }
        const user=result.rows[0];

    //check password
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({error:"Invalid details"});
    }

    //token 

    const token=jwt.sign(
        {user_id:user.user_id, name:user.name},
        SECRET_KEY,
        {expiresIn:'1d'}
    );
    res.json({message:"Login succesfull",token});


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
