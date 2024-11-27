import express from 'express'
import facilityController from '../../controllers/medicalFacility/medicalFacilityController'

const router = express.Router()

// -----------------------------------------
router.get("/", facilityController.getFacilitiesPage)

// -----------------------------------------
router.post("/thong-tin", facilityController.getFacilityInfoPage)

export default router