import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

let tokenBlacklist = [];
class TokenHelper {
  static generateToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {});
    return token;
  }

  static decodeToken(token) {
    if (tokenBlacklist.includes(token)) {
      return { message: 'This token has been blacklisted.' };
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  }

  static verifyToken(req, res, next) {
    try {
      if (tokenBlacklist.includes(token)) {
        return res.status(401).json({ message: 'This token has been blacklisted.' });
      }

      const token = req.headers['x-access-token'];
      if (!token) {
        return res.status(401).json({
          message: 'Auth failed',
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userData = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        message: error.message,
      });
    }
  }

  static addToBlacklist(token) {
    tokenBlacklist.push(token);
  }
}

export default TokenHelper;
