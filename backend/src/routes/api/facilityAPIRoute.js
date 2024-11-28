import express from 'express';
import facilityController from '../../controllers/medicalFacilityController';

const router = express.Router();

router.get("/", facilityController.getFacilities)
router.get("/so-luong", facilityController.getFacilityStatistics)
router.get("/thong-tin", facilityController.getFacilityInfo)

export default router
