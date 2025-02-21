"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const express_validator_1 = require("express-validator");
const nodemailer_1 = __importDefault(require("nodemailer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
router.post('/register', [
    (0, express_validator_1.check)('name', 'Please enter a name').isString(),
    (0, express_validator_1.check)('email', 'Please enter a valid email').isEmail(),
    (0, express_validator_1.check)('phone', 'Please enter a valid phone number').isString(),
    (0, express_validator_1.check)('company_name', 'Please enter a valid company name').isString(),
    (0, express_validator_1.check)('designation', 'Please enter a valid designation').isString(),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    try {
        let user = yield user_1.default.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: "User already exists." });
        }
        // Save new user
        user = new user_1.default(req.body);
        yield user.save();
        // Send greeting email after saving
        yield sendGreetingEmail(req.body.email, req.body.name);
        return res.status(200).send({
            message: "User registered successfully! A greeting email has been sent."
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ message: "Something went wrong!" });
    }
}));
// Function to send email
const sendGreetingEmail = (email, name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // ✅ Read the HTML file from the root directory
        const emailTemplatePath = path_1.default.join(__dirname, "../../one.html");
        const emailHtml = fs_1.default.readFileSync(emailTemplatePath, "utf8");
        // ✅ Replace placeholders (if needed)
        const personalizedHtml = emailHtml.replace("{{name}}", name);
        // ✅ Configure the nodemailer transporter
        const transporter = nodemailer_1.default.createTransport({
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
`, // ✅ Inject HTML content from file
        };
        // ✅ Send email
        yield transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${email}`);
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
});
exports.default = router;
