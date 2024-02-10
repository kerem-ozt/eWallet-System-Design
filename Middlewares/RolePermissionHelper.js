import User from "../Models/User";
import mongoose from 'mongoose';

class RolePermissionHelper {
    static checkRolePermission = (requiredRoles) => async (req, res, next) => {
        try {
            const user = await User.findById(req.user.id).populate('role');
            if (!user) {
                return res.status(400).json({ type: false, data: null, message: `checkRolePermission failed: user not found` });
            }
            if (user.roles[0] === 'admin') {
                return next();
            }
            const userRole = user.roles[0];
            if (requiredRoles.includes(userRole)) {
                next();
            } else {
                return res.status(403).send('Access denied.');
            }
        } catch (error) {
            return res.status(500).send('Server error.');
        }
    }

    static hasPermission = (requiredPermission) => async (req, res, next) => {
        try {
            const user = await User.findById(req.userId).populate('role');
            if (!user) return res.status(404).send('User not found.');
    
            const userPermissions = user.roles.permissions;
            if (userPermissions.includes(requiredPermission)) {
                next();
            } else {
                return res.status(403).send('Access denied.');
            }
        } catch (error) {
            return res.status(500).send('Server error.');
        }
    };
    
}

export default RolePermissionHelper;
