import express from 'express';
import specialtyController from '../../../controllers/specialty/specialtyController';

const router = express.Router();

router.get("/", specialtyController.getSpecialties)
router.get("/so-luong", specialtyController.getSpecialtyStatistics)

export default router
