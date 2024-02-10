import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
    name: { 
        type: String, 
        enum: ['user', 'support', 'finance', 'admin'], 
        required: true 
    },
    permissions: [{ 
        type: String 
    }]
  });

export default mongoose.model('Role', roleSchema);