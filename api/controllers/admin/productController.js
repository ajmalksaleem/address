import Product from "../../models/productModel.js";
import { imageUploadUtil } from "../../utils/cloudinary.js";
import { errorHandler } from "../../utils/error.js";

export const handleImageUpload = async (req, res, next) => {
  try {
    if (!req.file || !req.file.buffer) {
      throw new Error("Invalid image upload");
    }
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = `data:${req.file.mimetype};base64,${b64}`;
    const result = await imageUploadUtil(url);
    res.json({ success: true, result });
  } catch (error) {
    next(error);
  }
};

export const AddProduct = async (req, res, next) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;
    const newProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });
    await newProduct.save();
    res.status(201).json({
      success: true,
      newProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const fetchAllProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json({
      success: true,
      allProducts,
    });
  } catch (error) {
    next(error);
  }
};

// export const editProduct = async(req,res,next)=>{
//  try {
//   const {productId} = req.params
//   const {image,title,desceiption, category, brand, price, salePrice, totalStock} = req.body;
//   const updateProduct = Product.findByIdAndUpdate(productId,{
//     $set: {
//       image,title,desceiption, category, brand, price, salePrice, totalStock
//     }
//   },{new:true})
//   res.status(200).json({
//     success :true,
//     updateProduct
//   })
//  } catch (error) {
//   next(error)
//  }
// }

export const editProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId.toString();
    const updateProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $set: {
          image: req.body?.image,
          title: req.body?.title,
          description: req.body?.description,
          category: req.body?.category,
          brand: req.body?.brand,
          price: req.body?.price,
          salePrice: req.body?.salePrice,
          totalStock: req.body?.totalStock,
        },
      },
      { new: true }
    );
    if (!updateProduct) {
      next(errorHandler(404, "Product not found"));
    }
    res.status(200).json({
      success: true,
      updateProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deleteProduct) {
      next(errorHandler(404, "Product not found"));
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
