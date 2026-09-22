
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendVerificationEmail(
  email: string,
  url: string
) {
  if (!process.env.SMTP_FROM || !process.env.SMTP_FROM_NAME) {
    throw new Error("SMTP_FROM or SMTP_FROM_NAME is missing");
  }

  const info = await transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM}>`,
    to: email,
    subject: "Verify your Job Tracker account",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2>Verify your email</h2>

        <p>Thanks for creating your Job Tracker account.</p>

        <p>Click the button below to verify your email:</p>

        <a
          href="${url}"
          style="
            display: inline-block;
            padding: 12px 20px;
            background: #000;
            color: #fff;
            text-decoration: none;
            border-radius: 6px;
          "
        >
          Verify Email
        </a>

        <p style="margin-top: 20px; color: #666;">
          If you didn't create this account, you can ignore this email.
        </p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(
  email: string,
  url: string
) {
  if (!process.env.SMTP_FROM || !process.env.SMTP_FROM_NAME) {
    throw new Error("SMTP_FROM or SMTP_FROM_NAME is missing");
  }

  await transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM}>`,
    to: email,
    subject: "Reset your Job Tracker password",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Reset your password</h2>
        <p>We received a request to reset your Job Tracker password.</p>
        <p>
          <a href="${url}"
             style="display:inline-block;padding:12px 20px;
                    background:#2563eb;color:#ffffff;
                    text-decoration:none;border-radius:6px;">
            Reset Password
          </a>
        </p>
        <p>If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  });
}

