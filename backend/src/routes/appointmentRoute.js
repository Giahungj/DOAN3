import express from 'express'
import appointmentController from '../controllers/appointmentController'

const router = express.Router()

// -----------------------------------------
router.get("/", appointmentController.getAppointmentsPage)

// -----------------------------------------
router.get("/thong-tin/:appointment_id", appointmentController.getAppointmentInfoPage)

// -----------------------------------------
router.post("/cap-nhat", appointmentController.updateAppointment)

// -----------------------------------------
router.get("/xoa", appointmentController.updateAppointment)

export default router