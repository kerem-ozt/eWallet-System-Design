import express from 'express';
import AuthController from '../Controllers/Auth';

const AuthRouter = express.Router();

AuthRouter.post('/register', AuthController.register);
AuthRouter.post('/login', AuthController.login);
AuthRouter.get('/logout', AuthController.logout);
AuthRouter.post('/forgot-password-token/:token', AuthController.verifyResetPasswordToken);
AuthRouter.post('/forgot-password', AuthController.forgotPassword);
AuthRouter.post('/reset-password', AuthController.resetPassword);

export default AuthRouter;