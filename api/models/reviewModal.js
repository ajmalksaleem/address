import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    message: String,
    rating : Number,
  },
  {
    timestamps: true,
  }
);

const Review = new model("review", reviewSchema);

export default Review;
