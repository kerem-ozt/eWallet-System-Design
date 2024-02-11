import User from '../Models/User'; 
import mongoose from 'mongoose';
import TokenHelper from '../Middlewares/TokenHelper';
import md5 from 'md5';
import crypto from 'crypto';

class UserServices {

    static async createUser(req) {
        try {
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
              return { type: false, message: 'User already exists' };
            }
            const saltKey = process.env.RANDOM_SALT_KEY;
            const encryptedPassword = md5(md5(req.body.password) + saltKey);
            req.body.password = encryptedPassword;
            req.body.token = '000';
            const resetToken = crypto.randomBytes(20).toString('hex');

            crypto.createHash('sha256').update(resetToken).digest('hex');

            const newUser = new User(req.body);
            await newUser.save();

            return { type: true, message: 'User created successfully', data: newUser };
        }
        catch (err) {
            return {type: false, data: null, message: `createUser failed: ${err}`};
        }
    }
    
    static async getUserById(req) {
        try {
          let objectId = new mongoose.Types.ObjectId(req.params.id);
          const user = await User.findById(objectId);
          if (!user) return { type: false, data: null, message: `getUserById failed: user not found` };
    
          return { type: true, data: user, message: `getUserById success` };
        } catch (err) {
          return { type: false, data: null, message: `getUserById failed: ${err}` };
        }
      }
    
      static async updateUser(req) {
        try {
          let objectId = new mongoose.Types.ObjectId(req.params.id);
          const user = await User.findById(objectId);
          if (!user) return { type: false, data: null, message: `updateUser failed: user not found` };

          Object.assign(user, req.body);
          await user.save();
    
          return { type: true, data: user, message: `updateUser success` };
        } catch (err) {
          return { type: false, data: null, message: `updateUser failed: ${err}` };
        }
    }

    static async deleteUser(req) {
        try {
          let objectId = new mongoose.Types.ObjectId(req.params.id);
          const user = await User.findById(objectId);
    
          if (!user) return { type: false, data: null, message: `deleteUser failed: user not found` };
    
          const result = await user.deleteOne({ _id: objectId });
    
          return { type: true, data: result, message: `deleteUser success` };
        } catch (err) {
          return { type: false, data: null, message: `deleteUser failed: ${err}` };
        }
    }

    static async getCurrentUser(req) {
        try {
          const decodedToken = TokenHelper.decodeToken(req.headers.authorization);
          let objectId = new mongoose.Types.ObjectId(decodedToken.id);
          const user = await User.findById(objectId);
          if (!user) return { type: false, data: null, message: `getCurrentUser failed: user not found` };
          return { type: true, data: user, message: `getCurrentUser success` };
        } catch {
          return { type: false, data: null, message: `getCurrentUser failed: ${err}` };
        }
      }
}

export default UserServices;
