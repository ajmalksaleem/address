import {Router} from 'express'
import { getAllOrders, updateOrderStatus } from '../../controllers/admin/orderController.js'
import { verifyAdminToken } from '../../utils/verifyToken.js'

const router = Router()

router.get('/all-orders', verifyAdminToken, getAllOrders)
router.put('/update-order/:orderId', verifyAdminToken, updateOrderStatus)

export default router