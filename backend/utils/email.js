const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Validate required environment variables
if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.error('SMTP credentials missing! Emails will not work.');
}

if (!process.env.SMTP_FROM) {
  console.error('SMTP_FROM environment variable not set! Using default sender.');
}

if (!process.env.FRONTEND_URL) {
  console.warn('FRONTEND_URL not set - password reset links may not work properly');
}

// Create reusable transporter object
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

/**
 * Generic email sending function with enhanced error handling
 */
const sendEmail = async (mailOptions) => {
  try {
    if (!mailOptions.to) throw new Error('No recipient specified');
    if (!mailOptions.subject) throw new Error('No subject specified');
    
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || 'no-reply@fitwear.com',
      ...mailOptions
    });
    
    console.log(`Email sent to ${mailOptions.to}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`Email failed to ${mailOptions.to}:`, error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

/**
 * Send verification email with OTP
 */
const sendVerificationEmail = async (email, otp) => {
  const mailOptions = {
    to: email,
    subject: 'Verify Your FitWear Account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2E86C1;">Welcome to FitWear!</h1>
        <p>Please use this code to verify your email:</p>
        <div style="background: #f5f5f5; padding: 10px; margin: 10px 0; text-align: center;">
          <strong style="font-size: 24px;">${otp}</strong>
        </div>
        <p>This code expires in 24 hours.</p>
        <p>If you didn't create an account with FitWear, please ignore this email.</p>
      </div>
    `,
    text: `Your FitWear verification code is: ${otp}\nThis code expires in 24 hours.`
  };

  return sendEmail(mailOptions);
};

/**
 * Send password reset email with token
 */
const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  
  const mailOptions = {
    to: email,
    subject: 'Password Reset Request - FitWear',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2E86C1;">Password Reset Request</h1>
        <p>We received a request to reset your FitWear account password.</p>
        <p>Click the button below to reset your password:</p>
        <a href="${resetUrl}" 
           style="background-color: #2E86C1; color: white; padding: 10px 20px; 
           text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0;">
          Reset Password
        </a>
        <p>Or use this OTP code: <strong>${resetToken}</strong></p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `,
    text: `To reset your FitWear password, click: ${resetUrl}\nOr use this OTP: ${resetToken}\nThis link expires in 1 hour.`
  };

  return sendEmail(mailOptions);
};

/**
 * Send order confirmation email
 */
const sendOrderConfirmationEmail = async (order, userEmail) => {
  const mailOptions = {
    to: userEmail,
    subject: `Your FitWear Order #${order._id}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2E86C1;">Thank you for your order!</h1>
        <p>Your order #${order._id} has been received and is being processed.</p>
        <p>Order total: $${order.totalAmount.toFixed(2)}</p>
        <p>Expected delivery date: ${new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toDateString()}</p>
        <p>We'll send another email when your items ship.</p>
      </div>
    `,
    text: `Thank you for your FitWear order #${order._id}\nTotal: $${order.totalAmount.toFixed(2)}`
  };

  return sendEmail(mailOptions);
};

// Verify transporter connection on startup
transporter.verify((error) => {
  if (error) {
    console.error('SMTP Connection Error:', error);
  } else {
    console.log('SMTP Server is ready to send emails');
  }
});

module.exports = {
  sendEmail,
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendOrderConfirmationEmail
};