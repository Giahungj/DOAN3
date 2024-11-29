import express from 'express';
import doctorAPIRoute from './doctorAPIRoute.js'
import specialAPIRoute from './specialAPIRoute.js'
import facilityAPIRoute from './facilityAPIRoute.js'
import patientAPIRoute from './patientAPIRoute'
import accountAPIRoute from './accountAPIRoute.js'
import appointmentAPIRoute from './appointmentAPIRoute.js'
const router = express.Router();

// -----------------------------------------
router.use("/bac-si", doctorAPIRoute)

// -----------------------------------------
router.use("/chuyen-khoa", specialAPIRoute)

// -----------------------------------------
router.use("/benh-nhan", patientAPIRoute)

// -----------------------------------------
router.use("/tai-khoan", accountAPIRoute)

// -----------------------------------------
router.use("/co-so-y-te", facilityAPIRoute)

// -----------------------------------------
router.use("/lich-hen", appointmentAPIRoute)

export default router