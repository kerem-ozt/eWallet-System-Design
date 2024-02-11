import express from 'express';
import UserController from '../Controllers/User';
import RolePermissionHelper from '../Middlewares/RolePermissionHelper';
import userCheckCache from '../Middlewares/RedisHelper';

const UserRouter = express.Router();

UserRouter.post('/create', RolePermissionHelper.checkRole(['admin','finance','support']), UserController.createUser);
UserRouter.post('/update/:id', RolePermissionHelper.checkRole(['admin','user']), UserController.updateUser);
UserRouter.get('/current', RolePermissionHelper.checkRole(['admin','finance','support','user']), userCheckCache, UserController.getCurrentUser);
UserRouter.get('/:id', RolePermissionHelper.checkRole(['admin']), UserController.getUserById);
UserRouter.delete('/delete/:id', RolePermissionHelper.checkRole(['admin','support']), UserController.deleteUser);

export default UserRouter;