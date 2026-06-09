import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { ContactForm } from "@/components/ContactForm";
import { Helmet } from "react-helmet-async";
import { ArrowRight, XCircle, ChevronLeft, ChevronRight, Check } from "lucide-react";
import operatorPhoto from "@assets/Untitled_design_(7)_1781043710432.png";
import logoWhite from "@assets/White_L&N_PNG_1771891683420.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const MARQUEE_SERVICES = [
  "Sales Funnel Builds",
  "Email Campaigns",
  "Marketing Automations",
  "AI-Enhanced Workflows",
  "Lead Capture Systems",
  "Follow-Up Sequences",
  "Landing Pages",
  "CRM and Pipeline Setup",
  "Nurture Campaigns",
  "Reactivation Campaigns",
  "Campaign Strategy",
  "Content Repurposing Systems",
  "Lead Intake Forms",
  "Reporting and Analytics",
];

const SERVICE_CARDS = [
  {
    emoji: "🎯",
    title: "Sales Funnel Builds",
    desc: "Landing pages, lead magnets, offer pages, forms, booking flows, and funnel paths that help turn attention into leads and sales.",
  },
  {
    emoji: "📧",
    title: "Email Campaigns and Automations",
    desc: "Welcome flows, nurture sequences, launch campaigns, reactivation campaigns, retention emails, newsletters, and automated follow-up.",
  },
  {
    emoji: "⚙️",
    title: "CRM and Lead Intake Systems",
    desc: "CRM setup, pipeline cleanup, lead routing, forms, tagging, automations, reporting, and the backend structure that keeps leads from falling through the cracks.",
  },
  {
    emoji: "🤖",
    title: "AI-Enhanced Marketing Workflows",
    desc: "Practical AI workflows for campaign planning, content repurposing, email drafts, customer research, lead follow-up support, reporting summaries, and internal marketing efficiency.",
  },
  {
    emoji: "📣",
    title: "Campaign Support",
    desc: "Campaign planning, copywriting, launch support, email/social coordination, and promotional strategy that moves people into your funnel.",
  },
];

const OFFERS = [
  {
    name: "Free Marketing Engine Audit",
    price: "Free",
    desc: "A quick diagnostic to identify where your marketing is leaking leads, missing follow-up, underusing AI, or leaving revenue on the table.",
    annualCallout: null,
    cta: "Get Your Free Audit",
    href: "#contact",
    featured: true,
  },
  {
    name: "Marketing Engine Blueprint",
    price: "Starting at $497",
    desc: "A deeper strategy session and roadmap that reviews your funnel, website, email follow-up, CRM, campaign path, AI workflow opportunities, and biggest growth gaps.",
    annualCallout: null,
    cta: "Book a Blueprint",
    href: "#contact",
    featured: false,
  },
  {
    name: "Funnel & Follow-Up Sprint",
    price: "Starting at $3,500",
    desc: "A done-for-you build that includes a landing page, lead capture form, email sequence, CRM setup, automations, and launch support. Scoped tightly and delivered in 3–4 weeks.",
    annualCallout: null,
    cta: "Start a Sprint",
    href: "#contact",
    featured: false,
  },
  {
    name: "Marketing Engine Management",
    price: "Starting at $2,500/month",
    desc: "Ongoing monthly support for email campaigns, funnel optimization, automations, reporting, campaign planning, and system improvements.",
    annualCallout: null,
    badgeText: "$30K/year",
    badgeContext: "A fraction of what a full-time marketing hire costs.",
    cta: "Explore Monthly Support",
    href: "#contact",
    featured: false,
  },
  {
    name: "Growth Systems Partner",
    price: "Starting at $6,000/month",
    desc: "A limited, embedded partnership for businesses that need deeper marketing systems support — strategy, builds, campaigns, automations, and practical AI implementation — without hiring full-time. Limited availability.",
    annualCallout: null,
    badgeText: "$72K/year",
    badgeContext: "Less than a senior full-time hire — no benefits, taxes, or onboarding.",
    cta: "Talk Through Fit",
    href: "#contact",
    featured: false,
  },
];

const ENGINE_STEPS = [
  { icon: "📡", label: "Attention / Traffic", desc: "People hear about your business through referrals, content, campaigns, search, or ads." },
  { icon: "🖥️", label: "Landing Page", desc: "They land on a page with one clear message and one clear next step." },
  { icon: "📋", label: "Lead Capture", desc: "They fill out a form, request a resource, book a call, or start the buying process." },
  { icon: "📧", label: "Email Follow-Up", desc: "Automated emails nurture, educate, remind, and move them forward." },
  { icon: "💰", label: "Booking or Sale", desc: "The system pushes qualified leads toward the right conversion." },
  { icon: "🔄", label: "Retention", desc: "Follow-up campaigns keep customers engaged and coming back." },
];

const TESTIMONIALS = [
  {
    stat: "Expert Guidance",
    metric: "Start to Launch",
    quote: "Thomas is a pro. We needed some help getting a new email marketing campaign going for a client and Thomas stepped in to help with everything we needed. He showed deep expertise and guided our team through setup and launch. Great work and would definitely recommend him.",
    author: "Jordan, Founder & Partner"
  },
  {
    stat: "Ownership",
    metric: "Mentality",
    quote: "I loved working with Thomas. He took on the project as if it was his own, was enthusiastic, and very flexible. The work spoke for itself! His contributions were critical to the success of the project and we couldn't have done it without him. I would absolutely recommend Thomas and would love to work with him again.",
    author: "Hailey, Director of Content Strategy"
  },
  {
    stat: "Thousands",
    metric: "Revenue Generated",
    quote: "Thomas is a marketing professional who is not afraid to jump in and make a positive difference right from the start. He concepted, wrote copy, and deployed an email welcome flow that currently has a 75% open rate, a 10% click rate and has generated thousands in sales during the 3 months it has been active.",
    author: "Mary, Marketing & Branding Strategist"
  },
  {
    stat: "High Impact",
    metric: "Strategic Execution",
    quote: "Thomas is exceptionally easy to work with and demonstrates a remarkable ability to learn quickly, even within a niche market. His ability to combine technical execution with compelling copy that grabs attention sets him apart. His work consistently reflects clarity, strategic thinking, and creativity.",
    author: "Heather, Marketing Specialist"
  },
];

function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const go = useCallback((next: number) => {
    setDirection(next > index || (next === 0 && index === TESTIMONIALS.length - 1) ? 1 : -1);
    setIndex(next);
  }, [index]);

  const prev = () => go((index - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => go((index + 1) % TESTIMONIALS.length);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setDirection(1);
      setIndex(i => (i + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(t);
  }, [paused]);

  const testimonial = TESTIMONIALS[index];

  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true }}
      variants={fadeInUp}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-background border border-border/50 p-5 md:p-12 rounded-2xl md:rounded-3xl"
          >
            <div className="mb-4 md:mb-6">
              <div className="text-3xl md:text-5xl font-display font-bold text-primary mb-1">
                {testimonial.stat}
              </div>
              <div className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {testimonial.metric}
              </div>
            </div>
            <p className="text-foreground/90 italic mb-4 md:mb-6 leading-relaxed text-sm md:text-lg">
              "{testimonial.quote}"
            </p>
            <div className="text-sm font-bold text-white/70">
              {testimonial.author}
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-5 w-9 h-9 md:w-10 md:h-10 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-white hover:border-primary/50 transition-all"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-5 w-9 h-9 md:w-10 md:h-10 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-white hover:border-primary/50 transition-all"
          aria-label="Next testimonial"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-6 md:mt-8">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === index ? "bg-primary w-6" : "bg-border hover:bg-muted-foreground"
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

function SimpleContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsPending(true);
    try {
      const res = await fetch("/api/contact-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), message: message.trim() }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Something went wrong." }));
        setError(err.message || "Something went wrong.");
        return;
      }
      setIsSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-10">
        <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-display font-bold text-white mb-2">Message Sent</h3>
        <p className="text-muted-foreground text-sm">Thanks for reaching out. I'll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80">Name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full px-3 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-white placeholder:text-muted-foreground/50 outline-none text-sm"
            placeholder="Your name"
            data-testid="input-contact-name"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-3 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-white placeholder:text-muted-foreground/50 outline-none text-sm"
            placeholder="you@company.com"
            data-testid="input-contact-email"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground/80">Message</label>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          required
          rows={4}
          className="w-full px-3 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-white placeholder:text-muted-foreground/50 outline-none resize-none text-sm"
          placeholder="What's on your mind?"
          data-testid="textarea-contact-message"
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3.5 min-h-[48px] rounded-xl font-semibold text-sm bg-card border border-border/60 text-white hover:border-primary/50 hover:bg-primary/10 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
        data-testid="button-contact-submit"
      >
        {isPending ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Sending...
          </>
        ) : "Send Message"}
      </button>
    </form>
  );
}

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Diamond Ace Growth | Sales Funnels, Email Campaigns, Automations &amp; AI Workflows</title>
        <meta name="description" content="Diamond Ace Growth builds sales funnels, email campaigns, automations, and practical AI workflows that help businesses capture leads, follow up fast, and turn more people into paying customers." />
        <meta property="og:title" content="Turn More Leads Into Customers | Diamond Ace Growth" />
        <meta property="og:description" content="We build sales funnels, email campaigns, automations, CRM systems, and practical AI workflows for growing businesses." />
        <meta property="og:image" content="https://diamondacegrowth.com/newlinkpreview.png?v=4" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://diamondacegrowth.com" />
        <meta property="og:site_name" content="Diamond Ace Growth" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Turn More Leads Into Customers | Diamond Ace Growth" />
        <meta name="twitter:description" content="Sales funnels, email campaigns, automations, and AI workflows for growing businesses." />
        <meta name="twitter:image" content="https://diamondacegrowth.com/newlinkpreview.png?v=4" />
        <link rel="canonical" href="https://diamondacegrowth.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap" rel="stylesheet" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Diamond Ace Growth",
            "description": "Sales funnels, email campaigns, automations, and AI-enhanced marketing workflows for growing businesses.",
            "url": "https://diamondacegrowth.com",
            "areaServed": "United States",
            "serviceType": ["Sales Funnel Builds", "Email Marketing", "Marketing Automation", "CRM Setup", "AI Marketing Workflows"]
          }
        `}</script>
      </Helmet>
      <Navbar />

      <main>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="hero-section relative pt-24 pb-12 md:pt-48 md:pb-32 overflow-hidden">
        <div className="hero-gradient-glow" aria-hidden="true" />
        <div className="hero-vignette" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="inline-block mb-5 px-3 py-1.5 rounded-full bg-card border border-border/50 text-xs md:text-sm font-medium text-accent">
              Funnels&nbsp;•&nbsp;Email&nbsp;•&nbsp;Automation&nbsp;•&nbsp;AI Workflows
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-extrabold text-white leading-[1.1] mb-5 md:mb-6">
              Stop Manual Marketing.<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Build a Real System.</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-base md:text-xl text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-2">
              Diamond Ace Growth builds sales funnels, email campaigns, automations, and practical AI workflows that help businesses capture leads, follow up fast, and convert more people into paying customers.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col items-center justify-center gap-3">
              <a
                href="#contact"
                className="cta-hero px-6 md:px-8 py-4 min-h-[52px] rounded-xl bg-primary text-white font-bold text-base md:text-lg hover:-translate-y-1 transition-all duration-200 flex items-center group w-full sm:w-auto justify-center"
                data-testid="link-hero-cta"
              >
                Get Your Free Marketing Engine Audit
                <ArrowRight className="ml-2 w-5 h-5 cta-arrow" />
              </a>
              <p className="text-xs md:text-sm text-muted-foreground">
                See what's missing, what's leaking, and what to fix first.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-12 md:mt-20 pt-8 md:pt-10 border-t border-border/30 overflow-hidden relative marquee-container">
              <div className="flex whitespace-nowrap gap-10 md:gap-16 animate-marquee">
                {[0, 1].map((copy) =>
                  MARQUEE_SERVICES.map((service, i) => (
                    <span
                      key={`${copy}-${i}`}
                      className="marquee-item relative shrink-0 text-sm md:text-lg font-display font-medium text-white/70 flex items-center cursor-default"
                    >
                      {service} <span className="ml-6 md:ml-8 text-primary">•</span>
                    </span>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── PROBLEM ──────────────────────────────────────────────────────── */}
      <section id="problem" className="py-12 md:py-24 bg-card/30 border-y border-border/20">
        <div className="max-w-7xl mx-auto px-5">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4 md:mb-6">
                Your marketing has pieces.
                <span className="block"><span className="text-highlight">Now it needs a system.</span></span>
              </h2>
              <p className="text-sm md:text-lg text-muted-foreground mb-6">
                Most businesses are doing some marketing. They have a website, a few campaigns, maybe some social content, referrals, forms, emails, or a CRM. But if those pieces are not connected, leads slip through the cracks and revenue gets left on the table.
              </p>

              <div className="space-y-3 md:space-y-4">
                {[
                  "Leads come in, but follow-up is slow or inconsistent",
                  "Your website is not built to capture and convert interest",
                  "Email campaigns are random, outdated, or nonexistent",
                  "Your CRM, forms, and automations do not work together",
                  "Your team is doing too much repetitive marketing work manually",
                  "AI tools are available, but no one knows how to use them in a practical workflow",
                  "You know marketing should be working better, but the system is not clear",
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mr-3 mt-0.5" />
                    <span className="text-sm md:text-base text-foreground/90">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-card border border-border p-5 md:p-8 rounded-2xl md:rounded-3xl relative mt-2 lg:mt-0">
              <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-6">
                HOW WE FIX IT
              </div>
              <h3 className="text-lg md:text-2xl font-display font-bold text-white mb-4 md:mb-6">The Marketing Engine We Build</h3>
              <div className="space-y-4 md:space-y-6">
                {[
                  { emoji: "🎯", title: "Sales Funnel Builds", desc: "We build landing pages, lead magnets, forms, and booking paths that turn interest into action." },
                  { emoji: "📧", title: "Email Campaigns and Automations", desc: "We write, build, and launch email sequences that welcome, nurture, reactivate, and convert." },
                  { emoji: "⚙️", title: "CRM and Lead Intake Systems", desc: "We connect forms, pipelines, tagging, lead routing, and follow-up so every lead has a clear next step." },
                  { emoji: "🤖", title: "AI-Enhanced Workflows", desc: "We help you use AI for campaign planning, content repurposing, customer insights, follow-up support, and repetitive marketing tasks." },
                  { emoji: "📣", title: "Campaign Support", desc: "We help plan and execute campaigns that drive people into your funnel and keep your business top of mind." },
                  { emoji: "📊", title: "Reporting and Optimization", desc: "We track what is working, find the leaks, and keep improving the system over time." },
                ].map((item, i) => (
                  <div key={i} className="flex">
                    <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shrink-0 mr-3 text-xl md:text-2xl leading-none">
                      {item.emoji}
                    </div>
                    <div>
                      <h4 className="text-sm md:text-base font-bold text-white mb-0.5">{item.title}</h4>
                      <p className="text-xs md:text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section id="services" className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-5">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-10 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3 md:mb-6">
              What We Build For You
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground">
              Clear, practical marketing systems that help you attract leads, follow up, use AI wisely, and convert more customers.
            </p>
          </motion.div>

          <div className="space-y-5 md:space-y-8">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
            >
              {SERVICE_CARDS.slice(0, 3).map((service, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="bg-card/50 hover:bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 p-5 md:p-8 rounded-2xl md:rounded-3xl group"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-background flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner text-2xl md:text-3xl">
                    {service.emoji}
                  </div>
                  <h3 className="text-base md:text-xl font-bold text-white mb-2 md:mb-3">{service.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:w-2/3 lg:mx-auto"
            >
              {SERVICE_CARDS.slice(3).map((service, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="bg-card/50 hover:bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 p-5 md:p-8 rounded-2xl md:rounded-3xl group"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-background flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner text-2xl md:text-3xl">
                    {service.emoji}
                  </div>
                  <h3 className="text-base md:text-xl font-bold text-white mb-2 md:mb-3">{service.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── OFFERS ───────────────────────────────────────────────────────── */}
      <section id="offers" className="py-12 md:py-24 bg-card/20 border-y border-border/20">
        <div className="max-w-7xl mx-auto px-5">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-10 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3 md:mb-6">
              How to Work With Us
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground">
              Transparent pricing, no pressure. Start with what you need.
            </p>
          </motion.div>

          <div className="space-y-4 md:space-y-8">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
            >
              {OFFERS.slice(0, 3).map((offer, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className={`relative flex flex-col p-5 md:p-8 rounded-2xl md:rounded-3xl border transition-all duration-300 ${
                    offer.featured
                      ? "bg-primary/10 border-primary/60 hover:border-primary shadow-lg shadow-primary/10"
                      : "bg-card/50 hover:bg-card border-border/50 hover:border-primary/50"
                  }`}
                >
                  {offer.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                      START HERE
                    </div>
                  )}
                  <div className="mb-3 md:mb-4">
                    <h3 className="text-base md:text-xl font-bold text-white mb-1 md:mb-2">{offer.name}</h3>
                    <div className={`text-xl md:text-2xl font-display font-extrabold ${offer.featured ? "text-primary" : "text-white"}`}>
                      {offer.price}
                    </div>
                  </div>
                  <div className="flex-1 mb-4 md:mb-6">
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{offer.desc}</p>
                    {offer.annualCallout && (
                      <p className="text-xs text-muted-foreground/60 leading-relaxed mt-2 italic">{offer.annualCallout}</p>
                    )}
                  </div>
                  <a
                    href={offer.href}
                    className={`w-full py-3 min-h-[44px] rounded-xl font-semibold text-center text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                      offer.featured
                        ? "bg-primary text-white hover:bg-primary/90"
                        : "bg-background border border-border/60 text-white hover:border-primary/50 hover:bg-primary/10"
                    }`}
                  >
                    {offer.cta} <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              ))}
            </motion.div>

            {/* Retainer cards + handwritten margin annotations — 3-col grid at lg+ */}
            <div className="lg:grid lg:items-center" style={{ gridTemplateColumns: '144px 1fr 160px', gap: '0 1.5rem' }}>

              {/* ── Management annotation — left col, lg+ only ── */}
              <div className="hidden lg:flex flex-col items-center pointer-events-none select-none" style={{ transform: 'rotate(-9deg)' }}>
                <p style={{ fontFamily: "'Caveat', cursive", color: '#146ef4', fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.35, textAlign: 'center', margin: 0 }}>
                  $30K/year<br />way less than a<br />full-time hire!
                </p>
                <svg width="96" height="60" viewBox="0 0 96 60" fill="none" overflow="visible" style={{ display: 'block', marginTop: '6px', marginLeft: 'auto', marginRight: '4px' }}>
                  <path d="M 10,5 C 28,5 65,18 88,50" stroke="#146ef4" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                  <path d="M 81,44 L 88,50 L 82,57" stroke="#146ef4" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* ── Cards grid — center col ── */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
              >
                {OFFERS.slice(3).map((offer, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="flex flex-col p-5 md:p-8 rounded-2xl md:rounded-3xl border bg-card/50 hover:bg-card border-border/50 hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="mb-3 md:mb-4">
                      <h3 className="text-base md:text-xl font-bold text-white mb-1 md:mb-2">{offer.name}</h3>
                      <div className="text-xl md:text-2xl font-display font-extrabold text-white">{offer.price}</div>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed flex-1 mb-4 md:mb-6">{offer.desc}</p>
                    <a
                      href={offer.href}
                      className="w-full py-3 min-h-[44px] rounded-xl font-semibold text-center text-sm bg-background border border-border/60 text-white hover:border-primary/50 hover:bg-primary/10 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      {offer.cta} <ArrowRight className="w-4 h-4" />
                    </a>
                  </motion.div>
                ))}
              </motion.div>

              {/* ── Partner annotation — right col, lg+ only ── */}
              <div className="hidden lg:flex flex-col items-center pointer-events-none select-none" style={{ transform: 'rotate(9deg)' }}>
                <p style={{ fontFamily: "'Caveat', cursive", color: '#146ef4', fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.35, textAlign: 'center', margin: 0 }}>
                  $72K/year<br />cheaper than one<br />senior FT employee!
                </p>
                <svg width="96" height="60" viewBox="0 0 96 60" fill="none" overflow="visible" style={{ display: 'block', marginTop: '6px', marginLeft: '4px', marginRight: 'auto' }}>
                  <path d="M 86,5 C 60,5 22,20 8,50" stroke="#146ef4" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                  <path d="M 15,44 L 8,50 L 14,57" stroke="#146ef4" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── MARKETING ENGINE ─────────────────────────────────────────────── */}
      <section id="engine" className="py-12 md:py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="max-w-7xl mx-auto px-5">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-10 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3 md:mb-4">
              How the Marketing Engine Works
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground">
              We connect the pieces so more people move from interested to ready to buy.
            </p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-16"
          >
            {ENGINE_STEPS.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="relative bg-card/50 border border-border/50 rounded-xl md:rounded-2xl p-4 md:p-6 group hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2 md:mb-3">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  <span className="text-xl md:text-2xl">{step.icon}</span>
                </div>
                <h3 className="text-sm md:text-base font-bold text-white mb-1 md:mb-2">{step.label}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                {i < ENGINE_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-border z-10">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* AI Callout */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-card border border-primary/20 rounded-2xl md:rounded-3xl p-6 md:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative">
              <div className="inline-block mb-3 md:mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-widest">
                AI, used where it actually helps
              </div>
              <p className="text-sm md:text-lg text-foreground/90 leading-relaxed">
                We can layer practical AI workflows into the system to speed up campaign planning, draft and repurpose content, summarize lead or customer insights, support follow-up, and reduce repetitive marketing tasks. No hype. Just useful workflows that make the system easier to run.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────── */}
      <section id="process" className="py-12 md:py-24 bg-card/20 border-y border-border/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-8 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3 md:mb-4">
              How It Works
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground max-w-2xl">
              A simple 3-step engagement that gets your marketing system built and running.
            </p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-4 md:space-y-6"
          >
            {[
              {
                num: "01",
                title: "Audit the Engine",
                desc: "We review your current website, funnel, email, CRM, forms, automations, campaigns, AI usage, and follow-up to find what is missing or leaking.",
              },
              {
                num: "02",
                title: "Build the System",
                desc: "We build or clean up the funnels, emails, automations, lead intake, AI workflows, and campaign pieces your business needs.",
              },
              {
                num: "03",
                title: "Launch and Optimize",
                desc: "We launch the system, monitor performance, improve what is working, and keep tightening the path from lead to customer.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex flex-row items-center p-5 md:p-10 bg-card rounded-2xl md:rounded-3xl border border-border/30 hover:border-primary/40 transition-colors"
              >
                <div className="w-14 md:w-32 text-4xl md:text-8xl font-display font-extrabold text-white/5 mr-4 md:mr-8 shrink-0 text-center">
                  {step.num}
                </div>
                <div className="flex-1">
                  <h3 className="text-base md:text-2xl font-bold text-white mb-1 md:mb-2">{step.title}</h3>
                  <p className="text-xs md:text-lg text-muted-foreground">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROOF ────────────────────────────────────────────────────────── */}
      <section id="proof" className="py-12 md:py-24 bg-background border-b border-border/20">
        <div className="max-w-4xl mx-auto px-5">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2 md:mb-4">
              Real Systems.
            </h2>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-primary mb-0">
              Real Results.
            </h2>
          </motion.div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-5">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="bg-gradient-to-br from-card to-background border border-border/50 rounded-[24px] md:rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-2xl"
          >
            <motion.div variants={fadeInUp} className="w-full md:w-2/5 h-[260px] md:h-auto relative">
              <img
                src={operatorPhoto}
                alt="Thomas Nilsen, founder of Diamond Ace Growth marketing systems agency"
                className="w-full h-full object-cover object-top md:object-center"
              />
            </motion.div>

            <motion.div variants={fadeInUp} className="w-full md:w-3/5 p-6 md:p-16 flex flex-col justify-center">
              <h2 className="text-xl md:text-3xl lg:text-4xl font-display font-bold text-white mb-4 md:mb-6">
                Meet Thomas
              </h2>
              <p className="text-sm md:text-lg text-muted-foreground mb-5 md:mb-8 leading-relaxed">
                Diamond Ace Growth is a founder-led marketing systems agency built by Thomas Nilsen. We help growing businesses build the funnels, email campaigns, automations, lead follow-up systems, and practical AI workflows they need to turn more interest into revenue. Thomas brings hands-on experience in email marketing, marketing operations, automation, analytics, campaign execution, and AI-assisted marketing workflows for growing businesses and SaaS teams. The goal is simple: make your marketing system work so more leads become customers.
              </p>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Focus</div>
                  <div className="text-xs md:text-sm font-bold text-white">Funnels, Email, Automation and AI Workflows</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Location</div>
                  <div className="text-xs md:text-sm font-bold text-white">Based in Utah County, UT</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Experience</div>
                  <div className="text-xs md:text-sm font-bold text-white">SaaS • Ecommerce • Service Businesses • Agencies</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Engagement</div>
                  <div className="text-xs md:text-sm font-bold text-white">Projects • Sprints • Retainers</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="py-12 md:py-24 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-5">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* ── GET IN TOUCH ─────────────────────────────────────────────────── */}
      <section id="get-in-touch" className="py-12 md:py-24 border-t border-border/20 relative">
        <div className="max-w-2xl mx-auto px-5">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-8 md:mb-10"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">Get In Touch</p>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-display font-bold text-white mb-3 md:mb-4">
              Just want to say hello?
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              No forms, no commitments. Drop me a message and I'll get back to you.
            </p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-card rounded-2xl md:rounded-3xl p-5 md:p-10 border border-border/30 shadow-xl"
          >
            <SimpleContactForm />
          </motion.div>
        </div>
      </section>

      </main>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="py-10 md:py-12 border-t border-border/20 bg-background text-center">
        <div className="max-w-7xl mx-auto px-5 flex flex-col items-center">
          <img src={logoWhite} alt="Diamond Ace Growth - Sales funnels, email campaigns, and marketing automation" className="h-10 md:h-12 w-auto mb-5 md:mb-6" />
          <p className="text-sm text-muted-foreground mb-6 md:mb-8 max-w-sm">Funnels, email, automation, and AI workflows built to turn leads into customers.</p>

          <div className="flex gap-5 md:gap-6 mb-6 md:mb-8">
            <a href="/privacy" className="text-xs md:text-sm text-muted-foreground hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-xs md:text-sm text-muted-foreground hover:text-white transition-colors">Terms of Service</a>
          </div>

          <div className="text-xs md:text-sm text-muted-foreground/80">
            &copy; {new Date().getFullYear()} Diamond Ace Growth. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
