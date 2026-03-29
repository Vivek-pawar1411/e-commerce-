const Cart = require("../Model/cart_model");
const Product = require("../Model/product_model");
const User = require("../Model/user_model");
const addtocart = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const foundProduct = await Product.findOne({ name });
    if (!foundProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    let usercart = await Cart.findOne({ "user.userid": userId });


    const newItem = {
      productId: foundProduct._id,
      name: foundProduct.name,
      quantity,
    };

    if (!usercart) {
      usercart = await Cart.create({
        user: { userid: userId, name: user.name },
        Products: [newItem],
      });
    } else {
      usercart.Products.push(newItem);
      await usercart.save();
    }

   
    res.status(200).json({
      message: `Hi ${user.name}, product added successfully!`,
      addedProduct: newItem,
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



const getcart = async (req, res) => {
  try {
    const usercart = await Cart.find();

    res.status(200).json({ message: "Cart details", cart: usercart });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const mycart = async (req, res) => {
  try {
    const userId = req.user.id;
    const usercart = await Cart.findOne({ "user.userid": userId });
    res.status(200).json({
      message: `Hi ${usercart.user.name}, your cart details`,
      cart: usercart,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { addtocart, getcart, mycart };
