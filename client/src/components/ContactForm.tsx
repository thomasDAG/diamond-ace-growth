import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@shared/schema";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

const SERVICE_INTEREST_OPTIONS = [
  "Lead follow-up system",
  "Client onboarding workflow",
  "AI-assisted content workflow",
  "Reporting or visibility dashboard",
  "Internal admin automation",
  "SOP or process documentation",
  "CRM or pipeline setup",
  "Email automation or nurture sequence",
  "Meeting-to-task system",
  "AI prompt library or templates",
  "Reactivation or retention campaign",
  "Review request or referral system",
  "Full AI ops buildout",
  "Not sure yet — need a full audit",
];

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-white placeholder:text-muted-foreground/50 outline-none";
const selectClass =
  "w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-white outline-none appearance-none";
const labelClass = "text-sm font-medium text-foreground/90";
const errorClass = "text-xs text-destructive mt-1";

export function ContactForm() {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      companyName: "",
      websiteUrl: "",
      businessType: "",
      monthlyRevenueRange: "",
      serviceInterests: [],
      biggestBottleneck: "",
      currentTools: "",
      monthlyLeadVolume: "",
      currentAiUsage: "",
      timeline: "",
      budgetRange: "",
      marketingConsent: false,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsPending(true);
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          email: data.email.trim().toLowerCase(),
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Submission failed" }));
        setServerError(err.message || "Submission failed");
        return;
      }

      setIsSuccess(true);
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-3xl p-8 md:p-12 text-center border border-border/30 shadow-2xl flex flex-col items-center justify-center min-h-[400px]"
      >
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-3xl font-display font-bold text-white mb-4">
          Scorecard Submitted
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Thank you for reaching out. I'm reviewing your details and will be in touch soon to map out your biggest workflow leaks and what to fix first.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="bg-card rounded-3xl p-6 md:p-10 border border-border/30 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10 pointer-events-none" />

      <div className="mb-8">
        <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
          Find Your Biggest Workflow Leak
        </h3>
        <p className="text-muted-foreground mb-5">
          Tell us about your business and we'll help identify where manual workflows are costing you time, leads, and clarity.
        </p>
        <ul className="space-y-2">
          {[
            "Where your biggest workflow leaks and time drains are",
            "Which follow-up, onboarding, content, or admin workflows to automate first",
            "A clear starting point for building systems without adding headcount",
          ].map((point) => (
            <li key={point} className="flex items-center gap-2.5 text-sm text-foreground/80">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              {point}
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        {/* Name row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="firstName" className={labelClass}>First Name <span className="text-destructive">*</span></label>
            <input id="firstName" {...form.register("firstName")} className={inputClass} placeholder="Jane" data-testid="input-first-name" />
            {form.formState.errors.firstName && <p className={errorClass}>{form.formState.errors.firstName.message}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className={labelClass}>Last Name <span className="text-destructive">*</span></label>
            <input id="lastName" {...form.register("lastName")} className={inputClass} placeholder="Smith" data-testid="input-last-name" />
            {form.formState.errors.lastName && <p className={errorClass}>{form.formState.errors.lastName.message}</p>}
          </div>
        </div>

        {/* Email + Company */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="email" className={labelClass}>Email <span className="text-destructive">*</span></label>
            <input id="email" {...form.register("email")} type="email" className={inputClass} placeholder="jane@company.com" data-testid="input-email" />
            {form.formState.errors.email && <p className={errorClass}>{form.formState.errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="companyName" className={labelClass}>Company Name <span className="text-destructive">*</span></label>
            <input id="companyName" {...form.register("companyName")} className={inputClass} placeholder="Your Business Name" data-testid="input-company" />
            {form.formState.errors.companyName && <p className={errorClass}>{form.formState.errors.companyName.message}</p>}
          </div>
        </div>

        {/* Website URL */}
        <div className="space-y-2">
          <label htmlFor="websiteUrl" className={labelClass}>Website URL <span className="text-destructive">*</span></label>
          <input id="websiteUrl" {...form.register("websiteUrl")} className={inputClass} placeholder="www.yourwebsite.com" data-testid="input-website-url" />
          {form.formState.errors.websiteUrl && <p className={errorClass}>{form.formState.errors.websiteUrl.message}</p>}
        </div>

        {/* Business Type + Revenue */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="businessType" className={labelClass}>Type of Business <span className="text-destructive">*</span></label>
            <select id="businessType" {...form.register("businessType")} defaultValue="" className={selectClass} data-testid="select-business-type">
              <option value="" disabled>Select your type</option>
              <option value="Service Business">Service Business</option>
              <option value="Ecommerce">Ecommerce</option>
              <option value="SaaS / Software">SaaS / Software</option>
              <option value="Creator / Coach / Consultant">Creator / Coach / Consultant</option>
              <option value="Agency">Agency</option>
              <option value="Local Business">Local Business</option>
              <option value="Other">Other</option>
            </select>
            {form.formState.errors.businessType && <p className={errorClass}>{form.formState.errors.businessType.message}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="monthlyRevenueRange" className={labelClass}>Monthly Revenue Range <span className="text-destructive">*</span></label>
            <select id="monthlyRevenueRange" {...form.register("monthlyRevenueRange")} defaultValue="" className={selectClass} data-testid="select-revenue">
              <option value="" disabled>Select range</option>
              <option value="Pre-revenue / Just starting">Pre-revenue / Just starting</option>
              <option value="Under $10k/month">Under $10k/month</option>
              <option value="$10k–$50k/month">$10k–$50k/month</option>
              <option value="$50k–$100k/month">$50k–$100k/month</option>
              <option value="$100k–$250k/month">$100k–$250k/month</option>
              <option value="$250k+/month">$250k+/month</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
            {form.formState.errors.monthlyRevenueRange && <p className={errorClass}>{form.formState.errors.monthlyRevenueRange.message}</p>}
          </div>
        </div>

        {/* Service Interests */}
        <div className="space-y-3">
          <label className={labelClass}>
            What workflows do you need help with? <span className="text-destructive">*</span> <span className="text-muted-foreground font-normal">(Select all that apply)</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SERVICE_INTEREST_OPTIONS.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-3 bg-background/50 border border-border/50 rounded-lg p-3 cursor-pointer hover:bg-background transition-colors"
              >
                <input
                  type="checkbox"
                  value={option}
                  {...form.register("serviceInterests")}
                  className="w-4 h-4 rounded text-primary focus:ring-primary bg-background border-border shrink-0"
                  data-testid={`checkbox-${option.replace(/[\s/()]/g, "-").toLowerCase()}`}
                />
                <span className="text-sm text-foreground/80">{option}</span>
              </label>
            ))}
          </div>
          {form.formState.errors.serviceInterests && (
            <p className={errorClass}>{form.formState.errors.serviceInterests.message}</p>
          )}
        </div>

        {/* Biggest Bottleneck */}
        <div className="space-y-2">
          <label htmlFor="biggestBottleneck" className={labelClass}>
            What is your biggest workflow bottleneck right now? <span className="text-destructive">*</span>
          </label>
          <textarea
            id="biggestBottleneck"
            {...form.register("biggestBottleneck")}
            rows={4}
            className={`${inputClass} resize-none`}
            placeholder="For example: follow-up is slow or inconsistent, onboarding is manual every time, we do no marketing at all, reports take forever to build, content never gets done, our CRM is a mess, or we're not sure what to fix first…"
            data-testid="textarea-bottleneck"
          />
          {form.formState.errors.biggestBottleneck && (
            <p className={errorClass}>{form.formState.errors.biggestBottleneck.message}</p>
          )}
        </div>

        {/* Optional Section Header */}
        <div className="border-t border-border/30 pt-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Optional — helps us prepare</p>

          <div className="space-y-6">
            {/* Current Tools */}
            <div className="space-y-2">
              <label htmlFor="currentTools" className={labelClass}>Current tools or systems</label>
              <select id="currentTools" {...form.register("currentTools")} defaultValue="" className={selectClass} data-testid="select-current-tools">
                <option value="">Select if applicable</option>
                <option value="HubSpot">HubSpot</option>
                <option value="Klaviyo">Klaviyo</option>
                <option value="Mailchimp">Mailchimp</option>
                <option value="MailerLite">MailerLite</option>
                <option value="GoHighLevel">GoHighLevel</option>
                <option value="Salesforce / SFMC">Salesforce / SFMC</option>
                <option value="Shopify">Shopify</option>
                <option value="WordPress">WordPress</option>
                <option value="Squarespace / Wix">Squarespace / Wix</option>
                <option value="Google Sheets">Google Sheets</option>
                <option value="Multiple / Mixed Stack">Multiple / Mixed Stack</option>
                <option value="Other">Other</option>
                <option value="Not sure / none yet">Not sure / none yet</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Lead Volume */}
              <div className="space-y-2">
                <label htmlFor="monthlyLeadVolume" className={labelClass}>Current monthly lead volume</label>
                <select id="monthlyLeadVolume" {...form.register("monthlyLeadVolume")} defaultValue="" className={selectClass} data-testid="select-lead-volume">
                  <option value="">Select if known</option>
                  <option value="0–10 leads/month">0–10 leads/month</option>
                  <option value="11–50 leads/month">11–50 leads/month</option>
                  <option value="51–100 leads/month">51–100 leads/month</option>
                  <option value="101–500 leads/month">101–500 leads/month</option>
                  <option value="500+ leads/month">500+ leads/month</option>
                  <option value="Not sure">Not sure</option>
                </select>
              </div>

              {/* AI Usage */}
              <div className="space-y-2">
                <label htmlFor="currentAiUsage" className={labelClass}>Current AI usage</label>
                <select id="currentAiUsage" {...form.register("currentAiUsage")} defaultValue="" className={selectClass} data-testid="select-ai-usage">
                  <option value="">Select if applicable</option>
                  <option value="Not using AI yet">Not using AI yet</option>
                  <option value="Using ChatGPT or Claude casually">Using ChatGPT or Claude casually</option>
                  <option value="Using AI for content creation">Using AI for content creation</option>
                  <option value="Using AI for marketing workflows">Using AI for marketing workflows</option>
                  <option value="Using AI inside our CRM or automation tools">Using AI inside our CRM or automation tools</option>
                  <option value="Not sure">Not sure</option>
                </select>
              </div>

              {/* Timeline */}
              <div className="space-y-2">
                <label htmlFor="timeline" className={labelClass}>Timeline</label>
                <select id="timeline" {...form.register("timeline")} defaultValue="" className={selectClass} data-testid="select-timeline">
                  <option value="">Select if known</option>
                  <option value="ASAP">ASAP</option>
                  <option value="Next 2–4 weeks">Next 2–4 weeks</option>
                  <option value="Next 1–3 months">Next 1–3 months</option>
                  <option value="Just researching">Just researching</option>
                </select>
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <label htmlFor="budgetRange" className={labelClass}>Budget range</label>
                <select id="budgetRange" {...form.register("budgetRange")} defaultValue="" className={selectClass} data-testid="select-budget">
                  <option value="">Select if known</option>
                  <option value="Under $1,000">Under $1,000</option>
                  <option value="$1,000–$3,500">$1,000–$3,500</option>
                  <option value="$3,500–$7,500">$3,500–$7,500</option>
                  <option value="$7,500–$15,000">$7,500–$15,000</option>
                  <option value="$15,000+">$15,000+</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Marketing Consent */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...form.register("marketingConsent")}
            className="w-4 h-4 mt-0.5 rounded text-primary focus:ring-primary bg-background border-border shrink-0"
            data-testid="checkbox-marketing-consent"
          />
          <span className="text-sm text-muted-foreground">
            I'd like to receive occasional email tips, strategies, and updates from Diamond Ace Growth. I can unsubscribe at any time.
          </span>
        </label>

        {serverError && <p className="text-sm text-destructive">{serverError}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-4 min-h-[52px] rounded-xl font-bold text-lg bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
          data-testid="button-submit"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            "Start My Free Scorecard"
          )}
        </button>
        <p className="text-center text-xs text-muted-foreground mt-1">
          Takes less than 3 minutes. No sales pitch — just a clear look at what to fix first.
        </p>
        <p className="text-center text-xs text-muted-foreground">
          Your information is secure. We never share your data.
        </p>
      </form>
    </div>
  );
}
