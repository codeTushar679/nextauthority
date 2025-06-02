import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import User from '@/models/userModel';

interface SendEmailParams {
    email: string;
    emailType: 'VERIFY' | 'RESET';
    userId: string;
}

export const sendEmail = async ({email, emailType, userId}: SendEmailParams) => {
    try {
        //TODO: configure mail for usage
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
            verifyToken: hashedToken,
            verifyTokenExpiry: Date.now() + 3600000, }); // 1 hour
        }  else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
            forgotPasswordToken: hashedToken,
            forgotPasswordExpiry: Date.now() + 3600000, }); // 1 hour
        }


        // Create a test account or replace with real credentials.
// Looking to send emails in production? Check out our Email API/SMTP product!
const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "822b018058c9b9",
    pass: "5ab82d39ebb50a"
  }
});

const resetUrl =
  emailType === 'VERIFY'
    ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
    : `${process.env.DOMAIN}/resetpassword?token=${hashedToken}`;

const mailOptions = {
  from: 'tushar123@gmail.com', // sender address
  to: email,
  subject: emailType === 'VERIFY' ? 'Verify your email!' : 'Reset your password',
  text:
    emailType === 'VERIFY'
      ? 'Please verify your email address.'
      : 'Reset your password using the link below.',
  html: `<p>
    Click <a href="${resetUrl}">here</a> to ${
      emailType === 'VERIFY' ? 'verify your email!' : 'reset your password'
    } or copy and paste the link below in your browser. Link available for 1 hour only!<br/>
    ${resetUrl}
    </p>`,
};

const mailResponse = await transport.sendMail(mailOptions);
return mailResponse;

    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}