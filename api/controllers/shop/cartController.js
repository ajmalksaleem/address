import { errorHandler } from "../../utils/error.js";
import Product from '../../models/productModel.js'
import Cart from "../../models/cartModel.js";

export const addtoCart = async (req, res, next) => {
    try {
      const { userId, productId, quantity } = req.body;
  
      if (!userId || !productId || quantity <= 0) 
        return next(errorHandler(400, 'user or product not found'));
      const product = await Product.findById(productId);
  
      if (!product) 
        return next(errorHandler(400, 'product not found'));

      if(product.totalStock < quantity) return next(errorHandler(400,'product out of stock'))
  
      let cart = await Cart.findOne({ userId });
  
      if (!cart) {
        cart = new Cart({
          userId,
          items: [{ productId, quantity }],
        });
      } else {
        const findCurrentProductIndex = cart.items.findIndex(
          (item) => item.productId.toString() === productId
        );
  
        if (findCurrentProductIndex === -1) {
          cart.items.push({ productId, quantity });
        } else {
          cart.items[findCurrentProductIndex].quantity += quantity;
        }
      }
      await cart.save();
      product.totalStock = product.totalStock - quantity;
      await product.save()
      res.status(200).json({
        success: true,
        data: cart._doc,
      });
    } catch (error) {
      next(error);
    }
  };

  export const fetchCart = async (req, res, next) => {
    try {
      const { userId } = req.params;
      if (!userId) {
        return next(errorHandler(400, 'No user found'))
      }
  
      const cart = await Cart.findOne({ userId }).populate({
        path: "items.productId",
        select: "image title price salePrice",
      });
        
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Cart not found!",
        });
      }

      const validItems = cart.items.filter(
        (productItem) => productItem.productId
      );
  
      if (validItems.length < cart.items.length) {
        cart.items = validItems;
        await cart.save();
      }
  
      res.status(200).json({
        success: true,
        data: cart
      });
    } catch (error) {
     next(error)
    }
  };

export const updateCart = async(req,res,next)=>{
    try {
      const { userId, productId, quantity } = req.body;
  
      if (!userId || !productId || quantity < 0 ) 
        return next(errorHandler(400, 'user or product not found'));
  
      const product = await Product.findById(productId);
  
      if (!product) 
        return next(errorHandler(400, 'product not found'));

      let cart = await Cart.findOne({ userId }).populate({
        path: "items.productId",
        select: "image title price salePrice",
      });
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Cart not found!",
        });
      }
      const currentProductIndex = cart.items.findIndex((item)=>item.productId._id.toString() === productId)
      if(currentProductIndex === -1 ){
        return next(errorHandler(400, 'cart item not present'))     
      }
      const oldQuantity = cart.items[currentProductIndex].quantity;
      const difference = Math.abs(quantity - oldQuantity);
      
      if (difference !== 1) {
        return next(errorHandler(400, 'quantity can only be incremented or decremented by 1'));
      }
      
      if (quantity > oldQuantity) {
        // User is adding 1 → ensure we have at least one in stock
        if (product.totalStock < 1) {
          return next(errorHandler(400, 'product out of stock'));
        }
        product.totalStock -= 1;
      } else {
        // User is removing 1 → return it to stock
        product.totalStock += 1;
      }
      
      await product.save();
      

      if (quantity === 0) {
        // Remove the item if quantity is 0
        cart.items.splice(currentProductIndex, 1);
      } else {
        // Update the quantity if it's greater than 0
        cart.items[currentProductIndex].quantity = quantity;
      }
      await cart.save()


      res.status(200).json({
        success: true,
        data: cart._doc,
      });
    } catch (error) {
        next(error)
    }
}

export const deleteCart = async (req, res, next) => {
  try {
    const { userId, productId } = req.params;
    if (!userId || !productId) return next(errorHandler(400, 'User or product ID missing'));

    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) return next(errorHandler(400, 'Cart not found'));

    // Find the product in the cart
    const currentProductIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
    if (currentProductIndex === -1) {
      return next(errorHandler(400, 'Cart item not present'));
    }

    // Get the quantity of the product in the cart before removing it
    const removedProductQuantity = cart.items[currentProductIndex].quantity;

    // Remove the product from the cart
    cart.items.splice(currentProductIndex, 1);
    await cart.save();

    // Find the product in the product collection
    const product = await Product.findById(productId);
    if (!product) return next(errorHandler(400, 'Product not found'));

    // Return the product stock back to inventory
    product.totalStock += removedProductQuantity;
    await product.save();

    res.status(200).json({
      success: true,
      message: 'Product removed from cart and stock updated',
    });
  } catch (error) {
    next(error);
  }
};
