import express from 'express';
import UserController from '../Controllers/User';
import RolePermissionHelper from '../Middlewares/RolePermissionHelper';

const UserRouter = express.Router();

UserRouter.post('/create', UserController.createUser);
UserRouter.post('/update/:id', UserController.updateUser);
UserRouter.get('/:id', UserController.getUserById);
UserRouter.delete('/delete/:id', UserController.deleteUser);
UserRouter.get('/current', UserController.getCurrentUser);

export default UserRouter;