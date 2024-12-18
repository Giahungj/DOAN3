import express from 'express'
import specialtyController from '../controllers/specialtyController'

const router = express.Router()

// -----------------------------------------
router.get("/", specialtyController.getSpecialtiesPage)

// -----------------------------------------
router.get("/thong-tin/:special_id", specialtyController.getSpecialInfoPage)

export default router