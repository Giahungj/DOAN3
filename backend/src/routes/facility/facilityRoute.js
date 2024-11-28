import express from 'express'
import facilityController from '../../controllers/medicalFacility/medicalFacilityController'

const router = express.Router()

// -----------------------------------------
router.get("/", facilityController.getFacilitiesPage)

// -----------------------------------------
router.get("/thong-tin/:medical_facility_id", facilityController.getFacilityInfoPage)

export default router