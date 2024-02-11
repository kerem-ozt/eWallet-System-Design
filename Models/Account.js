import mongoose from "mongoose";

const CurrencyEnum = ["USD", "EUR", "TRY"]; // Define your supported currencies

const balanceSchema = new mongoose.Schema({
    currency: {
        type: mongoose.Schema.Types.String,
        enum: CurrencyEnum,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        default: 0,
    },
});

const AccountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    bankAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BankAccount",
        required: true,
    },
    balances: [balanceSchema],
});

const Account = mongoose.model("Account", AccountSchema);
export default Account;
