import express from 'express';
import path from 'path'
import multer from 'multer';
import doctorController from '../controllers/doctorControllers.js';
import bookingController from '../controllers/bookingController.js';

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
router.post('/managetime',doctorController.manageTime)
router.get('/delete-timing/:docId/:id',doctorController.deleteTimings) 
router.get('/get-timings/:id',doctorController.getTimings)
router.post('/logout',doctorController.logoutDoctor)

export default router 