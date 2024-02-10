import mongoose from 'mongoose';

const BankAccountSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    bankName: { 
        type: String, 
        required: true 
    },
    accountNumber: { 
        type: String, 
        required: true, 
        unique: true 
    },
    accountHolderName: { 
        type: String, 
        required: true 
    }
});

export default mongoose.model('BankAccount', BankAccountSchema);