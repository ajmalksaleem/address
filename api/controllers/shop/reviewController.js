import Order from "../../models/orderModel.js";
import Review from "../../models/reviewModal.js";
import { errorHandler } from "../../utils/error.js";
import Product from "../../models/productModel.js";

export const addReview = async (req, res, next) => {
  try {
    const { message, rating, userId, productId } = req.body;
    const findOrder = await Order.findOne({
      userId,
      "cartItems.productId": productId,
    });
    if (!findOrder)
      return next(
        errorHandler(400, "Review allowed only for purchased products")
      );
    const checkExistingReview = await Review.findOne({
      productId,
      userId,
    });
    if (checkExistingReview)
      return next(errorHandler(400, "You already reviewed this product"));
    const review = new Review({
      userId,
      productId,
      message,
      rating,
    });
    await review.save();
    const totalReviews = await Review.find({ productId });
    const totalReviewsLength = totalReviews.length;
    const averageRating =
      totalReviews.reduce((sum, reviewItem) => sum + reviewItem.rating, 0) /
      totalReviewsLength;
    await Product.findByIdAndUpdate(productId, { averageRating });
    res.status(201).json({
      success: true,
      message: "Product reviewed succesfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId }).populate({
        path : 'userId',
        select : "username"
    });
    if (!reviews.length) return next(errorHandler(400, "No reviews found"));
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};
