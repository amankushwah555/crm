import express, {Request, Response} from "express";
import User from "../models/user";
import {check, validationResult} from "express-validator"
import nodemailer from 'nodemailer';
import fs from "fs";
import path from "path";
import ExcelJS from "exceljs";

const router = express.Router();


router.post('/register', [
    check('name', 'Please enter a name').isString(),
    // check('email', 'Please enter a valid email').isEmail(),
    // check('phone', 'Please enter a valid phone number').isString(),
    // check('company_name', 'Please enter a valid company name').isString(),
    // check('designation', 'Please enter a valid designation').isString(),
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
  try {
      // ✅ Read the HTML file from the root directory
      const emailTemplatePath = path.join(__dirname, "../../one.html");
      const emailHtml = fs.readFileSync(emailTemplatePath, "utf8");

      // ✅ Replace placeholders (if needed)
      const personalizedHtml = emailHtml.replace("{{name}}", name);

      // ✅ Configure the nodemailer transporter
      const transporter = nodemailer.createTransport({
          service: 'gmail', // Or use SMTP settings
          auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS
          }
      });

      // ✅ Mail options
      const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Welcome to C9lab Pinak Infosec Pvt. Ltd.! 🚀",
          html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333333;
        }
        p {
            font-size: 16px;
            color: #555555;
            line-height: 1.6;
        }
        .signature {
            margin-top: 20px;
            font-weight: bold;
            color: #333333;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777777;
            text-align: center;
        }
      .btn {
    display: inline-block;
    background-color: orange;
    color: #ffffff!important; /* Use this property for white text */
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 5px;
    font-size: 16px;
    margin-top: 10px;
}

.btn:hover {
    background-color: rgb(245, 151, 9);
}

    </style>
</head>
<body>

    <div class="container">
        <h2>Dear ${name},</h2>

        <p>
            It was a pleasure meeting you at the <strong>Global Investors Summit 2025</strong>. 
            We appreciate your time and interest in connecting with us.
        </p>

        <p>
            Looking forward to staying in touch and exploring future opportunities together. 
            Feel free to reach out anytime!
        </p>

        <p class="signature">
            Best Regards,<br>
            Prasoon Upadhyay<br>
            Sales Head<br>
            <strong>C9Lab | Pinak Infosec Pvt. Ltd.</strong><br>
            <a href="mailto:prasoon.upadhyay@pinakinfosec.com" style="color: #007bff;">Email: prasoon.upadhyay@pinakinfosec.com</a><br>
            <a href="https://c9lab.com" target="_blank" class="btn">Visit Our Website</a>
        </p>

        <div class="footer">
            &copy; 2025 C9Lab Pinak Infosec Pvt. Ltd. | All Rights Reserved.
        </div>
    </div>

</body>
</html>
`,  // ✅ Inject HTML content from file
      };

      // ✅ Send email
      await transporter.sendMail(mailOptions);
      console.log(`Email sent successfully to ${email}`);
  } catch (error) {
      console.error("Error sending email:", error);
  }
};


router.get("/export-excel", async (req: Request, res: Response) => {
    try {
        // Fetch users from MongoDB
        const users = await User.find();

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found to export" });
        }

        // Create a new workbook and worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Users");

        // Define columns
        worksheet.columns = [
            { header: "Name", key: "name", width: 20 },
            { header: "Email", key: "email", width: 30 },
            { header: "Phone", key: "phone", width: 15 },
            { header: "Company Name", key: "company_name", width: 25 },
            { header: "Designation", key: "designation", width: 25 },
        ];

        // Add rows to the worksheet
        users.forEach((user) => {
            worksheet.addRow(user.toObject());
        });

        // Set the response headers for file download
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=users.xlsx"
        );

        // Write to response
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error("Error exporting users to Excel:", error);
        res.status(500).json({ message: "Failed to export data" });
    }
});


export default router;