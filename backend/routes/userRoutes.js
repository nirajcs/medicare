import express from 'express'
import { protect } from '../middleware/authMiddleware.js';
import userController from '../controllers/userController.js'
import bookingController from '../controllers/bookingController.js';

const router = express.Router();

router.get('/home',protect,userController.home)
router.post('/g-login',userController.googleLogin)
router.post('/auth',userController.authUser);
router.post('/oauth',userController.oauth)//Google Sign Up
router.post('/register',userController.registerUser);
router.post('/otpverify',userController.otpVerify)
router.get('/user-profile/:id',userController.getUserDetails)
router.post('/update-user',userController.updateUser)
router.get('/get-doctors',userController.getDoctors)
router.post('/payment',userController.payment)
router.post('/logout',userController.logoutUser)

router.post('/addbookings/:user/:doctor/:date',bookingController.bookSlot)

export default router;