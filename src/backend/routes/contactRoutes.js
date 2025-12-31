import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();
let contactMessages = [];


function getTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
}  
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    const contactMessage = {
      id: contactMessages.length + 1,
      name,
      email,
      message,
      createdAt: new Date(),
      status: 'unread'
    };

    contactMessages.push(contactMessage);

    const mailOptions = {
      from: `"${name}" <${email}>`,
      replyTo: email, 
      to: process.env.RECEIVER_EMAIL,
      subject: `Portfolio Contact: Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 10px;">New Contact Form Submission</h2>
            
            <div style="margin: 20px 0;">
              <p style="margin: 10px 0;"><strong style="color: #374151;">Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong style="color: #374151;">Email:</strong> <a href="mailto:${email}" style="color: #10b981;">${email}</a></p>
              <p style="margin: 10px 0;"><strong style="color: #374151;">Date:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <div style="margin: 20px 0; padding: 15px; background-color: #f9fafb; border-left: 4px solid #10b981; border-radius: 5px;">
              <p style="margin: 0; color: #374151; line-height: 1.6;"><strong>Message:</strong></p>
              <p style="margin: 10px 0 0 0; color: #1f2937; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">This message was sent from your portfolio website contact form.</p>
            </div>
          </div>
        </div>
      `
    };

    const transporter = getTransporter();
    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! I will get back to you soon.',
      data: {
        id: contactMessage.id,
        name: contactMessage.name,
        email: contactMessage.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again or email directly.',
      error: error.message
    });
  }
});


router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      count: contactMessages.length,
      messages: contactMessages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contact messages',
      error: error.message
    });
  }
});

router.post('/test-email', async (req, res) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: 'Test Email - Portfolio Contact Form',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #10b981;">Test Email Successful! ✅</h2>
          <p>Your email configuration is working correctly.</p>
          <p>Sent at: ${new Date().toLocaleString()}</p>
        </div>
      `
    };

    const transporter = getTransporter();
    const info = await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Test email sent successfully!',
      messageId: info.messageId,
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Test email failed',
      error: error.message,
      details: {
        code: error.code,
        command: error.command,
        response: error.response
      }
    });
  }
});

export default router;
