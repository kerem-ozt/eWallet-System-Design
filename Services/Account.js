import Account from "../Models/Account";
import mongoose from "mongoose";

class AccountService {
    static async createAccount(req) {
        // accountData
        try {
            const newAccount = new Account(req.body);
            await newAccount.save();
            return {
                type: true,
                data: newAccount,
                message: `CreateAccount success`,
            };
        } catch (err) {
            return {
                type: false,
                data: null,
                message: `CreateAccount failed: ${err}`,
            };
        }
    }

    static async getAccountByUserId(req) {
        // userId
        try {
            let objectId = new mongoose.Types.ObjectId(req.params.id);
            const account = await Account.findById(objectId);
            if (!account)
                return {
                    type: false,
                    data: null,
                    message: `getAccountByUserId failed: account not found`,
                };
            return {
                type: true,
                data: account,
                message: `getAccountByUserId success`,
            };
        } catch (err) {
            return {
                type: false,
                data: null,
                message: `getAccountByUserId failed: ${err}`,
            };
        }
    }

    static async depositMoney(req) {
        // accountId, amount, currency
        try {
            const { accountId, amount, currency } = req.body;
            const objectId = new mongoose.Types.ObjectId(accountId);
            const account = await Account.findById(objectId);
            if (!account) {
                return {
                    type: false,
                    data: null,
                    message: `depositMoney failed: account not found`,
                };
            }
            let currencyEntry = account.balances.find(
                (c) => c.currency === currency
            );
            if (currencyEntry) {
                currencyEntry.amount += amount;
            } else {
                account.balances.push({ currency, amount });
            }
            await account.save();
            return {
                type: true,
                data: account,
                message: `depositMoney success`,
            };
        } catch (error) {
            return {
                type: false,
                data: null,
                message: `depositMoney failed: ${error}`,
            };
        }
    }

    static async withdrawMoney(req) {
        // accountId, amount, currency
        try {
            const { accountId, amount, currency } = req.body;
            const account = await Account.findById(accountId);
            if (!account) {
                return {
                    type: false,
                    data: null,
                    message: `withdrawMoney failed: account not found`,
                };
            }
            let currencyEntry = account.balances.find(
                (c) => c.currency === currency
            );
            if (!currencyEntry) {
                return {
                    type: false,
                    data: null,
                    message: `withdrawMoney failed: currency not found`,
                };
            }
            if (currencyEntry.amount < amount) {
                return {
                    type: false,
                    data: null,
                    message: `withdrawMoney failed: Insufficient funds`,
                };
            }
            currencyEntry.amount -= amount;

            await account.save();
            return {
                type: true,
                data: account,
                message: `withdrawMoney success`,
            };
        } catch (error) {
            return {
                type: false,
                data: null,
                message: `withdrawMoney failed: ${error}`,
            };
        }
    }

    static async getAccountBalance(req) {
        //accountId
        try {
            let objectId = new mongoose.Types.ObjectId(req.params.id);
            const account = await Account.findById(objectId);
            if (!account)
                return {
                    type: false,
                    data: null,
                    message: `getAccountBalance failed: account not found`,
                };
            return {
                type: true,
                data: account,
                message: `getAccountBalance success`,
            };
        } catch (err) {
            return {
                type: false,
                data: null,
                message: `getAccountBalance failed: ${err}`,
            };
        }
    }

    static async getAccountDetails(req) {
        try {
            let userId = req.params.id;
            let objectId = new mongoose.Types.ObjectId(userId);
            console.log("userId:", objectId);
            const accounts = await Account.find({ user: objectId })
                .populate("user")
                .populate("bankAccount")
                .exec();
            return accounts;
        } catch (error) {
            throw new Error(
                `Unable to retrieve account details: ${error.message}`
            );
        }
    }
}

export default AccountService;
