import express from 'express';
import appointmentController from '../../../controllers/appointment/appointmentController';

const router = express.Router();

router.get("/", appointmentController.getAppointments)
router.get("/thong-ke", appointmentController.getAppointmentStatistics)

export default router
