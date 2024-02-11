import UserServices from "../Services/User";

class UserController {
    /**
     * @swagger
     * /user/create:
     *   post:
     *     summary: Create a new user
     *     tags: [User]
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
     *                 description: Unique username for the user.
     *               email:
     *                 type: string
     *                 description: User's email address. Must be unique.
     *               password:
     *                 type: string
     *                 description: Password for the user account.
     *               phoneNumber:
     *                 type: string
     *                 description: User's phone number. Must be unique.
     *               identityVerificationInfo:
     *                 type: object
     *                 properties:
     *                   idType:
     *                     type: string
     *                     description: Type of identification (e.g., passport, driver's license).
     *                   idNumber:
     *                     type: string
     *                     description: Identification number.
     *               roles:
     *                 type: array
     *                 items:
     *                   $ref: '#/components/schemas/RoleId'
     *                 description: List of role IDs associated with the user.
     *     responses:
     *       201:
     *         description: User created successfully.
     *       400:
     *         description: Error creating user. This may be due to missing required fields, duplicate username or email, or invalid role IDs.
     *       500:
     *         description: Server error.
     * components:
     *   schemas:
     *     RoleId:
     *       type: string
     *       description: ObjectId of a role.
     */

    static async createUser(req, res) {
        try {
            const response = await UserServices.createUser(req);
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
                    message: `createUser failed: ${err}`,
                });
        }
    }

    /**
     * @swagger
     * /user/{id}:
     *   get:
     *     summary: Retrieve a user by ID
     *     tags: [User]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Unique identifier of the user
     *     responses:
     *       200:
     *         description: User retrieved successfully
     *       400:
     *         description: Error retrieving user
     *       500:
     *         description: Server error
     */

    static async getUserById(req, res) {
        try {
            const response = await UserServices.getUserById(req);
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
                    message: `getUserById failed: ${err}`,
                });
        }
    }

    /**
     * @swagger
     * /user/update/{id}:
     *   post:
     *     summary: Update a user's information
     *     tags: [User]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Unique identifier of the user to update
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
     *                 description: Unique username for the user.
     *               email:
     *                 type: string
     *                 description: User's email address. Must be unique.
     *               password:
     *                 type: string
     *                 description: Password for the user account.
     *               phoneNumber:
     *                 type: string
     *                 description: User's phone number. Must be unique.
     *               identityVerificationInfo:
     *                 type: object
     *                 properties:
     *                   idType:
     *                     type: string
     *                     description: Type of identification (e.g., passport, driver's license).
     *                   idNumber:
     *                     type: string
     *                     description: Identification number.
     *               roles:
     *                 type: array
     *                 items:
     *                   $ref: '#/components/schemas/RoleId'
     *                 description: List of role IDs associated with the user.
     *     responses:
     *       200:
     *         description: User updated successfully
     *       400:
     *         description: Error updating user
     *       500:
     *         description: Server error
     */

    static async updateUser(req, res) {
        try {
            const response = await UserServices.updateUser(req);
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
                    message: `updateUser failed: ${err}`,
                });
        }
    }

    /**
     * @swagger
     * /user/{id}:
     *   delete:
     *     summary: Delete a user by ID
     *     tags: [User]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The user ID to delete
     *     security:
     *       - JWT: []
     *     responses:
     *       200:
     *         description: deleteUser success
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 type:
     *                   type: boolean
     *                 data:
     *                   type: object
     *                 message:
     *                   type: string
     *       400:
     *         description: "deleteUser failed: user not found"
     *       500:
     *         description: "deleteUser failed: server error"
     */

    static async deleteUser(req, res) {
        try {
            const response = await UserServices.deleteUser(req);
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
                    message: `deleteUser failed: ${err}`,
                });
        }
    }

    /**
     * @swagger
     * /user/current:
     *   get:
     *     summary: Get the current user's information
     *     tags: [User]
     *     security:
     *       - JWT: []
     *     responses:
     *       200:
     *         description: getCurrentUser success
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 type:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/User'
     *                 message:
     *                   type: string
     *       404:
     *         description: "getCurrentUser failed: user not found"
     *       500:
     *         description: "getCurrentUser failed: server error"
     */

    static async getCurrentUser(req, res) {
        try {
            const response = await UserServices.getCurrentUser(req);
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
                    message: `getCurrentUser failed: ${err}`,
                });
        }
    }
}

export default UserController;
