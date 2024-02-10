import User from '../Models/User'; 
import mongoose from 'mongoose';

class UserServices {

    static async createUser(req) {
        try {
            const newUser = new User(req.body);
            await newUser.save();
            return {type: true, data: newUser, message: `createUser success`};
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


    async updateUser2(userId, updateData) {
        return User.findByIdAndUpdate(userId, updateData, { new: true });
    }

    static async createUser2(req) {
      const user = new User(userData);
      await user.save();
      return user;
  }
    
}

export default UserServices;
