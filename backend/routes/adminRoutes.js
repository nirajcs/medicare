import express from 'express'
import adminController from '../controllers/adminController.js'

const router = express.Router();

router.post('/auth',adminController.auth);
router.get('/getDashboardDetails',adminController.allDetails)
router.get('/userdata',adminController.getUsers);
router.put('/block-user/:id',adminController.blockUsers);
router.put('/approve/:id',adminController.approveDoctors);
router.put('/block-doctor/:id',adminController.blockDoctor);
router.get('/doctordata',adminController.getDoctors);
router.get('/booking-details',adminController.getBookings)
router.post('/logout',adminController.logoutAdmin);

export default router;