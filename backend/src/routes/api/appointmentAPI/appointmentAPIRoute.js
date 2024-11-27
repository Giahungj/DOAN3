import express from 'express';
import appointmentController from '../../../controllers/appointment/appointmentController';

const router = express.Router();

router.get("/", appointmentController.getAppointments)

export default router
