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

Thanks for submitting your AI Workflow Leak Scorecard request to Diamond Ace Growth.

I received your submission and will take a look at where your business may be losing time, leads, or clarity through messy manual workflows.

I'll review things like your follow-up process, client onboarding, content workflows, reporting, internal admin, current tools, and AI workflow opportunities so I can identify the biggest places systems could help.

If it looks like I can help, I'll follow up with a few practical next steps.

Thanks,
Thomas
Diamond Ace Growth`;

  await transporter.sendMail({
    from: '"Thomas @ Diamond Ace Growth" <thomas@diamondacegrowth.com>',
    to: lead.email,
    subject: "Your AI Workflow Leak Scorecard request",
    text,
  });
}

export async function sendContactMessage(name: string, email: string, message: string): Promise<void> {
  const safeMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #146ef4;">New Contact Message</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; font-weight: bold; color: #666;">Name</td><td style="padding: 8px;">${name}</td></tr>
        <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #666;">Email</td><td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #666; vertical-align: top;">Message</td><td style="padding: 8px; white-space: pre-wrap;">${safeMessage}</td></tr>
      </table>
      <p style="margin-top: 24px; color: #888; font-size: 13px;">Submitted via diamondacegrowth.com</p>
    </div>
  `;

  await transporter.sendMail({
    from: '"Diamond Ace Growth" <thomas@diamondacegrowth.com>',
    to: "thomas@diamondacegrowth.com",
    replyTo: email,
    subject: `New Message from ${name}`,
    html,
  });
}

export async function sendNewLeadNotification(lead: Lead): Promise<void> {
  const serviceInterests = Array.isArray(lead.implementedFeatures) && lead.implementedFeatures.length > 0
    ? lead.implementedFeatures.join(", ")
    : "None selected";

  const esc = (v: string | null | undefined) => (v ?? "—").toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const row = (label: string, value: string | null | undefined, shade: boolean) => {
    const bg = shade ? "background: #f9f9f9;" : "";
    return `<tr style="${bg}"><td style="padding: 8px; font-weight: bold; color: #666; white-space: nowrap;">${label}</td><td style="padding: 8px;">${esc(value)}</td></tr>`;
  };
  const rawRow = (label: string, html: string, shade: boolean) => {
    const bg = shade ? "background: #f9f9f9;" : "";
    return `<tr style="${bg}"><td style="padding: 8px; font-weight: bold; color: #666; white-space: nowrap;">${label}</td><td style="padding: 8px;">${html}</td></tr>`;
  };

  const html = `
    <div style="font-family: sans-serif; max-width: 640px; margin: 0 auto;">
      <h2 style="color: #146ef4; margin-bottom: 4px;">New Lead: ${lead.firstName} ${lead.lastName}</h2>
      <p style="color: #888; font-size: 13px; margin-top: 0;">AI Workflow Leak Scorecard submitted via diamondacegrowth.com</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        ${rawRow("Email", `<a href="mailto:${esc(lead.email)}">${esc(lead.email)}</a>`, false)}
        ${row("Company", lead.companyName, true)}
        ${row("Website", lead.websiteUrl, false)}
        ${row("Business Type", lead.businessType, true)}
        ${row("Revenue Range", lead.revenueRange, false)}
        ${row("Monthly Lead Volume", lead.monthlyLeadVolume, true)}
        ${row("Current AI Usage", lead.currentAiUsage, false)}
        ${row("Timeline", lead.timeline, true)}
        ${row("Budget Range", lead.budgetRange, false)}
        ${row("Primary Tool / Stack", lead.currentPlatform, true)}
        ${row("What They Need Help With", serviceInterests, false)}
        ${row("Marketing Bottleneck", lead.painPoints, true)}
        ${row("Offer Requested", lead.offerRequested, false)}
        ${row("Marketing Opt-In", lead.marketingOptIn ? "Yes" : "No", true)}
        ${row("Status", lead.status, false)}
      </table>
      <p style="margin-top: 24px; color: #888; font-size: 13px;">Reply to this email to reach ${lead.firstName} directly.</p>
    </div>
  `;

  await transporter.sendMail({
    from: '"Diamond Ace Growth" <thomas@diamondacegrowth.com>',
    to: "thomas@diamondacegrowth.com",
    replyTo: lead.email,
    subject: `New AI Ops Lead: ${lead.firstName} ${lead.lastName} — ${lead.companyName}`,
    html,
  });
}
