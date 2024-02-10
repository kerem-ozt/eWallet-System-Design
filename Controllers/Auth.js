import AuthService from '../Services/Auth';

class AuthController {

  static async register(req, res) {
    try {
      let result = await AuthService.register(req);
      return res.json(result);
    } catch (error) {
      res.json({ type: false, message: error.message });
    }
  }

  static async login(req, res) {
    try {
      let result = await AuthService.login(req);
      return res.json(result);
    } catch (error) {
      res.json({ type: false, message: error.message });
    }
  }

  static async logout(req, res) {
    try {
      let result = await AuthService.logout(req);
      return res.json(result);
    } catch (error) {
      res.json({ type: false, message: error.message });
    }
  }

  static async forgotPassword(req, res) {
    try {
      let result = await AuthService.forgotPassword(req);
      return res.json(result);
    } catch (error) {
      res.json({ type: false, message: error.message });
    }
  }

  static async resetPassword(req, res) {
    try {
      let result = await AuthService.resetPassword(req);
      return res.json(result);
    } catch (error) {
      res.json({ type: false, message: error.message });
    }
  }

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
