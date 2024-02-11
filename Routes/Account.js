import express from 'express';
import AccountController from "../Controllers/Account"
import RolePermissionHelper from "../Middlewares/RolePermissionHelper"

const AccountRouter = express.Router();

AccountRouter.post('/create', RolePermissionHelper.checkRole(['admin','finance']), AccountController.createAccount);
AccountRouter.post('/deposit', RolePermissionHelper.checkRole(['user',  'finance']), AccountController.depositMoney);
AccountRouter.post('/withdraw', RolePermissionHelper.checkRole(['finance']), AccountController.withdrawMoney);
AccountRouter.get('/balance/:id', RolePermissionHelper.checkRole(['user', 'finance']), AccountController.getAccountBalance);
AccountRouter.get('/details/:id', RolePermissionHelper.checkRole(['user', 'finance']), AccountController.getAccountDetails);

export default AccountRouter;