import express, {Request, Response} from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import {check, validationResult} from "express-validator"
import nodemailer from 'nodemailer';

const router = express.Router();


router.post('/register', [
    check('name', 'Please enter a name').isString(),
    check('email', 'Please enter a valid email').isEmail(),
    check('phone', 'Please enter a valid phone number').isString(),
    check('company_name', 'Please enter a valid company name').isString(),
    check('designation', 'Please enter a valid designation').isString(),
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ message: "User already exists." });
        }

        // Save new user
        user = new User(req.body);
        await user.save();

        // Send greeting email after saving
        await sendGreetingEmail(req.body.email, req.body.name);

        return res.status(200).send({
            message: "User registered successfully! A greeting email has been sent."
        });

    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Something went wrong!" });
    }
});

// Function to send email
const sendGreetingEmail = async (email: string, name: string) => {
    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or use SMTP settings
        auth: {
            user: process.env.SMTP_USER, // Your email (store in env variable)
            pass: process.env.SMTP_PASS  // Your email password (store in env variable)
        }
    });

    // Email template
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Is Your Business Secure? Find Out in 60 Seconds! 🚀",
        html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #1a1a1a;
        }
        a {
            color: #0073e6;
            text-decoration: none;
            font-weight: bold;
        }
        .btn {
            display: inline-block;
            padding: 10px 15px;
            color: #ffffff;
            background-color: #0073e6;
            border-radius: 5px;
            text-decoration: none;
            margin-top: 10px;
        }
        .btn:hover {
            background-color: #005bb5;
        }
        .section {
            margin-bottom: 20px;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            text-align: center;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Hi ${name},</h2>
        <p>🔎 <strong>Did you know that 60% of businesses close within 6 months of a cyberattack?</strong> Yet, most don’t realize their vulnerabilities until it’s too late. <strong>What about your business?</strong></p>
        <p>At <strong>C9Lab</strong>, we specialize in <strong>AI-driven cybersecurity solutions</strong> that <strong>prevent attacks before they happen</strong>—because <strong>reactive security is already too late.</strong></p>
        
        <div class="section">
            <h3>🔥 What’s Keeping Businesses Safe?</h3>
            <p>✅ <strong>QSafe – Brand Protection</strong><br>Stop <strong>brand impersonation, fake domains, and social media scams</strong> before they damage your reputation.</p>
            <p>✅ <strong>C9Phish – AI-Powered Phishing Defense</strong><br>Train your employees to <strong>identify real cyber threats</strong> with <strong>simulated phishing campaigns</strong> & interactive security lessons.</p>
            <p>✅ <strong>C9Pharos – Website Security & Performance Monitoring</strong><br>Get <strong>instant alerts for downtime, SSL issues, malware, and data leaks</strong>—so you’re always in control.</p>
            <p>✅ <strong>C9Lab 360 – Secure Remote Access</strong><br>High-performance <strong>remote desktop security</strong> that keeps your team connected—without exposing sensitive data.</p>
        </div>
        
        <div class="section">
            <h3>🔍 Find Out How Secure Your Business Is (For Free!)</h3>
            <p>We built a <strong>FREE Business Risk Score Checker</strong> to help you understand where your business stands. In just <strong>60 seconds</strong>, you’ll get a <strong>security assessment</strong>—and insights on how to improve.</p>
            <a href="https://brs.c9lab.com/" class="btn">Check Your Business Risk Score Now</a>
        </div>
        
        <div class="section">
            <h3>🛡️ Protect Your Business—Anytime, Anywhere!</h3>
            <p>Monitor your website’s security <strong>on the go</strong> with <strong>C9Pharos</strong>—available for <strong>Android & iOS.</strong></p>
            <p>📲 <a href="#">Download for Android</a></p>
            <p>📲 <a href="#">Download for iOS</a></p>
        </div>
        
        <div class="section">
            <h3>⚡ Take Action Before Hackers Do!</h3>
            <p>Hundreds of businesses are already strengthening their defenses with <strong>C9Lab</strong>. <strong>Are you next?</strong></p>
            <p>📩 <strong>Let’s talk.</strong> Reply to this email or <a href="#">schedule a consultation</a> today.</p>
        </div>
        
        <p>Stay Secure,<br><strong>C9Lab</strong></p>
        
        <div class="footer">
            <p>© 2025 C9Lab. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`
    };

    // Send email
    await transporter.sendMail(mailOptions);
};


export default router;