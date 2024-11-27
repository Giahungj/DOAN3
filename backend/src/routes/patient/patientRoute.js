import express from 'express';
import patientController from '../../controllers/patient/patientController';
const router = express.Router();

// -----------------------------------------
router.get("/", patientController.getPatientsPage)

// -----------------------------------------
router.get("/thong-tin/:patient_id", patientController.getPatientInfoPage)

export default router