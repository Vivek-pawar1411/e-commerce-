const user=require('../Model/user_model');
const jwt=require('jsonwebtoken');


const register=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const newUser=new user({name,email,password});
        await newUser.save();
        res.status(201).json({message:`${newUser.name} is signed up successfully`});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
};


const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const existingUser=await user.findOne({email});
        if(!existingUser){
            return res.status(404).json({message:"User not found"});
        }
        if(existingUser.password!==password){
            return res.status(401).json({message:"Invalid credentials"});
        }
        const token=jwt.sign({id:existingUser._id},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.status(200).json({message: `User Login Successfully with name: ${existingUser.name}`,token});
    } catch (error) {
        res.status(400).json({message:error.message});
    }       
};  


module.exports={register,login};