import express from 'express';
import TransactionController from '../Controllers/Transaction';
import RolePermissionHelper from '../Middlewares/RolePermissionHelper';

const TransactionRouter = express.Router();

TransactionRouter.post('/create', RolePermissionHelper.checkRole(['user', 'finance']), TransactionController.createTransaction);
TransactionRouter.post('/cancel/:id', RolePermissionHelper.checkRole(['user','finance']), TransactionController.cancelTransaction);
TransactionRouter.get('/account/:id', RolePermissionHelper.checkRole(['finance']), TransactionController.getTransactionsByAccountId);
TransactionRouter.post('/update/:id', RolePermissionHelper.checkRole(['finance']), TransactionController.updateTransactionStatus);
TransactionRouter.get('/status/:status', RolePermissionHelper.checkRole(['finance']), TransactionController.getTransactionsByStatus);
TransactionRouter.get('/history/:id', RolePermissionHelper.checkRole(['user', 'finance', 'admin']), TransactionController.getTransactionHistory);

export default TransactionRouter;