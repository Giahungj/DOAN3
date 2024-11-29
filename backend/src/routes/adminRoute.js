import express from 'express'

// -----------------------------------------
import adminController from '../controllers/adminController.js'
import appointmentController from '../controllers/appointmentController.js'

// -----------------------------------------
import doctorRoute from './doctorRoute.js'
import accountRoute from './accountRoute.js'
import specialRoute from './specialRoutes.js'
import facilityRoute from './facilityRoute.js'
import appointmentRoute from './appointmentRoute.js'
import patientRoute from './patientRoute.js'

// -----------------------------------------
const router = express.Router()

// -----------------------------------------
router.get("/", adminController.getAdminPage)

// -----------------------------------------
router.use("/bac-si", doctorRoute)

// -----------------------------------------
router.use("/benh-nhan", patientRoute)

// -----------------------------------------
router.use("/tai-khoan", accountRoute)

// -----------------------------------------
router.use("/chuyen-khoa", specialRoute)

// -----------------------------------------
router.use("/lich-hen", appointmentRoute)

// -----------------------------------------
router.use("/co-so-y-te", facilityRoute)

export default router