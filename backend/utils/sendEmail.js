import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <h1>Password Reset Request</h1>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>If you didn't request this, please ignore this email.</p>
      <p>This link will expire in 1 hour.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

export const sendOrderConfirmationEmail = async (order, userEmail) => {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: userEmail,
    subject: `Order Confirmation #${order._id}`,
    html: `
      <h1>Order Confirmation</h1>
      <p>Thank you for your order!</p>
      <h2>Order Details:</h2>
      <ul>
        ${order.items.map(item => `
          <li>
            ${item.name} - Size: ${item.size}, Quantity: ${item.quantity}
            Price: $${item.price.toFixed(2)}
          </li>
        `).join('')}
      </ul>
      <p>Total: $${order.totalPrice.toFixed(2)}</p>
      <h2>Shipping Address:</h2>
      <p>
        ${order.shippingAddress.address}<br>
        ${order.shippingAddress.city}, ${order.shippingAddress.state}<br>
        ${order.shippingAddress.zipCode}
      </p>
    `
  };

  await transporter.sendMail(mailOptions);
};