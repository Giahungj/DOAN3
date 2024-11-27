import express from 'express';
import doctorAPIRoute from '../api/doctorAPI/doctorAPIRoute'
import specialAPIRoute from './specialAPI/specialAPIRoute.js'
import facilityAPIRoute from './facilityAPI/facilityAPIRoute.js'
import patientAPIRoute from '../api/patientAPI/patientAPIRoute'
import appointmentAPIRoute from './appointmentAPI/appointmentAPIRoute.js'
const router = express.Router();

// -----------------------------------------
router.use("/bac-si", doctorAPIRoute)

// -----------------------------------------
router.use("/chuyen-khoa", specialAPIRoute)

// -----------------------------------------
router.use("/benh-nhan", patientAPIRoute)

// -----------------------------------------
router.use("/co-so-y-te", facilityAPIRoute)

// -----------------------------------------
router.use("/lich-hen", appointmentAPIRoute)

export default router