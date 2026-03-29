require("dotenv").config();
const express=require("express");
const app=express();
const connectdb=require("./Db/db_config");
const productRoute=require("./Route/product_route");
const cartRoute=require("./Route/cart_route");
const userRoute=require("./Route/user_route");

app.use(express.json());

app.use("/products", productRoute);
app.use("/cart", cartRoute);
app.use("/users", userRoute);

connectdb();


app.listen(process.env.PORT || 3000, () => {
  console.log(` Server running on port ${process.env.PORT || 3000}`);
});