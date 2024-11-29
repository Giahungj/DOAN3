import express from 'express';
import accountController from '../../controllers/accountController';

const router = express.Router();

router.get("/", accountController.getAccounts)
router.get("/thong-ke", accountController.getAccountStatistics)

export default router
