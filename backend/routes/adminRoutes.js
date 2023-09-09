import express from 'express'
import adminController from '../controllers/adminController.js'

const router = express.Router();

router.post('/auth',adminController.auth);
router.get('/userdata',adminController.getUsers);
router.put('/block-user/:id',adminController.blockUsers);
router.put('/approve/:id',adminController.approveDoctors);
router.get('/doctordata',adminController.getDoctors);
router.post('/logout',adminController.logoutAdmin);

export default router;