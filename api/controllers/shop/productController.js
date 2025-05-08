import Product from "../../models/productModel.js"
import { errorHandler } from "../../utils/error.js";


// export const getProducts = async(req,res,next)=>{
//     try {
//         const {category = [], brand = [], sortBy = 'price-lowtohigh' } = req.query
//         let filters = {} 
//         if(category.length){
//             filters.category = {$in : category.split(',')}
//         }
//         if(brand.length){
//             filters.brand = {$in : category.split(',')}
//         }
//         let sort = {};
//         switch (sortBy) {
//             case "price-lowtohigh":
//               sort.price = 1;
      
//               break;
//             case "price-hightolow":
//               sort.price = -1;
      
//               break;
//             case "title-atoz":
//               sort.title = 1;
      
//               break;
      
//             case "title-ztoa":
//               sort.title = -1;
      
//               break;
      
//             default:
//               sort.price = 1;
//               break;
//           }
//         const findProducts = await Product.find(filters).sort(sort)
//         res.status(200).json({
//             success: true,
//             data : findProducts,
//           });
//     } catch (error) {
//         next(error)
//     }
// }

export const getProducts = async (req, res, next) => {
    try {
      const {sortBy = 'price-lowtohigh' } = req.query;
      const category = req.query.Category;
      const brand = req.query.Brand;
      // Build filters
      const filters = {};
      if (category) {
        filters.category = { $in: category.split(',') };
      }
      if (brand) {
        filters.brand = { $in: brand.split(',') }; 
      }
  
      // Build sort object
      const sortOptions = {
        'price-lowtohigh': { price: 1 },
        'price-hightolow': { price: -1 },
        'title-atoz': { title: 1 },
        'title-ztoa': { title: -1 },
      };
      const sort = sortOptions[sortBy] || { price: 1 }; // Default to low-to-high if sortBy is invalid
  
      // Fetch products
      const products = await Product.find(filters).sort(sort);
  
      // Send response
      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  };

  export const getProductDetais = async(req,res,next)=>{
    try {
      const {productId} = req?.params
      const product = await Product.findById(productId)
  if(!product) return next(errorHandler(404,'Product not found'))
  res.status(200).json({
    success : true,
    data :  product
  })
    } catch (error) {
      next(error)
    }
  }