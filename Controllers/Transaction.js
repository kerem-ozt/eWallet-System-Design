import TransactionService from "../Services/Transaction";

class TransactionController {

    /**
     * @swagger
     * /transaction/create:
     *   post:
     *     summary: Create a new transaction
     *     tags: [Transaction]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - account
     *               - type
     *               - amount
     *               - currency
     *             properties:
     *               account:
     *                 type: string
     *                 description: Account ID the transaction is associated with
     *               type:
     *                 type: string
     *                 enum: [deposit, withdrawal, payment, receipt]
     *                 description: Type of the transaction
     *               amount:
     *                 type: number
     *                 description: Amount of the transaction
     *               currency:
     *                 type: string
     *                 description: Currency of the transaction
     *               status:
     *                 type: string
     *                 enum: [pending, completed, cancelled]
     *                 description: Status of the transaction (optional)
     *     responses:
     *       201:
     *         description: Transaction created successfully
     *       400:
     *         description: Error creating transaction
     *       500:
     *         description: Server error
     */

    static async createTransaction(req, res) {
        try {
            const response = await TransactionService.createTransaction(req);
            if (response.type) {
                return res.status(201).json(response);
            }
            return res.status(400).json(response);
        } catch (err) {
            return res.status(500).json({ type: false, data: null, message: `createTransaction failed: ${err}` });
        }
    }

    /**
     * @swagger
     * /transaction/account/{id}:
     *   get:
     *     summary: Retrieve all transactions for a specific account
     *     tags: [Transaction]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Account ID to retrieve transactions for
     *     responses:
     *       200:
     *         description: Successfully retrieved transactions
     *       400:
     *         description: Error retrieving transactions
     *       500:
     *         description: Server error
     */

    static async getTransactionsByAccountId(req, res) {
        try {
            const response = await TransactionService.getTransactionsByAccountId(req);
            if (response.type) {
                return res.status(200).json(response);
            }
            return res.status(400).json(response);
        } catch (err) {
            return res.status(500).json({ type: false, data: null, message: `getTransactionsByAccountId failed: ${err}` });
        }
    }

    /**
     * @swagger
     * /transaction/update/{transactionId}:
     *   post:
     *     summary: Update the status of a transaction
     *     tags: [Transaction]
     *     parameters:
     *       - in: path
     *         name: transactionId
     *         required: true
     *         schema:
     *           type: string
     *         description: Transaction ID to update the status for
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               status:
     *                 type: string
     *                 enum: [pending, completed, cancelled]
     *                 description: New status of the transaction
     *     responses:
     *       200:
     *         description: Transaction status updated successfully
     *       400:
     *         description: Error updating transaction status
     *       500:
     *         description: Server error
     */

    static async updateTransactionStatus(req, res) {
        try {
            const response = await TransactionService.updateTransactionStatus(req);
            if (response.type) {
                return res.status(200).json(response);
            }
            return res.status(400).json(response);
        } catch (err) {
            return res.status(500).json({ type: false, data: null, message: `updateTransactionStatus failed: ${err}` });
        }
    }

    /**
     * @swagger
     * /transaction/status/{status}:
     *   get:
     *     summary: Retrieve transactions by their status
     *     tags: [Transaction]
     *     parameters:
     *       - in: path
     *         name: status
     *         required: true
     *         schema:
     *           type: string
     *         description: Status of the transactions to retrieve
     *     responses:
     *       200:
     *         description: Successfully retrieved transactions
     *       400:
     *         description: Error retrieving transactions
     *       500:
     *         description: Server error
     */

    static async getTransactionsByStatus(req, res) {
        try {
            const response = await TransactionService.getTransactionsByStatus(req);
            if (response.type) {
                return res.status(200).json(response);
            }
            return res.status(400).json(response);
        } catch (err) {
            return res.status(500).json({ type: false, data: null, message: `getTransactionsByStatus failed: ${err}` });
        }
    }

/**
 * @swagger
 * /transaction/history/{id}/:
 *   get:
 *     summary: Get transaction history for a specific account
 *     tags: [Transaction]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The account ID to fetch transactions for
 *     responses:
 *       200:
 *         description: Successfully retrieved transaction history
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       401:
 *         description: Unauthorized - Authentication credentials were not provided or are invalid.
 *       404:
 *         description: Account not found
 *       500:
 *         description: Internal server error
 */


    static async getTransactionHistory(req, res) {
        try {
            const response = await TransactionService.getTransactionHistory(req);
            if (response.type) {
                return res.status(200).json(response);
            }
            return res.status(400).json(response);
        } catch (err) {
            return res.status(500).json({ type: false, data: null, message: `getTransactionHistory failed: ${err}` });
        }
    }

    /**
 * @swagger
 * /transaction/cancel/{id}/:
 *   post:
 *     summary: Cancel a specific transaction
 *     tags: [Transaction]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the transaction to cancel
 *     responses:
 *       200:
 *         description: Successfully cancelled the transaction
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Transaction'
 *                 message:
 *                   type: string
 *                   example: deleteTransaction success
 *       400:
 *         description: Transaction cannot be cancelled (e.g., already completed) or transaction not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 */

    static async cancelTransaction(req, res) {
        try {
            const response = await TransactionService.cancelTransaction(req);
            if (response.type) {
                return res.status(200).json(response);
            }
            return res.status(400).json(response);
        } catch (err) {
            return res.status(500).json({ type: false, data: null, message: `cancelTransaction failed: ${err}` });
        }
    }

}

export default TransactionController;