import User from "../Models/User";
import Role from "../Models/Role";
import mongoose from "mongoose";

class AdminService {

    static async assignRoleToUser(req) {
        try {
            const objectId = new mongoose.Types.ObjectId(req.body.userId);
            const roleObjectId = new mongoose.Types.ObjectId(req.body.roleId);

            const user = await User.findById( objectId );            
            const role = await Role.findById( roleObjectId );

            if (!user || !role) {
                return { type: false, data: null, message: `assignRoleToUser failed: user or role not found` };
            }

            if (!user.roles.includes(req.body.roleId)) {
                user.roles.push(req.body.roleId);
                await user.save();
            }

            return { type: true, data: user, message: `assignRoleToUser success` };
        } catch (err) {
            return { type: false, data: null, message: `assignRoleToUser failed: ${err}` };
        }
    }

    static async removeRoleFromUser(req) {
        try {
            const objectId = new mongoose.Types.ObjectId(req.body.userId);
            const roleObjectId = new mongoose.Types.ObjectId(req.body.roleId);

            const user = await User.findById( objectId );
            const role = await Role.findById( roleObjectId );

            if (!user || !role) {
                return { type: false, data: null, message: `removeRoleFromUser failed: user or role not found` };
            }

            if (user.roles.includes(req.body.roleId)) {
                user.roles = user.roles.filter(role => role.toString() !== req.body.roleId);
                await user.save();
            }

            return { type: true, data: user, message: `removeRoleFromUser success` };
        } catch (err) {
            return { type: false, data: null, message: `removeRoleFromUser failed: ${err}` };
        }
    }

    static async createRole(req) {
        try {
            const newRole = new Role(req.body);
            await newRole.save();
            return { type: true, data: newRole, message: `createRole success` };
        } catch (err) {
            return { type: false, data: null, message: `createRole failed: ${err}` };
        }
    }

    static async updateRole(req) {
        try {
            const objectId = new mongoose.Types.ObjectId(req.query.id);
            const role = await Role.findById( objectId );

            if (!role) {
                return { type: false, data: null, message: `updateRole failed: role not found` };
            }

            const updateResult = await Role.updateOne({ _id: objectId }, req.body);
    
            if (updateResult.modifiedCount === 0) {
                return { type: false, data: null, message: `updateRole failed: no updates made` };
            }
    
            const updatedRole = await Role.findById(objectId);
    
            return { type: true, data: updatedRole, message: `updateRole success` };
        } catch (err) {
            return { type: false, data: null, message: `updateRole failed: ${err}` };
        }
    }

    static async deleteRole(req) {
        try {
            let objectId = new mongoose.Types.ObjectId(req.params.id);
            const role = await Role.find({ _id: objectId });
            if (!role) return { type: false, data: null, message: `deleteRole failed: role not found` };
            const deletionResult = await Role.deleteOne({ _id: objectId });
            if(deletionResult.deletedCount === 0) {
                return { type: false, data: null, message: `deleteRole failed: No role found to delete` };
            }
            return { type: true, data: role, message: `deleteRole success` };
        } catch (err) {
            return { type: false, data: null, message: `deleteRole failed: ${err}` };
        }
    }

    static async getRoles(req) {
        try {
            const roles = await Role.find();
            return { type: true, data: roles, message: `getRoles success` };
        } catch (err) {
            return { type: false, data: null, message: `getRoles failed: ${err}` };
        }
    }

}

export default AdminService;