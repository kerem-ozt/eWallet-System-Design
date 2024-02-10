import express from 'express';
import AdminController from '../Controllers/Admin';
import RolePermissionHelper from '../Middlewares/RolePermissionHelper';

const AdminRouter = express.Router();

AdminRouter.post('/assign-role', AdminController.assignRoleToUser);
AdminRouter.post('/remove-role', AdminController.removeRoleFromUser);
AdminRouter.post('/create-role', RolePermissionHelper.checkRolePermission(['admin','finance']), AdminController.createRole);
AdminRouter.put('/update-role', AdminController.updateRole);
AdminRouter.delete('/delete-role', AdminController.deleteRole);
AdminRouter.get('/get-roles', AdminController.getRoles);

export default AdminRouter;