import Transaction from "../Models/Transaction";
import mongoose from "mongoose";

class TransactionService {
    static async createTransaction(req) {
        // transactionData
        try {
            const newTransaction = new Transaction(req.body);
            // eger para cekmek istiyorsa kimlik ve telefon dogrulamasini gectimi diye bak
            await newTransaction.save();
            return {
                type: true,
                data: newTransaction,
                message: `createTransaction success`,
            };
        } catch (err) {
            return {
                type: false,
                data: null,
                message: `createTransaction failed: ${err}`,
            };
        }
    }

    static async cancelTransaction(req) {
        // transactionId
        try {
            const transaction = await Transaction.findById(req.params.id);
            if (!transaction || transaction.status == "completed")
                return {
                    type: false,
                    data: null,
                    message: `deleteTransaction failed: transaction not found`,
                };
            transaction.status = "cancelled";
            await transaction.save();
            return {
                type: true,
                data: transaction,
                message: `deleteTransaction success`,
            };
        } catch (err) {
            return {
                type: false,
                data: null,
                message: `deleteTransaction failed: ${err}`,
            };
        }
    }

    static async getTransactionsByAccountId(req) {
        // accountId
        try {
            const objectId = new mongoose.Types.ObjectId(req.params.id);
            const transactions = await Transaction.find({ account: objectId });
            return {
                type: true,
                data: transactions,
                message: `getTransactionsByAccountId success`,
            };
        } catch (err) {
            return {
                type: false,
                data: null,
                message: `getTransactionsByAccountId failed: ${err}`,
            };
        }
    }

    static async updateTransactionStatus(req) {
        // transactionId, status
        try {
            const transaction = await Transaction.findByIdAndUpdate(
                req.params.id,
                { status: req.body.status }
            );
            if (!transaction)
                return {
                    type: false,
                    data: null,
                    message: `updateTransactionStatus failed: transaction not found`,
                };
            return {
                type: true,
                data: transaction,
                message: `updateTransactionStatus success`,
            };
        } catch (err) {
            return {
                type: false,
                data: null,
                message: `updateTransactionStatus failed: ${err}`,
            };
        }
    }

    static async getTransactionsByStatus(req) {
        // status
        try {
            const transactions = await Transaction.find({
                status: req.params.status,
            });
            return {
                type: true,
                data: transactions,
                message: `getTransactionsByStatus success`,
            };
        } catch (err) {
            return {
                type: false,
                data: null,
                message: `getTransactionsByStatus failed: ${err}`,
            };
        }
    }

    static async getTransactionHistory(req) {
        try {
            let objectId = new mongoose.Types.ObjectId(req.params.id);
            const transactions = await Transaction.find({ account: objectId })
                .sort({ timestamp: -1 }) // Latest transactions first
                .exec();
            return transactions;
        } catch (error) {
            throw new Error(
                `Unable to retrieve transaction history: ${error.message}`
            );
        }
    }
}

export default TransactionService;
