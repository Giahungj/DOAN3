import express from 'express'
import doctorController from '../../controllers/doctor/doctorController'

const router = express.Router()

// -----------------------------------------
router.get("/", doctorController.getDoctorsPage)

// -----------------------------------------
router.get("/thong-tin/:doctor_id", doctorController.getDoctorInfoPage)


export default router