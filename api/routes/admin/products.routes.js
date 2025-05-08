import { Router } from "express";
import { AddProduct, deleteProduct, editProduct, fetchAllProducts, handleImageUpload } from "../../controllers/admin/productController.js";
import {Upload} from '../../utils/cloudinary.js'
import { verifyAdminToken } from '../../utils/verifyToken.js'


const router = Router()

router.post('/upload-image', verifyAdminToken, Upload.single('my_file'), handleImageUpload)
router.post('/add-products', verifyAdminToken, AddProduct)
router.get('/get-products', verifyAdminToken, fetchAllProducts)
router.put('/edit-product/:productId', verifyAdminToken, editProduct)
router.delete('/delete-product/:productId', verifyAdminToken, deleteProduct)

export default router