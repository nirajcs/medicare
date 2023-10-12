import express from 'express'
import { protect } from '../middleware/authMiddleware.js';
import userController from '../controllers/userController.js'
import bookingController from '../controllers/bookingController.js';
import chatController from '../controllers/chatController.js';

const router = express.Router();

router.get('/home',protect,userController.home)
router.post('/g-login',userController.googleLogin)
router.post('/auth',userController.authUser);
router.post('/oauth',userController.oauth)//Google Sign Up
router.post('/register',userController.registerUser);

//FORGET PASSWORD
router.post('/forget-email-verify',userController.forgotEmailCheck);
router.post('/forget-otp-verify',userController.forgotOtpVerify)
router.post('/reset-password',userController.resetPassword)

router.post('/otpverify',userController.otpVerify)
router.get('/user-profile/:id',userController.getUserDetails)
router.post('/update-user',userController.updateUser)
router.get('/get-doctors',userController.getDoctors)
router.get('/get-bookings/:id',userController.getBookings)
router.post('/payment',userController.payment)
router.post('/logout',userController.logoutUser)

router.post('/addbookings/:user/:doctor/:date',bookingController.bookSlot)

router.get('/getrooms/:user',chatController.getRooms)
router.post('/get-or-createroom/:user/:doctor',chatController.createRoom)
router.post('/sendchat/:chatid/:sender/:type',chatController.chatSend)
router.get('/get-room-messages/:roomid',chatController.getMessages)

export default router;