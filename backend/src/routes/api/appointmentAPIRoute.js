import express from 'express';
import appointmentController from '../../controllers/appointmentController';

const router = express.Router();

router.get("/", appointmentController.getAppointments)
router.get("/thong-ke", appointmentController.getAppointmentStatistics)

export default router
