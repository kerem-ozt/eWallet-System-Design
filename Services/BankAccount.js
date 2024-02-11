import BankAccount from "../Models/BankAccount";
import mongoose from "mongoose";

class BankAccountService {
    static async createBankAccount(req) {
        // bankAccountData
        try {
            const newBankAccount = new BankAccount(req.body);
            await newBankAccount.save();
            return {
                type: true,
                data: newBankAccount,
                message: `addBankAccount success`,
            };
        } catch (err) {
            return {
                type: false,
                data: null,
                message: `addBankAccount failed: ${err}`,
            };
        }
    }

    static async getBankAccountsByUser(req) {
        // userId
        try {
            const objectId = new mongoose.Types.ObjectId(req.params.id);
            const bankAccounts = await BankAccount.find({ user: objectId });
            return {
                type: true,
                data: bankAccounts,
                message: `getBankAccountsByUser success`,
            };
        } catch (err) {
            return {
                type: false,
                data: null,
                message: `getBankAccountsByUser failed: ${err}`,
            };
        }
    }

    static async deleteBankAccount(req) {
        // accountId
        try {
            const bankAccount = await BankAccount.findByIdAndDelete(
                req.params.id
            );
            if (!bankAccount)
                return {
                    type: false,
                    data: null,
                    message: `deleteBankAccount failed: bank account not found`,
                };
            return {
                type: true,
                data: bankAccount,
                message: `deleteBankAccount success`,
            };
        } catch (err) {
            return {
                type: false,
                data: null,
                message: `deleteBankAccount failed: ${err}`,
            };
        }
    }
}

export default BankAccountService;
