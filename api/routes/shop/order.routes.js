import {Router} from 'express'
import { capturePayment, createOrder, getOrdersByUser, getOrderDetails} from '../../controllers/shop/order-controller.js'
import { verifyToken } from '../../utils/verifyToken.js'

const router = Router()

router.post('/create-order', verifyToken, createOrder )
router.post('/capture-payment', capturePayment )
router.get('/userorders/:userId', verifyToken, getOrdersByUser)
router.get('/order-details/:orderId', verifyToken, getOrderDetails)

export default router