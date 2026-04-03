import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOTPEmail(email: string, otp: string, name?: string) {
  const mailOptions = {
    from: `"LearnifyPro" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: email,
    subject: "Verify your email - LearnifyPro",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
        </head>
        <body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                  <tr>
                    <td style="background:linear-gradient(135deg,#7c3aed,#4f46e5);padding:40px;text-align:center;">
                      <h1 style="color:#fff;margin:0;font-size:28px;font-weight:700;">LearnifyPro</h1>
                      <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;font-size:14px;">The World's Best Learning Platform</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:40px;">
                      <h2 style="color:#1a1a2e;margin:0 0 16px;font-size:22px;">Verify Your Email Address</h2>
                      <p style="color:#6b7280;font-size:15px;line-height:1.6;margin:0 0 32px;">
                        Hi ${name || "there"},<br><br>
                        Welcome to LearnifyPro! Use the OTP below to verify your email address and complete your registration.
                      </p>
                      <div style="background:#f5f3ff;border:2px dashed #7c3aed;border-radius:12px;padding:24px;text-align:center;margin:0 0 32px;">
                        <p style="color:#6b7280;font-size:13px;margin:0 0 8px;text-transform:uppercase;letter-spacing:1px;">Your OTP Code</p>
                        <h1 style="color:#7c3aed;font-size:48px;letter-spacing:12px;margin:0;font-weight:700;">${otp}</h1>
                        <p style="color:#9ca3af;font-size:12px;margin:12px 0 0;">Valid for 10 minutes only</p>
                      </div>
                      <p style="color:#9ca3af;font-size:13px;line-height:1.6;margin:0;">
                        If you didn't create an account, you can safely ignore this email.<br>
                        Never share this OTP with anyone.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="background:#f9fafb;padding:24px;text-align:center;border-top:1px solid #e5e7eb;">
                      <p style="color:#9ca3af;font-size:12px;margin:0;">© 2024 LearnifyPro. All rights reserved.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendPasswordResetEmail(email: string, otp: string, name?: string) {
  const mailOptions = {
    from: `"LearnifyPro" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: email,
    subject: "Reset your password - LearnifyPro",
    html: `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
        <body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
            <tr><td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                <tr>
                  <td style="background:linear-gradient(135deg,#7c3aed,#4f46e5);padding:40px;text-align:center;">
                    <h1 style="color:#fff;margin:0;font-size:28px;font-weight:700;">LearnifyPro</h1>
                    <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;font-size:14px;">Password Reset Request</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:40px;">
                    <h2 style="color:#1a1a2e;margin:0 0 16px;font-size:22px;">Reset Your Password</h2>
                    <p style="color:#6b7280;font-size:15px;line-height:1.6;margin:0 0 32px;">
                      Hi ${name || "there"},<br><br>
                      We received a request to reset your LearnifyPro password. Use the code below to set a new password.
                    </p>
                    <div style="background:#f5f3ff;border:2px dashed #7c3aed;border-radius:12px;padding:24px;text-align:center;margin:0 0 32px;">
                      <p style="color:#6b7280;font-size:13px;margin:0 0 8px;text-transform:uppercase;letter-spacing:1px;">Reset Code</p>
                      <h1 style="color:#7c3aed;font-size:48px;letter-spacing:12px;margin:0;font-weight:700;">${otp}</h1>
                      <p style="color:#9ca3af;font-size:12px;margin:12px 0 0;">Valid for 10 minutes only</p>
                    </div>
                    <p style="color:#9ca3af;font-size:13px;line-height:1.6;margin:0;">
                      If you didn't request a password reset, you can safely ignore this email.<br>
                      Never share this code with anyone.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="background:#f9fafb;padding:24px;text-align:center;border-top:1px solid #e5e7eb;">
                    <p style="color:#9ca3af;font-size:12px;margin:0;">© 2024 LearnifyPro. All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>
        </body>
      </html>
    `,
  };
  await transporter.sendMail(mailOptions);
}

export async function sendWelcomeEmail(email: string, name: string) {
  const mailOptions = {
    from: `"LearnifyPro" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: email,
    subject: "Welcome to LearnifyPro! 🎉",
    html: `
      <!DOCTYPE html>
      <html>
        <body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                  <tr>
                    <td style="background:linear-gradient(135deg,#7c3aed,#4f46e5);padding:40px;text-align:center;">
                      <h1 style="color:#fff;margin:0;font-size:28px;font-weight:700;">Welcome to LearnifyPro!</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:40px;">
                      <h2 style="color:#1a1a2e;margin:0 0 16px;">Hi ${name}! 👋</h2>
                      <p style="color:#6b7280;font-size:15px;line-height:1.6;">
                        Your account has been successfully verified. You now have access to thousands of courses taught by industry experts.
                      </p>
                      <div style="text-align:center;margin:32px 0;">
                        <a href="${process.env.NEXTAUTH_URL}/courses" style="background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:15px;font-weight:600;display:inline-block;">
                          Browse Courses
                        </a>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendOrderConfirmationEmail(
  email: string,
  name: string,
  orderDetails: { courses: string[]; total: number; orderId: string }
) {
  const mailOptions = {
    from: `"LearnifyPro" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: email,
    subject: `Order Confirmed #${orderDetails.orderId} - LearnifyPro`,
    html: `
      <!DOCTYPE html>
      <html>
        <body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                  <tr>
                    <td style="background:linear-gradient(135deg,#7c3aed,#4f46e5);padding:40px;text-align:center;">
                      <h1 style="color:#fff;margin:0;font-size:24px;">Order Confirmed! ✅</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:40px;">
                      <p style="color:#6b7280;font-size:15px;">Hi ${name}, your order <strong>#${orderDetails.orderId}</strong> has been confirmed.</p>
                      <div style="background:#f5f3ff;border-radius:8px;padding:20px;margin:24px 0;">
                        <h3 style="color:#7c3aed;margin:0 0 12px;">Courses Purchased:</h3>
                        ${orderDetails.courses.map((c) => `<p style="color:#374151;margin:4px 0;">• ${c}</p>`).join("")}
                        <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;">
                        <p style="color:#1a1a2e;font-weight:700;font-size:18px;margin:0;">Total: ₹${orderDetails.total}</p>
                      </div>
                      <div style="text-align:center;margin:24px 0;">
                        <a href="${process.env.NEXTAUTH_URL}/dashboard/my-learning" style="background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:15px;font-weight:600;display:inline-block;">
                          Start Learning
                        </a>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
}
