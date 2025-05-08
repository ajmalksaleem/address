import {Router} from 'express'
import AuthRoutes from './auth.js'
import AdminProduct from './admin/products.routes.js'
import ShopProducts from './shop/product.routes.js'
import CartRoutes from './shop/cart.routes.js'
import AddressRoutes from './shop/address.routes.js'
import OrderRoutes from './shop/order.routes.js'
import AdminOrder from './admin/order.routes.js'
import ReviewRoutes from './shop/review.routes.js'

const router = Router()

router.use('/auth', AuthRoutes)

router.use('/admin/products', AdminProduct)
router.use('/admin/order', AdminOrder)

router.use('/shop/products', ShopProducts)
router.use('/shop/cart', CartRoutes)
router.use('/shop/address', AddressRoutes)
router.use('/shop/order', OrderRoutes)
router.use('/shop/review', ReviewRoutes)

export default router