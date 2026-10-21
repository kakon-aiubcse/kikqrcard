// lib/mailer.js
// Gmail SMTP (app password) mailer used to deliver new card orders to the owner.
import nodemailer from "nodemailer";

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

let transporter = null;

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    throw new Error("Mailer is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD.");
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass: pass.replace(/\s+/g, "") }, // app passwords are shown with spaces
    });
  }
  return transporter;
}

export async function sendOrderEmail(order) {
  const user = process.env.GMAIL_USER;
  const to = process.env.ORDER_NOTIFY_EMAIL || user;

  const rows = [
    ["Invoice", order.invoiceNumber],
    ["Customer account", order.email],
    ["Recipient name", order.name],
    ["Phone", order.phone],
    ["Address", order.address],
    ["City", order.city],
    ["Delivery zone", order.insideDhaka ? "Inside Dhaka" : "Outside Dhaka"],
    ["Order type", order.isFirstOrder ? "First order (free)" : "Paid order"],
    ["Card price", `${order.cardPrice} ${order.currency}`],
    ["Delivery charge", `${order.deliveryCharge} ${order.currency}`],
    ["VAT", `${order.vat} ${order.currency}`],
    ["Total due", `${order.total} ${order.currency}`],
    ["Placed at", new Date(order.createdAt).toLocaleString("en-GB", { timeZone: "Asia/Dhaka" })],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px">
      <h2 style="margin:0 0 12px">New card order</h2>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:6px 10px;border:1px solid #ddd;background:#f7f7f7;font-weight:bold">${escapeHtml(label)}</td><td style="padding:6px 10px;border:1px solid #ddd">${escapeHtml(value)}</td></tr>`,
          )
          .join("")}
      </table>
    </div>`;

  await getTransporter().sendMail({
    from: `"KIK QR Card" <${user}>`,
    to,
    replyTo: order.email,
    subject: `New card order ${order.invoiceNumber} - ${order.name}`,
    text,
    html,
  });
}
