import express from 'express'
import adminController from '../controllers/adminController.js'

const router = express.Router();

router.post('/auth',adminController.auth)
router.get('/userdata',adminController.getUsers)
router.post('/logout',adminController.logoutAdmin)

export default router;