import express from 'express';
import AccountController from "../Controllers/Account"

const AccountRouter = express.Router();

AccountRouter.post('/create', AccountController.createAccount);
AccountRouter.post('/deposit', AccountController.depositMoney);
AccountRouter.post('/withdraw', AccountController.withdrawMoney);
AccountRouter.get('/balance/:id', AccountController.getAccountBalance);

export default AccountRouter;