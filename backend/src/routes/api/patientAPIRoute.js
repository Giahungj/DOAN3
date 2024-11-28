import express from 'express';
import patientController from '../../controllers/patientController';

const router = express.Router();

router.get("/", patientController.getPatients)
router.get("/so-luong", patientController.getPatientStatistics)

export default router
