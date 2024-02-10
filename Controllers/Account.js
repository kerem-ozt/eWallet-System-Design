import AccountService from "../Services/Account";

class AccountController {

  /**
 * @swagger
 * /account/create:
 *   post:
 *     summary: Create a new user account with multiple currency balances
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - balances
 *             properties:
 *               user:
 *                 type: string
 *                 description: The user's ID
 *               bankAccount:
 *                 type: string
 *                 description: The user's bank account ID
 *               balances:
 *                 type: array
 *                 description: Array of currency balances
 *                 items:
 *                   type: object
 *                   required:
 *                     - currency
 *                     - amount
 *                   properties:
 *                     currency:
 *                       type: string
 *                       description: The currency of the balance
 *                     amount:
 *                       type: number
 *                       description: The amount of the specified currency
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: string
 *                 balances:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       currency:
 *                         type: string
 *                       amount:
 *                         type: number
 *       400:
 *         description: Error creating account
 *       500:
 *         description: Server error
 */


    static async createAccount(req, res) {
        try {
            const response = await AccountService.createAccount(req);
            if (response.type) {
                return res.status(201).json(response);
            }
            return res.status(400).json(response);
        } catch (err) {
            return res.status(500).json({ type: false, data: null, message: `createAccount failed: ${err}` });
        }
    }

    /**
     * @swagger
     * /account/deposit:
     *   post:
     *     summary: Deposit money into a user's account
     *     tags: [Account]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - accountId
     *               - amount
     *               - currency
     *             properties:
     *               accountId:
     *                 type: string
     *                 description: The user's account ID
     *               amount:
     *                 type: number
     *                 description: Amount to deposit
     *               currency:
     *                 type: string
     *                 description: Currency of the deposit
     *     responses:
     *       200:
     *         description: Deposit successful
     *       400:
     *         description: Error in deposit
     *       500:
     *         description: Server error
     */


    static async depositMoney(req, res) {
        try {
            const response = await AccountService.depositMoney(req);
            if (response.type) {
                return res.status(200).json(response);
            }
            return res.status(400).json(response);
        } catch (err) {
            return res.status(500).json({ type: false, data: null, message: `depositMoney failed: ${err}` });
        }
    }

    /**
     * @swagger
     * /account/withdraw:
     *   post:
     *     summary: Withdraw money from a user's account in a specified currency
     *     tags: [Account]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - accountId
     *               - amount
     *               - currency
     *             properties:
     *               accountId:
     *                 type: string
     *                 description: The ID of the account from which to withdraw
     *               amount:
     *                 type: number
     *                 description: The amount of money to withdraw
     *               currency:
     *                 type: string
     *                 description: The currency of the amount to be withdrawn
     *     responses:
     *       200:
     *         description: Withdrawal successful
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 type:
     *                   type: boolean
     *                 data:
     *                   type: object
     *                   properties:
     *                     accountId:
     *                       type: string
     *                     balances:
     *                       type: array
     *                       items:
     *                         type: object
     *                         properties:
     *                           currency:
     *                             type: string
     *                           amount:
     *                             type: number
     *                 message:
     *                   type: string
     *       400:
     *         description: Error in withdrawal (e.g., insufficient funds, account not found, currency not supported)
     *       500:
     *         description: Server error
     */

    static async withdrawMoney(req, res) {
        try {
            const response = await AccountService.withdrawMoney(req);
            if (response.type) {
                return res.status(200).json(response);
            }
            return res.status(400).json(response);
        } catch (err) {
            return res.status(500).json({ type: false, data: null, message: `withdrawMoney failed: ${err}` });
        }
    }

   /**
     * @swagger
     * /account/balance/{id}:
     *   get:
     *     summary: Get the balance of a user's account
     *     tags: [Account]
       *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: User ID to retrieve bank accounts for
     *     responses:
     *       200:
     *         description: Balance retrieved successfully
     *       400:
     *         description: Error retrieving balance
     *       500:
     *         description: Server error
     */


    static async getAccountBalance(req, res) {
        try {
            const response = await AccountService.getAccountBalance(req);
            if (response.type) {
                return res.status(200).json(response);
            }
            return res.status(400).json(response);
        } catch (err) {
            return res.status(500).json({ type: false, data: null, message: `getAccountBalance failed: ${err}` });
        }
    }
}

export default AccountController;