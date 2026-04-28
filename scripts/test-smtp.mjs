import nodemailer from "nodemailer";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Parse .env.local manually
const envPath = resolve(__dirname, "../.env.local");
const envFile = readFileSync(envPath, "utf8");
const env = {};
for (const line of envFile.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const idx = trimmed.indexOf("=");
  if (idx === -1) continue;
  const key = trimmed.slice(0, idx).trim();
  const val = trimmed.slice(idx + 1).trim().replace(/^"|"$/g, "");
  env[key] = val;
}

console.log("\n--- SMTP Config ---");
console.log("HOST  :", env.SMTP_HOST);
console.log("PORT  :", env.SMTP_PORT);
console.log("SECURE:", env.SMTP_SECURE);
console.log("USER  :", env.SMTP_USER);
console.log("PASS  :", env.SMTP_PASS ? (env.SMTP_PASS.includes("YOUR_REAL") ? "❌ STILL PLACEHOLDER" : "✅ SET") : "❌ MISSING");
console.log("FROM  :", env.SMTP_FROM);
console.log("-------------------\n");

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT) || 587,
  secure: env.SMTP_SECURE === "true",
  ...(env.SMTP_USER ? { auth: { user: env.SMTP_USER, pass: env.SMTP_PASS } } : {}),
  tls: { rejectUnauthorized: false },
});

console.log("Testing SMTP connection...");
try {
  await transporter.verify();
  console.log("✅ SMTP connection successful! Server is ready to send emails.");
} catch (err) {
  console.error("❌ SMTP connection failed:");
  console.error("   Code   :", err.code);
  console.error("   Message:", err.message);
  if (err.response) console.error("   Response:", err.response);
  process.exit(1);
}

console.log("\nSending test email to prudhvirajking7@gmail.com ...");
try {
  const info = await transporter.sendMail({
    from: env.SMTP_FROM || `TechProwexa <${env.SMTP_USER}>`,
    to: "prudhvirajking7@gmail.com",
    subject: "TechProwexa SMTP Test",
    text: "If you receive this, the Hostinger SMTP config is working correctly.",
  });
  console.log("✅ Email sent! Message ID:", info.messageId);
} catch (err) {
  console.error("❌ Send failed:");
  console.error("   Code   :", err.code);
  console.error("   Message:", err.message);
  if (err.response) console.error("   Response:", err.response);
}
