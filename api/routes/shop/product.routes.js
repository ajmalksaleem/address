import { Router } from "express";
import { getProductDetais, getProducts } from "../../controllers/shop/productController.js";
import { searchProducts } from "../../controllers/shop/searchController.js";

const router = Router()

router.get('/get-products', getProducts)
router.get('/productdetails/:productId', getProductDetais)
router.get('/search/:keyword', searchProducts)

export default router;