import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { mailFrom } from "@/lib/email";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const jobTitle = formData.get("jobTitle") as string;
    const coverLetter = formData.get("coverLetter") as string;
    const resumeFile = formData.get("resume") as File | null;

    if (!name || !email || !jobTitle) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    type MailAttachment = { filename: string; content: Buffer };
    let attachments: MailAttachment[] = [];
    if (resumeFile) {
      const arrayBuffer = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      attachments = [
        {
          filename: resumeFile.name,
          content: buffer,
        },
      ];
    }

    await transporter.sendMail({
      from: mailFrom,
      to: process.env.CAREERS_EMAIL || process.env.SMTP_USER,
      subject: `New Job Application: ${jobTitle} — ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"></head>
          <body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                    <tr>
                      <td style="background:linear-gradient(135deg,#f59e0b,#d97706);padding:40px;text-align:center;">
                        <h1 style="color:#fff;margin:0;font-size:24px;font-weight:700;">New Job Application</h1>
                        <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:15px;">${jobTitle}</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:40px;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding-bottom:16px;">
                              <p style="margin:0 0 4px;color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Applicant Name</p>
                              <p style="margin:0;color:#111827;font-size:16px;font-weight:600;">${name}</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding-bottom:16px;">
                              <p style="margin:0 0 4px;color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Email</p>
                              <p style="margin:0;color:#111827;font-size:16px;"><a href="mailto:${email}" style="color:#d97706;">${email}</a></p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding-bottom:16px;">
                              <p style="margin:0 0 4px;color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Phone</p>
                              <p style="margin:0;color:#111827;font-size:16px;">${phone || "Not provided"}</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding-bottom:16px;">
                              <p style="margin:0 0 4px;color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Position Applied For</p>
                              <p style="margin:0;color:#111827;font-size:16px;font-weight:600;">${jobTitle}</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding-bottom:0;">
                              <p style="margin:0 0 8px;color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Cover Letter</p>
                              <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:20px;">
                                <p style="margin:0;color:#374151;font-size:14px;line-height:1.7;white-space:pre-wrap;">${coverLetter || "No cover letter provided."}</p>
                              </div>
                            </td>
                          </tr>
                        </table>
                        ${resumeFile ? `<p style="margin:24px 0 0;color:#6b7280;font-size:13px;">Resume attached: <strong>${resumeFile.name}</strong></p>` : ""}
                      </td>
                    </tr>
                    <tr>
                      <td style="background:#f9fafb;padding:24px;text-align:center;border-top:1px solid #e5e7eb;">
                        <p style="color:#9ca3af;font-size:12px;margin:0;">TechProwexa Careers — Received ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Career application email error:", err);
    return NextResponse.json({ error: "Failed to send application" }, { status: 500 });
  }
}
