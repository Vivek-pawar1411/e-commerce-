const express=require("express");
const router=express.Router();
const {addtocart,getcart,mycart}=require("../Controller/cart_controller");
const authMiddleware=require("../Middleware/authmiddleware");


router.post("/add", authMiddleware, addtocart);
router.get("/cartall", getcart);
router.get("/mycart", authMiddleware, mycart);


module.exports=router;