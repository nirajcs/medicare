import express from 'express'
import { protect } from '../middleware/authMiddleware.js';
import userController from '../controllers/userController.js'

const router = express.Router();

router.get('/home',protect,userController.home)
router.post('/auth',userController.authUser);
router.post('/register',userController.registerUser);
router.post('/otpverify',userController.otpVerify)
router.post('/logout',userController.logoutUser)

export default router;