import express from 'express'
import accountController from '../controllers/accountController'

const router = express.Router()

// -----------------------------------------
router.get("/", accountController.getAccountsPage)

// -----------------------------------------
router.get("/thong-tin/:user_id", accountController.getAccountInfoPage)

// -----------------------------------------
router.post("/cap-nhat", accountController.updateAccount)

// -----------------------------------------
router.get("/xoa", accountController.updateAccount)

export default router