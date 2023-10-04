import express from 'express';
import path from 'path'
import multer from 'multer';
import doctorController from '../controllers/doctorControllers.js';
import bookingController from '../controllers/bookingController.js';
import chatController from '../controllers/chatController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'file') {
      cb(null, 'backend/public/images/doctors');
    } else if (file.fieldname === 'resume') {
      cb(null, 'backend/public/resumes');
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
  
router.post('/register',upload.fields([{ name: 'file' }, { name: 'resume' }]),doctorController.register)
router.post('/updatedoctor',upload.fields([{ name: 'file' }, { name: 'resume' }]),doctorController.updateDoctor)
router.post('/auth',doctorController.authDoctor)
router.get('/getdoctor/:id',doctorController.getDoctor)
router.get('/booking-details/:id',doctorController.bookingDetails)
router.post('/managetime',doctorController.manageTime)
router.get('/delete-timing/:docId/:id',doctorController.deleteTimings) 
router.get('/get-timings/:id',doctorController.getTimings)
router.post('/logout',doctorController.logoutDoctor)

router.get('/get-doctor-rooms/:doctor',chatController.getDoctorsRooms)
router.post('/sendchat/:chatid/:sender/:type',chatController.chatSend)
router.get('/get-room-messages/:roomid',chatController.getMessages)

export default router 