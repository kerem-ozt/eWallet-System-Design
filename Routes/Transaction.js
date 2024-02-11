import express from 'express';
import TransactionController from '../Controllers/Transaction';
import RolePermissionHelper from '../Middlewares/RolePermissionHelper';

const TransactionRouter = express.Router();

TransactionRouter.post('/create', RolePermissionHelper.checkRole(['user', 'finance']), TransactionController.createTransaction);
TransactionRouter.get('/account/:id', RolePermissionHelper.checkRole(['finance', 'support']), TransactionController.getTransactionsByAccountId);
TransactionRouter.post('/update/:id', RolePermissionHelper.checkRole(['finance']), TransactionController.updateTransactionStatus);
TransactionRouter.get('/status/:status', RolePermissionHelper.checkRole(['finance', 'support']), TransactionController.getTransactionsByStatus);

export default TransactionRouter;