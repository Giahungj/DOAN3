import express from 'express';
import doctorController from '../../../controllers/doctor/doctorController';

const router = express.Router();

router.get("/", doctorController.getDoctors)
router.get("/so-luong", doctorController.getDoctorStatistics)

router.post("/thong-tin-bac-si", doctorController.getDoctorInfo)

export default router