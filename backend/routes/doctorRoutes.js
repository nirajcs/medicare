import express from 'express';
import path from 'path'
import multer from 'multer';
import doctorController from '../controllers/doctorControllers.js';

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
router.post('/auth',doctorController.authDoctor)
router.post('/managetime',doctorController.manageTime)
router.get('/delete-timing/:docId/:id',doctorController.deleteTimings) 
router.get('/get-timings/:id',doctorController.getTimings)
router.post('/logout',doctorController.logoutDoctor)

export default router 