import Transaction from '../Models/Transaction';
import mongoose from 'mongoose';

class TransactionService {
    
    static async createTransaction(req) { // transactionData
        try {
            const newTransaction = new Transaction(req.body);
            await newTransaction.save();
            return { type: true, data: newTransaction, message: `createTransaction success` };
        } catch (err) {
            return { type: false, data: null, message: `createTransaction failed: ${err}` };
        }
    }

    static async getTransactionsByAccountId(req) { // accountId
        try {
            const objectId = new mongoose.Types.ObjectId(req.params.id);
            const transactions = await Transaction.find({ account: objectId });
            return { type: true, data: transactions, message: `getTransactionsByAccountId success` };
        } catch (err) {
            return { type: false, data: null, message: `getTransactionsByAccountId failed: ${err}` };
        }
    }

    static async updateTransactionStatus(req) { // transactionId, status
        try {
            const transaction = await Transaction.findByIdAndUpdate(
                req.params.id, 
                { status: req.body.status },
            );
            if (!transaction) return { type: false, data: null, message: `updateTransactionStatus failed: transaction not found` };
            return { type: true, data: transaction, message: `updateTransactionStatus success` };
        } catch (err) {
            return { type: false, data: null, message: `updateTransactionStatus failed: ${err}` };
        }
    }

    static async getTransactionsByStatus(req) { // status
        try {
            const transactions = await Transaction.find({ status: req.params.status });
            return { type: true, data: transactions, message: `getTransactionsByStatus success` };
        } catch (err) {
            return { type: false, data: null, message: `getTransactionsByStatus failed: ${err}` };
        }
    }

}

export default TransactionService;

// Handles all transaction operations, such as creating and listing transactions.

// createTransaction(transactionData): Records a new transaction with the given data.
// getTransactionsByAccountId(accountId): Retrieves all transactions for a specific account.
// getTransactionById(transactionId): Retrieves a specific transaction by its ID.
// updateTransactionStatus(transactionId, status): Updates the status of a transaction (e.g., pending, completed, cancelled).

// const Transaction = require('../models/Transaction');

// const createTransaction = async (transactionData) => {
//   const transaction = new Transaction(transactionData);
//   await transaction.save();
//   return transaction;
// };

// const getTransactionsByAccountId = async (accountId) => {
//   return Transaction.find({ account: accountId });
// };

// module.exports = {
//   createTransaction,
//   getTransactionsByAccountId
// };
