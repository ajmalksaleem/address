import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "product",
      },
      quantity: {
        type: Number,
      },
    },
  ],
}, {timestamps: true});

const Cart = new model("cart", cartSchema);

export default Cart;
