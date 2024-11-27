import express from 'express'

// -----------------------------------------
import adminController from '../../controllers/admin/adminController.js'
import appointmentController from '../../controllers/appointment/appointmentController.js'

// -----------------------------------------
import doctorRoute from '../doctor/doctorRoute.js'
import specialRoute from '../special/specialRoutes.js'
import facilityRoute from '../facility/facilityRoute.js'
import appointmentRoute from '../appointment/appointmentRoute.js'
import patientRoute from '../patient/patientRoute.js'

// -----------------------------------------
const router = express.Router()

// -----------------------------------------
router.get("/", adminController.getAdminPage)

// -----------------------------------------
router.use("/bac-si", doctorRoute)

// -----------------------------------------
router.use("/benh-nhan", patientRoute)

// -----------------------------------------
router.use("/chuyen-khoa", specialRoute)

// -----------------------------------------
router.use("/lich-hen", appointmentRoute)

// -----------------------------------------
router.use("/co-so-y-te", facilityRoute)

export default router