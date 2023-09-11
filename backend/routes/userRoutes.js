import express from 'express'
import { protect } from '../middleware/authMiddleware.js';
import userController from '../controllers/userController.js'

const router = express.Router();

router.get('/home',protect,userController.home)
router.post('/g-login',userController.googleLogin)
router.post('/auth',userController.authUser);
router.post('/oauth',userController.oauth)//Google Sign Up
router.post('/register',userController.registerUser);
router.post('/otpverify',userController.otpVerify)
router.get('/get-doctors',userController.getDoctors)
router.post('/logout',userController.logoutUser)

export default router;