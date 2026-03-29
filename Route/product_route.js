const express=require("express");
const router=express.Router();
const {addproduct,getproducts}=require("../Controller/product_controller");


router.post("/add",addproduct);
router.get("/list",getproducts);

module.exports = router;