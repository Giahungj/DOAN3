import express from 'express'
import specialtyController from '../../controllers/specialty/specialtyController'

const router = express.Router()

// -----------------------------------------
router.get("/", specialtyController.getSpecialtiesPage)

// -----------------------------------------
router.post("/thong-tin", specialtyController.getSpecialInfoPage)

export default router