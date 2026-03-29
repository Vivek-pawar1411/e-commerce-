const product=require("../Model/product_model");


const addproduct=async(req,res)=>{
    try {
        const {name,price,quantity}=req.body;
        const newProduct=new product({name,price,quantity});
        await newProduct.save();
        res.status(201).json({message:"Product added successfully",productDetails: newProduct});
    } catch (error) {
        res.status(400).json({message:error.message});
    }   
};

const getproducts=async(req,res)=>{
    try {
        const products=await product.find();        
        res.status(200).json({message:"Product list ",products});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
};

module.exports={addproduct,getproducts};
