import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const EMAIL_TO = process.env.EMAIL_TO || process.env.EMAIL_USER;
const OWNER_NAME = process.env.OWNER_NAME || "Mudassir Ahmed";

app.use(cors({ origin: true }));
app.use(express.json());

const emailHost = process.env.EMAIL_HOST;
const emailPort = process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : undefined;
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

if (!emailHost || !emailPort || !emailUser || !emailPass) {
  console.warn(
    "Missing email configuration. Create a .env file with EMAIL_HOST, EMAIL_PORT, EMAIL_USER, and EMAIL_PASS."
  );
}

const transporter = nodemailer.createTransport({
  host: emailHost,
  port: emailPort,
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

transporter.verify((error) => {
  if (error) {
    console.warn("Email transporter verification failed:", error.message);
  } else {
    console.log("Email transporter is ready.");
  }
});

// API endpoint to handle contact form submissions
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Please provide name, email, and message." });
  }

  if (!emailHost || !emailPort || !emailUser || !emailPass) {
    return res
      .status(500)
      .json({ message: "Email service is not configured. Check server environment variables." });
  }

  const mailOptions = {
    from: `${name} <${emailUser}>`,
    to: EMAIL_TO,
    replyTo: email,
    subject: `New message from ${name} via portfolio website`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, "<br />")}</p>`,
  };

  const autoReplyOptions = {
    from: `${OWNER_NAME} <${emailUser}>`,
    to: email,
    subject: `Thank you for contacting ${OWNER_NAME}`,
    text: `Hi ${name},\n\nThank you for reaching out. I have received your message and will respond as soon as possible.\n\n---\n${message}\n---\n\nBest regards,\n${OWNER_NAME}`,
    html: `<p>Hi ${name},</p><p>Thank you for reaching out. I have received your message and will respond as soon as possible.</p><hr/><p>${message.replace(/\n/g, "<br />")}</p><p>Best regards,<br />${OWNER_NAME}</p>`,
  };

  // Send the contact message and auto-reply email
  try {
    console.log("Sending contact message to:", EMAIL_TO);
    const contactResult = await transporter.sendMail(mailOptions);
    console.log("Contact send result:", contactResult.response);

    console.log("Sending auto-reply to:", email);
    const autoReplyResult = await transporter.sendMail(autoReplyOptions);
    console.log("Auto-reply send result:", autoReplyResult.response);

    return res.status(200).json({ message: "Message and auto-reply sent successfully." });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({ message: "Could not send message. Please try again later." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Contact API server running on http://localhost:${PORT}`);
});
