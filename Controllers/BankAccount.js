import BankAccountService from "../Services/BankAccount";

class BankAccountController {
    /**
     * @swagger
     * /bankaccount/create:
     *   post:
     *     summary: Create a new bank account
     *     tags: [BankAccount]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - user
     *               - bankName
     *               - accountNumber
     *               - accountHolderName
     *             properties:
     *               user:
     *                 type: string
     *                 description: User ID associated with this account
     *               bankName:
     *                 type: string
     *                 description: Name of the bank
     *               accountNumber:
     *                 type: string
     *                 description: Unique account number
     *               accountHolderName:
     *                 type: string
     *                 description: Name of the account holder
     *     responses:
     *       201:
     *         description: Bank account created successfully
     *       400:
     *         description: Error creating bank account
     *       500:
     *         description: Server error
     */

    static async createBankAccount(req, res) {
        try {
            const response = await BankAccountService.createBankAccount(req);
            if (response.type) {
                return res.status(201).json(response);
            }
            return res.status(400).json(response);
        } catch (err) {
            return res
                .status(500)
                .json({
                    type: false,
                    data: null,
                    message: `createBankAccount failed: ${err}`,
                });
        }
    }

    /**
     * @swagger
     * /bankaccount/user/{id}:
     *   get:
     *     summary: Retrieve all bank accounts for a user
     *     tags: [BankAccount]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: User ID to retrieve bank accounts for
     *     responses:
     *       200:
     *         description: Successfully retrieved bank accounts
     *       400:
     *         description: Error retrieving bank accounts
     *       500:
     *         description: Server error
     */

    static async getBankAccountsByUser(req, res) {
        try {
            const response = await BankAccountService.getBankAccountsByUser(
                req
            );
            if (response.type) {
                return res.status(200).json(response);
            }
            return res.status(400).json(response);
        } catch (err) {
            return res
                .status(500)
                .json({
                    type: false,
                    data: null,
                    message: `getBankAccountsByUser failed: ${err}`,
                });
        }
    }

    /**
     * @swagger
     * /bankaccount/{accountId}:
     *   delete:
     *     summary: Delete a bank account
     *     tags: [BankAccount]
     *     parameters:
     *       - in: path
     *         name: accountId
     *         required: true
     *         schema:
     *           type: string
     *         description: Bank account ID to delete
     *     responses:
     *       200:
     *         description: Bank account deleted successfully
     *       400:
     *         description: Error deleting bank account
     *       500:
     *         description: Server error
     */

    static async deleteBankAccount(req, res) {
        try {
            const response = await BankAccountService.deleteBankAccount(req);
            if (response.type) {
                return res.status(200).json(response);
            }
            return res.status(400).json(response);
        } catch (err) {
            return res
                .status(500)
                .json({
                    type: false,
                    data: null,
                    message: `deleteBankAccount failed: ${err}`,
                });
        }
    }
}

export default BankAccountController;
