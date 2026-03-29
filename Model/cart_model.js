const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    userid: {  type: mongoose.Schema.Types.ObjectId,  ref: "User",  required: true,},
    name: { type: String, required: true, },
  },

  Products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,  ref: "Product",  required: true,   },
      name: { type: String },
      quantity: { type: Number, required: true,  },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
