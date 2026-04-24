import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@shared/schema";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

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
      businessType: undefined as any,
      currentPlatform: undefined as any,
      revenueRange: undefined as any,
      implementedFeatures: [],
      painPoints: "",
      marketingOptIn: false,
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
        const err = await res
          .json()
          .catch(() => ({ message: "Submission failed" }));
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

  const systemOptions = [
    "CRM (any kind)",
    "Marketing Automation",
    "Email Sequences or Flows",
    "Lead Capture Forms",
    "Pipeline Tracking",
    "Analytics or Reporting Setup",
    "Paid Ads Running",
    "None / Starting from scratch",
  ];

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
          Audit Request Received
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Thank you for reaching out. I am reviewing your details and will be in touch soon to schedule your free audit.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="bg-card rounded-3xl p-6 md:p-10 border border-border/30 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10 pointer-events-none" />

      <div className="mb-8">
        <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
          Get Your Free Ops Audit
        </h3>
        <p className="text-muted-foreground mb-5">
          I'll review your current marketing ops setup and show you exactly where the gaps are and how to fix them.
        </p>
        <ul className="space-y-2">
          {[
            "Where your biggest ops gaps and bottlenecks are",
            "Which tools and automations are working against you",
            "A clear starting point for building your ops infrastructure",
          ].map((point) => (
            <li key={point} className="flex items-center gap-2.5 text-sm text-foreground/80">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              {point}
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/90">First Name</label>
            <input
              {...form.register("firstName")}
              className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-white placeholder:text-muted-foreground/50 outline-none"
              placeholder="John"
              data-testid="input-first-name"
            />
            {form.formState.errors.firstName && (
              <p className="text-xs text-destructive mt-1">{form.formState.errors.firstName.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/90">Last Name</label>
            <input
              {...form.register("lastName")}
              className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-white placeholder:text-muted-foreground/50 outline-none"
              placeholder="Doe"
              data-testid="input-last-name"
            />
            {form.formState.errors.lastName && (
              <p className="text-xs text-destructive mt-1">{form.formState.errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/90">Email</label>
            <input
              {...form.register("email")}
              type="email"
              className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-white placeholder:text-muted-foreground/50 outline-none"
              placeholder="john@company.com"
              data-testid="input-email"
            />
            {form.formState.errors.email && (
              <p className="text-xs text-destructive mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/90">Company Name</label>
            <input
              {...form.register("companyName")}
              className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-white placeholder:text-muted-foreground/50 outline-none"
              placeholder="Your Business Name"
              data-testid="input-company"
            />
            {form.formState.errors.companyName && (
              <p className="text-xs text-destructive mt-1">{form.formState.errors.companyName.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/90">What type of business do you run?</label>
            <select
              {...form.register("businessType")}
              defaultValue=""
              className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-white outline-none appearance-none"
              data-testid="select-business-type"
            >
              <option value="" disabled>Select your answer</option>
              <option value="SaaS / Software">SaaS / Software</option>
              <option value="Ecommerce">Ecommerce</option>
              <option value="Agency or Consulting">Agency or Consulting</option>
              <option value="Health and Wellness">Health and Wellness</option>
              <option value="Professional Services">Professional Services</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Home Services">Home Services</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/90">What is your primary marketing or CRM tool?</label>
            <select
              {...form.register("currentPlatform")}
              defaultValue=""
              className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-white outline-none appearance-none"
              data-testid="select-platform"
            >
              <option value="" disabled>Select your answer</option>
              <option value="None / Manual">None / Manual</option>
              <option value="GoHighLevel">GoHighLevel</option>
              <option value="HubSpot">HubSpot</option>
              <option value="Salesforce">Salesforce</option>
              <option value="ActiveCampaign">ActiveCampaign</option>
              <option value="Klaviyo">Klaviyo</option>
              <option value="Mailchimp">Mailchimp</option>
              <option value="Pipedrive">Pipedrive</option>
              <option value="Zoho">Zoho</option>
              <option value="Multiple / Mixed Stack">Multiple / Mixed Stack</option>
              <option value="Not Sure">Not Sure</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/90">Approx. Monthly Revenue</label>
            <select
              {...form.register("revenueRange")}
              defaultValue=""
              className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-white outline-none appearance-none"
              data-testid="select-revenue"
            >
              <option value="" disabled>Select one</option>
              <option value="Under $10k">Under $10k</option>
              <option value="$10k-$25k">$10k-$25k</option>
              <option value="$25k-$50k">$25k-$50k</option>
              <option value="$50k-$100k">$50k-$100k</option>
              <option value="$100k-$250k">$100k-$250k</option>
              <option value="$250k+">$250k+</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground/90">
            Which of these does your business currently have? (Select all that apply)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {systemOptions.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-3 bg-background/50 border border-border/50 rounded-lg p-3 cursor-pointer hover:bg-background transition-colors"
              >
                <input
                  type="checkbox"
                  value={option}
                  {...form.register("implementedFeatures")}
                  className="w-4 h-4 rounded text-primary focus:ring-primary bg-background border-border shrink-0"
                  data-testid={`checkbox-${option.replace(/[\s/()]/g, "-").toLowerCase()}`}
                />
                <span className="text-sm text-foreground/80">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/90">
            What is the biggest gap or bottleneck in your marketing ops right now?
          </label>
          <textarea
            {...form.register("painPoints")}
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-white placeholder:text-muted-foreground/50 outline-none resize-none"
            placeholder="For example: our CRM is a mess, automations are broken, our tools do not connect, or we have no real system at all..."
            data-testid="textarea-pain-points"
          />
          {form.formState.errors.painPoints && (
            <p className="text-xs text-destructive mt-1">{form.formState.errors.painPoints.message}</p>
          )}
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...form.register("marketingOptIn")}
            className="w-4 h-4 mt-0.5 rounded text-primary focus:ring-primary bg-background border-border shrink-0"
            data-testid="checkbox-marketing-opt-in"
          />
          <span className="text-sm text-muted-foreground">
            I'd like to receive occasional email tips, strategies, and updates from Diamond Ace Growth. I can unsubscribe at any time.
          </span>
        </label>

        {serverError && (
          <p className="text-sm text-destructive">{serverError}</p>
        )}

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
            "Get My Free Ops Audit"
          )}
        </button>
        <p className="text-center text-xs text-muted-foreground mt-1">
          Takes less than 2 minutes. No pressure. Just clarity.
        </p>
        <p className="text-center text-xs text-muted-foreground">
          Your information is secure. We never share your data.
        </p>
      </form>
    </div>
  );
}
