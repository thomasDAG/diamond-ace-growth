import nodemailer from "nodemailer";
import type { Lead } from "@shared/schema";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "thomas@diamondacegrowth.com",
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendAuditConfirmation(lead: Lead): Promise<void> {
  const firstName = lead.firstName?.trim() || "";
  const greeting = firstName ? `Hi ${firstName},` : "Hi there,";

  const text = `${greeting}

Thanks for submitting your ops audit request to Diamond Ace Growth.

I got your request and I will be reviewing your current setup shortly. I will look at your stack, automations, and ops workflows to find what is broken, what is missing, and where the biggest opportunities are.

If it looks like I can help, I will follow up with next steps soon.

Thanks,
Thomas
Diamond Ace Growth`;

  await transporter.sendMail({
    from: '"Thomas @ Diamond Ace Growth" <thomas@diamondacegrowth.com>',
    to: lead.email,
    subject: "Ops Audit Request Received",
    text,
  });
}

export async function sendNewLeadNotification(lead: Lead): Promise<void> {
  const features = Array.isArray(lead.implementedFeatures) && lead.implementedFeatures.length > 0
    ? lead.implementedFeatures.join(", ")
    : "None selected";

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #146ef4;">New Lead: ${lead.firstName} ${lead.lastName}</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; font-weight: bold; color: #666;">Company</td><td style="padding: 8px;">${lead.companyName}</td></tr>
        <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #666;">Email</td><td style="padding: 8px;"><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #666;">Business Type</td><td style="padding: 8px;">${lead.businessType}</td></tr>
        <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #666;">Primary Tool</td><td style="padding: 8px;">${lead.currentPlatform}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #666;">Revenue Range</td><td style="padding: 8px;">${lead.revenueRange}</td></tr>
        <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #666;">Systems In Place</td><td style="padding: 8px;">${features}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #666;">Biggest Ops Gap</td><td style="padding: 8px;">${lead.painPoints}</td></tr>
        <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #666;">Marketing Opt-In</td><td style="padding: 8px;">${lead.marketingOptIn ? "Yes" : "No"}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #666;">Status</td><td style="padding: 8px;">${lead.status}</td></tr>
      </table>
      <p style="margin-top: 24px; color: #888; font-size: 13px;">Submitted via diamondacegrowth.com</p>
    </div>
  `;

  await transporter.sendMail({
    from: '"Diamond Ace Growth" <thomas@diamondacegrowth.com>',
    to: "thomas@diamondacegrowth.com",
    replyTo: lead.email,
    subject: `New Lead: ${lead.firstName} ${lead.lastName}, ${lead.companyName}`,
    html,
  });
}
