import express from 'express';
import BankAccountController from '../Controllers/BankAccount';
import RolePermissionHelper from '../Middlewares/RolePermissionHelper';

const BankAccountRouter = express.Router();

BankAccountRouter.post('/create', RolePermissionHelper.checkRole(['user','finance']), BankAccountController.createBankAccount);
BankAccountRouter.get('/user/:id', RolePermissionHelper.checkRole(['user']), BankAccountController.getBankAccountsByUser);
BankAccountRouter.delete('/:id', RolePermissionHelper.checkRole(['user','finance']), BankAccountController.deleteBankAccount);

export default BankAccountRouter;