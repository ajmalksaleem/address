import {Router} from 'express'
import { addtoCart, deleteCart, fetchCart, updateCart } from '../../controllers/shop/cartController.js'
import { verifyToken } from '../../utils/verifyToken.js'

const router = Router()

router.post('/addtocart', verifyToken, addtoCart)
router.get('/getcart/:userId', verifyToken, fetchCart)
router.put('/updatecart' , verifyToken, updateCart)
router.delete('/deletecart/:userId/:productId', verifyToken, deleteCart)

export default router