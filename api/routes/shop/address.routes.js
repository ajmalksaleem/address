import {Router} from 'express'
import { addAddress, deleteAddress, editAddress, fetchUserAddress } from '../../controllers/shop/addressController.js'
import { verifyToken } from '../../utils/verifyToken.js'

const router = Router()

router.post('/add-address', verifyToken, addAddress)
router.get('/fetch-address/:userId', verifyToken, fetchUserAddress)
router.put('/edit-address/:userId/:addressId', verifyToken, editAddress)
router.delete('/delete-address/:userId/:addressId', verifyToken, deleteAddress)

export default router

