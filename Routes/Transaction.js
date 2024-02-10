import express from 'express';
import TransactionController from '../Controllers/Transaction';

const TransactionRouter = express.Router();

TransactionRouter.post('/create', TransactionController.createTransaction);
TransactionRouter.get('/account/:id', TransactionController.getTransactionsByAccountId);
TransactionRouter.post('/update/:id', TransactionController.updateTransactionStatus);
TransactionRouter.get('/status/:status', TransactionController.getTransactionsByStatus);

export default TransactionRouter;