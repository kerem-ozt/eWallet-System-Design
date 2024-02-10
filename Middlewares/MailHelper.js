import nodemailer from 'nodemailer';

class MailHelper {
    static async sendResetPasswordMail(email, token) {
        try {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp-mail.outlook.com',
            secure: false,
            port: 587,
            auth: {
              user: 'keremix10@gmail.com',
              pass: 'jfdv zqat odpw gyja',
            },
          });
    
          const mailOptions = {
            from: 'deno',
            to: email,
            subject: 'Reset Password',
            html: `<p> Merhaba, al sana <a href="http://127.0.0.1:3001/api/auth/forgot-password-token?token=${token}">  link</a>. </p> <div style="text-align: center;">
            <div style="font-size: 96px;">𓀓𓀃𓀁</div>
          </div>`,
          };
    
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.log(err);
            } else {
              console.log('Mail has been sent', info.response);
            }
          });
          return {type: true, message: 'Reset password mail sent'};
        } catch (error) {
          console.log(error);
          return {type: false, message: error.message};
        }
      }
}

export default MailHelper;