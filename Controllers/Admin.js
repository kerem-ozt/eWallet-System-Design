import AdminService from "../Services/Admin";

class AdminController {

    /**
     * @swagger
     * /admin/assign-role:
     *   post:
     *     summary: Assign a role to a user
     *     tags: [Admin]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               userId:
     *                 type: string
     *                 description: The user ID
     *               roleId:
     *                 type: string
     *                 description: The role ID to assign
     *     responses:
     *       200:
     *         description: Role assigned successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */

    static async assignRoleToUser(req, res) {
        try {
            const response = await AdminService.assignRoleToUser(req);
            if (response.type) {
                return res.status(200).json(response);
            }
            return res.status(400).json(response);
        } catch (err) {
            return res.status(500).json({ type: false, data: null, message: `assignRoleToUser failed: ${err}` });
        }
    }

    /**
     * @swagger
     * /admin/remove-role:
     *   post:
     *     summary: Remove a role from a user
     *     tags: [Admin]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               userId:
     *                 type: string
     *                 description: The user ID
     *               roleId:
     *                 type: string
     *                 description: The role ID to remove
     *     responses:
     *       200:
     *         description: Role removed successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */

    static async removeRoleFromUser(req, res) {
        try {
            const response = await AdminService.removeRoleFromUser(req);
            if (response.type) {
                return res.status(200).json(response);
            }
            return res.status(400).json(response);
        } catch (err) {
            return res.status(500).json({ type: false, data: null, message: `removeRoleFromUser failed: ${err}` });
        }
    }

    /**
     * @swagger
     * /admin/create-role:
     *   post:
     *     summary: Create a new role
     *     tags: [Admin]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - name
     *             properties:
     *               name:
     *                 type: string
     *                 enum: ['user', 'support', 'finance', 'admin']
     *                 description: The name of the role to create. Must be one of 'user', 'support', 'finance', 'admin'.
     *               permissions:
     *                 type: array
     *                 items:
     *                   type: string
     *                 description: An array of permissions associated with the role.
     *     responses:
     *       201:
     *         description: Role created successfully
     *       400:
     *         description: Bad request. This can occur if the role name is not one of the specified enums or required fields are missing.
     *       500:
     *         description: Internal server error
     */

    static async createRole(req, res) {
        try {
            const response = await AdminService.createRole(req);
            if (response.type) {
                return res.status(201).json(response);
            }
            return res.status(400).json(response);
        } catch (err) {
            return res.status(500).json({ type: false, data: null, message: `createRole failed: ${err}` });
        }
    }

    /**
     * @swagger
     * /admin/update-role:
     *   put:
     *     summary: Update an existing role
     *     tags: [Admin]
     *     parameters:
     *       - in: query
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The role ID to update
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: The role name to update
     *               permissions:
     *                 type: array
     *                 items:
     *                   type: string
     *                 description: An array of permissions associated with the role.
     *     responses:
     *       200:
     *         description: Role updated successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */

    static async updateRole(req, res) {
        try {
            const response = await AdminService.updateRole(req);
            if (response.type) {
                return res.status(200).json(response);
            }
            return res.status(400).json(response);
        } catch (err) {
            return res.status(500).json({ type: false, data: null, message: `updateRole failed: ${err}` });
        }
    }

    /**
     * @swagger
     * /admin/delete-role:
     *   delete:
     *     summary: Delete a role
     *     tags: [Admin]
     *     parameters:
     *       - in: params
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The role ID to delete
     *     responses:
     *       200:
     *         description: Role deleted successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */

    static async deleteRole(req, res) {
        try {
            const response = await AdminService.deleteRole(req);
            if (response.type) {
                return res.status(200).json(response);
            }
            return res.status(400).json(response);
        } catch (err) {
            return res.status(500).json({ type: false, data: null, message: `deleteRole failed: ${err}` });
        }
    }

    /**
     * @swagger
     * /admin/get-roles:
     *   get:
     *     summary: Get a list of all roles
     *     tags: [Admin]
     *     responses:
     *       200:
     *         description: A list of roles
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   roleId:
     *                     type: string
     *                     description: The role ID
     *                   roleName:
     *                     type: string
     *                     description: The name of the role
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */

    static async getRoles(req, res) {
        try {
            const response = await AdminService.getRoles(req);
            if (response.type) {
                return res.status(200).json(response);
            }
            return res.status(400).json(response);
        } catch (err) {
            return res.status(500).json({ type: false, data: null, message: `getRoles failed: ${err}` });
        }
    }

}

export default AdminController;