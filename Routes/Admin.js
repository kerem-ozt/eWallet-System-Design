import express from 'express';
import AdminController from '../Controllers/Admin';
import RolePermissionHelper from '../Middlewares/RolePermissionHelper';

const AdminRouter = express.Router();

AdminRouter.post('/assign-role', RolePermissionHelper.checkRole(['admin']), AdminController.assignRoleToUser);
AdminRouter.post('/remove-role', RolePermissionHelper.checkRole(['admin']), AdminController.removeRoleFromUser);
AdminRouter.post('/create-role', RolePermissionHelper.checkRole(['admin']), AdminController.createRole);
AdminRouter.put('/update-role', RolePermissionHelper.checkRole(['admin']), AdminController.updateRole);
AdminRouter.delete('/delete-role', RolePermissionHelper.checkRole(['admin']), AdminController.deleteRole);
AdminRouter.get('/get-roles', RolePermissionHelper.checkRole(['admin']), AdminController.getRoles);

export default AdminRouter;