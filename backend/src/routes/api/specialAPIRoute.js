import express from 'express';
import specialtyController from '../../controllers/specialtyController';

const router = express.Router();

router.get("/", specialtyController.getSpecialties)
router.get("/so-luong", specialtyController.getSpecialtyStatistics)
router.get("/them", specialtyController.addSpecial)

export default router
