import express from 'express';
import BankAccountController from '../Controllers/BankAccount';

const BankAccountRouter = express.Router();

BankAccountRouter.post('/create', BankAccountController.createBankAccount);
BankAccountRouter.get('/user/:id', BankAccountController.getBankAccountsByUser);
BankAccountRouter.delete('/:id', BankAccountController.deleteBankAccount);

export default BankAccountRouter;