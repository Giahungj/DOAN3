import express from 'express';
import doctorController from '../../controllers/doctorController';

const router = express.Router();

router.get("/", doctorController.getDoctors)
router.get("/so-luong", doctorController.getDoctorStatistics)

router.post("/thong-tin", doctorController.getDoctorInfo)

export default router
