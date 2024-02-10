// import md5 from 'md5';
// import crypto from 'crypto';
// // import TokenHelper from '../Middleware/TokenHelper';
// // import MailHelper from '../Middleware/MailHelper';
// import User from '../Models/User';

// import * as dotenv from 'dotenv';
// dotenv.config();

// class AuthService {
//   static async register(req) {
//     try {
//       const { email, username } = req.body;
//       let password = req.body.password;

//       const existingUser = await User.findOne({ email });

//       if (existingUser) {
//         return { type: false, message: 'User already exists' };
//       }

//       const saltKey = process.env.RANDOM_SALT_KEY;
//       const encryptedPassword = md5(md5(password) + saltKey);
//       let password_hash = encryptedPassword;
//       const resetToken = crypto.randomBytes(20).toString('hex');

//       crypto.createHash('sha256').update(resetToken).digest('hex');

//       const newUser = new User({
//         email,
//         password_hash,
//         token: resetToken,
//       });
//       await newUser.save();

//       return { type: true, message: 'User created successfully', data: newUser };
//     } catch (error) {
//       console.log(error);
//       return { type: false, message: error.message };
//     }
//   }

//   static async login(req) {
//     try {
//       const { email, password } = req.body;

//       console.log(email, password);

//       const saltKey = process.env.RANDOM_SALT_KEY;
//       const encryptedPassword = md5(md5(password) + saltKey);

//       // add id for websocket user or assign to username WebSocketServer.assignRandomId();

//       const user = await User.findOne({ email: email, password_hash: encryptedPassword });

//       if (!user) return { type: false, message: 'User not found' };

//       const token = TokenHelper.generateToken({
//         id: user.id,
//         email: user.email,
//         role_id: user.role_id,
//       });

//       return { type: true, message: 'Login successful', token, isRegisterationComplete: user.isRegisterationComplete };
//     } catch (error) {
//       return { type: false, message: error.message };
//     }
//   }

//   static async logout(req) {
//     try {
//       const token = req.headers.authorization;

//       if (!token) {
//         return { type: false, message: 'Auth failed' };
//       }

//       TokenHelper.addToBlacklist(token);

//       return { type: true, message: 'Logout successful' };
//     } catch (error) {
//       return { type: false, message: error.message };
//     }
//   }

//   static async forgotPassword(req) {
//     try {
//       const { email } = req.body;

//       const user = await User.findOne({ email: email });
//       if (!user) return { type: false, message: 'User not found' };

//       user.token = crypto.randomBytes(20).toString('hex');
//       await user.save();

//       let sendMail = await MailHelper.sendResetPasswordMail(user.email, user.token);

//       return { type: true, data: sendMail, message: 'Email sent' };
//     } catch (error) {
//       return { type: false, message: error.message };
//     }
//   }

//   static async verifyResetPasswordToken(req) {
//     try {
//       const { token } = req.params;
//       const user = await User.findOne({ token: token });

//       if (!user) return { type: false, message: 'User not found' };
//       return { type: true, message: 'Token verified successfully' };
//     } catch (error) {
//       return { type: false, message: error.message };
//     }
//   }

//   static async resetPassword(req) {
//     try {
//       let { email, password } = req.body;

//       const saltKey = process.env.RANDOM_SALT_KEY;
//       const encryptedPassword = md5(md5(password) + saltKey);
//       const resetToken = crypto.randomBytes(20).toString('hex');

//       crypto.createHash('sha256').update(resetToken).digest('hex');
//       this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

//       let userData = await User.updateOne({ email: email }, { password_hash: encryptedPassword, token: resetToken });

//       return { type: true, data: userData, message: 'Password changed successfully' };
//     } catch (error) {
//       return { type: false, message: error.message };
//     }
//   }

// }

// export default AuthService;
