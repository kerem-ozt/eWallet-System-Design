import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    account: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'BankAccount', 
        required: true 
    },
    type: { 
        type: String, 
        enum: ['deposit', 'withdrawal', 'payment', 'receipt'], 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    currency: { 
        type: String, 
        required: true 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    },
    status: { 
        type: String, 
        enum: ['pending', 'completed', 'cancelled'], 
        default: 'pending' 
    }
});

export default mongoose.model('Transaction', transactionSchema);