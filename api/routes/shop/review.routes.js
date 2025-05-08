import {Router} from 'express'
import { addReview, getReviews } from '../../controllers/shop/reviewController.js'
import { verifyToken } from '../../utils/verifyToken.js'

const router = Router()

router.get('/get/:productId', getReviews)
router.post('/add-review', verifyToken, addReview)

export default router