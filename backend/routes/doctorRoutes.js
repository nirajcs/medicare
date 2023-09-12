import express from 'express';
import path from 'path'
import multer from 'multer';
import doctorController from '../controllers/doctorControllers.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
      cb(null, 'backend/public/images/doctors')
    },
    filename:(req,file,cb) => {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
  })
  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed!"), false); 
    }
  };
  
  const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter, 
  });
  

router.post('/register',upload.single('file'),doctorController.register)
router.post('/auth',doctorController.authDoctor)
router.post('/managetime',doctorController.manageTime)
router.get('/delete-timing/:docId/:id',doctorController.deleteTimings) 
router.get('/get-timings/:id',doctorController.getTimings)
router.post('/logout',doctorController.logoutDoctor)

export default router 