import paypal from "../../utils/payPal.js";
import Order from "../../models/orderModel.js";
import { errorHandler } from "../../utils/error.js";
import Cart from "../../models/cartModel.js";
import User from "../../models/userModel.js";

export const createOrder = async (req, res, next) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
          description: "description",
        },
      ],
    };

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log(error);

        return res.status(500).json({
          success: false,
          message: "Error while creating paypal payment",
        });
      } else {
        const newlyCreatedOrder = new Order({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });

        await newlyCreatedOrder.save();

        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;

        res.status(201).json({
          success: true,
          approvalURL,
          orderId: newlyCreatedOrder._id,
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

export const capturePayment = async (req, res, next) => {
  try {
    const { payerId, paymentId, orderId } = req.body;
    let order = await Order.findById(orderId);
    if (!order) return next(errorHandler(400, "orderId is not found"));
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    (order.paymentId = paymentId), (order.payerId = payerId);
    await order.save();
    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);
    res.status(201).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrdersByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userOrders = await Order.find({ userId });
    if (!userOrders.length) return next(errorHandler(400, "no orders found"));
    res.status(200).json({
      success: true,
      data: userOrders,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderDetails = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const orderDetails = await Order.findById(orderId);
    if (orderDetails) return next(errorHandler(400, "no orders details found"));
    res.status(200).json({
      success: true,
      data: orderDetails,
    });
  } catch (error) {
    next(error);
  }
};

