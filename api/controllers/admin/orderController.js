import Order from "../../models/orderModel.js";
import { errorHandler } from "../../utils/error.js";

export const getAllOrders = async (req, res, next) => {
  try {
    const userOrders = await Order.find().populate({
      path : 'userId',
      select : 'username email'
    });
    if (!userOrders.length) return next(errorHandler(400, "no orders found"));
    res.status(200).json({
      success: true,
      data: userOrders,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async(req,res,next)=>{
  try {
    const {orderStatus} = req.body
    const {orderId} = req.params
    const order = await Order.findOneAndUpdate({_id : orderId}, {orderStatus})
    if(!order) return next(errorHandler(400, 'order not found'))
      res.status(200).json({
        success : true,
        message : 'order updated successfully'
    })
  } catch (error) {
    next(error)
  }
};