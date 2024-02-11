import User from "../Models/User";
import mongoose from 'mongoose';
import TokenHelper from './TokenHelper';

class RolePermissionHelper {
    static checkRole = (requiredRoles) => async (req, res, next) => {
        try {
            const decodedToken = TokenHelper.decodeToken(req.headers.authorization);
            let userId = new mongoose.Types.ObjectId(decodedToken.id);
            const user = await User.findById(userId).populate('roles');
            if (!user) {
                return res.status(400).json({ type: false, data: null, message: `checkRole failed: user not found` });
            }
            if (user.roles[0].name === 'admin') {
                return next();
            }
            const userRole = user.roles[0].name;
            if (requiredRoles.includes(userRole)) {
                next();
            } else {
                return res.status(403).send('Access denied.');
            }
        } catch (error) {
            return res.status(500).send('checkRole failed: Server error.');
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
