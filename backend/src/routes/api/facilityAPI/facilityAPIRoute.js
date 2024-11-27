import express from 'express';
import facilityController from '../../../controllers/medicalFacility/medicalFacilityController';

const router = express.Router();

router.get("/", facilityController.getFacilities)
router.get("/so-luong", facilityController.getFacilityStatistics)

export default router
