import AuthService from "../Services/Auth";

class AuthController {
    /**
     * @swagger
     * /auth/register:
     *   post:
     *     summary: Register a new user
     *     tags: [Authentication]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - username
     *               - email
     *               - password
     *               - phoneNumber
     *             properties:
     *               username:
     *                 type: string
     *                 description: The user's username
     *               email:
     *                 type: string
     *                 format: email
     *                 description: The user's email address
     *               password:
     *                 type: string
     *                 format: password
     *                 description: The user's password
     *               phoneNumber:
     *                 type: string
     *                 description: The user's phone number
     *     responses:
     *       200:
     *         description: User created successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 type:
     *                   type: boolean
     *                 message:
     *                   type: string
     *                 data:
     *                   $ref: '#/components/schemas/User'
     *       400:
     *         description: Error creating user
     */

    static async register(req, res) {
        try {
            let result = await AuthService.register(req);
            return res.json(result);
        } catch (error) {
            res.json({ type: false, message: error.message });
        }
    }

    /**
     * @swagger
     * /auth/login:
     *   post:
     *     summary: Login an existing user
     *     tags: [Authentication]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *               - password
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *                 description: The user's email address
     *               password:
     *                 type: string
     *                 format: password
     *                 description: The user's password
     *     responses:
     *       200:
     *         description: Login successful
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 type:
     *                   type: boolean
     *                 message:
     *                   type: string
     *                 token:
     *                   type: string
     *                 isRegistrationComplete:
     *                   type: boolean
     *       400:
     *         description: Error in login
     */

    static async login(req, res) {
        try {
            let result = await AuthService.login(req);
            return res.json(result);
        } catch (error) {
            res.json({ type: false, message: error.message });
        }
    }

    /**
     * @swagger
     * /auth/logout:
     *   get:
     *     summary: Logout a user
     *     tags: [Authentication]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Logout successful
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 type:
     *                   type: boolean
     *                 message:
     *                   type: string
     *       401:
     *         description: Auth failed
     */

    static async logout(req, res) {
        try {
            let result = await AuthService.logout(req);
            return res.json(result);
        } catch (error) {
            res.json({ type: false, message: error.message });
        }
    }

    /**
     * @swagger
     * /auth/forgot-password:
     *   post:
     *     summary: Initiates the password reset process for a user
     *     tags: [Authentication]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *                 description: The email address of the user who forgot their password
     *     responses:
     *       200:
     *         description: An email with password reset instructions has been sent
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
     *                     accepted:
     *                       type: array
     *                       items:
     *                         type: string
     *                     rejected:
     *                       type: array
     *                       items:
     *                         type: string
     *                 message:
     *                   type: string
     *       400:
     *         description: Bad request (e.g., missing email field)
     *       404:
     *         description: User not found
     *       500:
     *         description: Server error or error sending email
     */

    static async forgotPassword(req, res) {
        try {
            let result = await AuthService.forgotPassword(req);
            return res.json(result);
        } catch (error) {
            res.json({ type: false, message: error.message });
        }
    }

    /**
     * @swagger
     * /auth/reset-password:
     *   post:
     *     summary: Reset a user's password
     *     tags: [Authentication]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *               - password
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *                 description: The email address associated with the user's account
     *               password:
     *                 type: string
     *                 format: password
     *                 description: The new password for the user
     *     responses:
     *       200:
     *         description: Password changed successfully
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
     *                     nModified:
     *                       type: integer
     *                     n:
     *                       type: integer
     *                     ok:
     *                       type: integer
     *                 message:
     *                   type: string
     *       400:
     *         description: Bad request (e.g., missing email or password, invalid email format)
     *       500:
     *         description: Server error or error changing password
     */

    static async resetPassword(req, res) {
        try {
            let result = await AuthService.resetPassword(req);
            return res.json(result);
        } catch (error) {
            res.json({ type: false, message: error.message });
        }
    }

    /**
     * @swagger
     * /auth/verify-reset-token/{token}:
     *   post:
     *     summary: Verify a password reset token
     *     tags: [Authentication]
     *     parameters:
     *       - in: path
     *         name: token
     *         required: true
     *         schema:
     *           type: string
     *         description: The password reset token to verify
     *     responses:
     *       200:
     *         description: Token verified successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 type:
     *                   type: boolean
     *                 message:
     *                   type: string
     *       404:
     *         description: User not found
     *       400:
     *         description: Bad request (e.g., missing or invalid token)
     *       500:
     *         description: Server error
     */

    static async verifyResetPasswordToken(req, res) {
        try {
            let result = await AuthService.verifyResetPasswordToken(req);
            return res.json(result);
        } catch (error) {
            res.json({ type: false, message: error.message });
        }
    }
}

export default AuthController;
