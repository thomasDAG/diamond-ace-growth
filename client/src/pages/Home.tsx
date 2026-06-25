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
  "Lead Follow-Up Systems",
  "Client Onboarding Workflows",
  "AI Content Pipelines",
  "Reporting Dashboards",
  "Internal Admin Automations",
  "SOP & Process Systems",
  "CRM & Pipeline Setup",
  "Email Automation",
  "Meeting-to-Task Systems",
  "AI Prompt Libraries",
  "Workflow Mapping",
  "Operations Audits",
  "Reactivation Campaigns",
  "Referral Workflows",
  "Review Request Systems",
];

const WHAT_WE_BUILD = [
  {
    emoji: "⚡",
    title: "Lead Follow-Up Systems",
    desc: "Automated sequences that contact, nurture, and follow up with new leads immediately — no manual chasing, no leads falling through the cracks.",
  },
  {
    emoji: "🔄",
    title: "Client Onboarding Workflows",
    desc: "A consistent, professional onboarding experience every time — intake forms, welcome sequences, task triggers, and handoff automation.",
  },
  {
    emoji: "✍️",
    title: "AI-Assisted Content Workflows",
    desc: "Systems that turn voice memos, meeting notes, and raw ideas into drafted content — without spending hours staring at a blank page.",
  },
  {
    emoji: "📊",
    title: "Reporting & Visibility Dashboards",
    desc: "Clear, automated reports that surface what matters — lead volume, pipeline status, campaign results — without manually pulling data every week.",
  },
  {
    emoji: "⚙️",
    title: "Internal Admin Automations",
    desc: "Eliminate repetitive manual tasks: data entry, status updates, reminders, handoffs, and internal notifications handled automatically.",
  },
  {
    emoji: "📋",
    title: "SOP & Process Systems",
    desc: "Document how your business actually works and build AI-assisted tools so your team can execute consistently without asking the owner every time.",
  },
];

const OFFERS = [
  {
    name: "AI Workflow Leak Scorecard",
    price: "Free",
    badge: "START HERE",
    desc: "A quick self-assessment to identify where your business is losing time, leads, and clarity through messy manual workflows.",
    cta: "Find Your Workflow Leaks",
    href: "#contact",
    featured: true,
    comingSoon: false,
  },
  {
    name: "AI Ops Starter Kit",
    price: "$97",
    badge: "COMING SOON",
    desc: "Templates, prompts, and workflow maps to help owner-led businesses start using AI practically — without guessing where to begin.",
    cta: "Join the Waitlist",
    href: "#contact",
    featured: false,
    comingSoon: true,
  },
  {
    name: "AI Ops Audit",
    price: "$1,000",
    badge: null,
    desc: "A focused review of your current workflows with a clear 30-day roadmap for what to automate first and how to get your time back.",
    cta: "Book an Audit",
    href: "#contact",
    featured: false,
    comingSoon: false,
  },
  {
    name: "AI Ops Buildout",
    price: "Starting at $3,500",
    badge: null,
    desc: "We build one complete AI-powered workflow system for your business — lead follow-up, onboarding, content, reporting, or admin automation. Scoped tightly and delivered in 3–4 weeks.",
    cta: "Start a Buildout",
    href: "#contact",
    featured: false,
    comingSoon: false,
  },
  {
    name: "AI Ops Partner",
    price: "Starting at $2,500/month",
    badge: null,
    desc: "Ongoing AI operations support for owner-led businesses that want continuous workflow improvement without hiring full-time.",
    cta: "Become a Partner",
    href: "#contact",
    featured: false,
    comingSoon: false,
  },
];

const HOW_IT_WORKS = [
  {
    num: "01",
    title: "Find the Workflow Leaks",
    desc: "We audit your current tools, follow-up process, onboarding, content, and admin workflows to find exactly where time and leads are slipping away.",
  },
  {
    num: "02",
    title: "Map the System",
    desc: "We design a clear, practical workflow map — what gets automated, what gets templated, what gets eliminated, and in what order.",
  },
  {
    num: "03",
    title: "Build the Automation",
    desc: "We build the actual systems: AI-assisted workflows, automations, email sequences, dashboards, and process docs that run without you.",
  },
  {
    num: "04",
    title: "Improve Over Time",
    desc: "We monitor what's working, tighten the gaps, and keep building as your business grows — so the systems scale with you.",
  },
];

const WHO_ITS_FOR = [
  "Repetitive admin work that eats hours every week",
  "Leads that get followed up with days late — or never",
  "Client onboarding that's inconsistent or fully manual",
  "Content ideas scattered across notes, voice memos, and texts",
  "Reports that take 30 minutes to build every week by hand",
  "Too much knowledge living only in the owner's head",
  "Scattered tools that don't talk to each other",
  "No dedicated ops or automation person on the team",
];

const WORKFLOW_LEAK_EXAMPLES = [
  {
    leak: "New leads are manually followed up with — days later",
    fix: "Automated follow-up sequence triggered the moment a lead comes in",
  },
  {
    leak: "Meeting notes never become tasks or next steps",
    fix: "AI-assisted meeting-to-task workflow that captures action items automatically",
  },
  {
    leak: "Content ideas are scattered across notes and voice memos",
    fix: "A single intake system that turns raw ideas into drafted content",
  },
  {
    leak: "Client onboarding changes every single time",
    fix: "A consistent onboarding workflow with intake forms, welcome emails, and task triggers",
  },
  {
    leak: "Reports are manually built from scratch every week",
    fix: "Automated reporting dashboards that pull and surface the right data",
  },
  {
    leak: "Past customers are never reactivated",
    fix: "Automated reactivation campaigns that re-engage dormant contacts on schedule",
  },
  {
    leak: "The owner is the only person who knows how things work",
    fix: "SOP documentation and AI-assisted process tools the whole team can use",
  },
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
        <title>Diamond Ace Growth | AI-Powered Operations Systems for Owner-Led Businesses</title>
        <meta name="description" content="Diamond Ace Growth builds AI-powered operations systems for busy business owners. Replace messy manual workflows with simple systems for follow-up, onboarding, content, reporting, and internal operations." />
        <meta property="og:title" content="AI-Powered Systems for Busy Business Owners | Diamond Ace Growth" />
        <meta property="og:description" content="We help owner-led businesses replace manual workflows with AI-powered systems for follow-up, onboarding, content, reporting, and operations." />
        <meta property="og:image" content="https://diamondacegrowth.com/newlinkpreview.png?v=5" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://diamondacegrowth.com" />
        <meta property="og:site_name" content="Diamond Ace Growth" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI-Powered Systems for Busy Business Owners | Diamond Ace Growth" />
        <meta name="twitter:description" content="Replace manual workflows with AI-powered operations systems. Follow-up, onboarding, content, reporting, and admin — built for owner-led businesses." />
        <meta name="twitter:image" content="https://diamondacegrowth.com/newlinkpreview.png?v=5" />
        <link rel="canonical" href="https://diamondacegrowth.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap" rel="stylesheet" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Diamond Ace Growth",
            "description": "AI-powered operations systems for owner-led businesses. We replace messy manual workflows with simple systems for follow-up, onboarding, content, reporting, and internal operations.",
            "url": "https://diamondacegrowth.com",
            "areaServed": "United States",
            "serviceType": ["AI Operations Systems", "Workflow Automation", "Lead Follow-Up Systems", "Client Onboarding Workflows", "AI Content Workflows", "Reporting Dashboards"]
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
              AI-Powered Operations&nbsp;•&nbsp;No More Manual Workflows
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-extrabold text-white leading-[1.1] mb-5 md:mb-6">
              AI-Powered Systems for<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Busy Business Owners.</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-base md:text-xl text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-2">
              Diamond Ace Growth helps owner-led businesses replace messy manual workflows with simple systems for follow-up, content, onboarding, reporting, and internal operations.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#contact"
                className="cta-hero px-6 md:px-8 py-4 min-h-[52px] rounded-xl bg-primary text-white font-bold text-base md:text-lg hover:-translate-y-1 transition-all duration-200 flex items-center group w-full sm:w-auto justify-center"
                data-testid="link-hero-cta"
              >
                Find Your Biggest Workflow Leak
                <ArrowRight className="ml-2 w-5 h-5 cta-arrow" />
              </a>
              <a
                href="#offers"
                className="px-6 md:px-8 py-4 min-h-[52px] rounded-xl bg-card border border-border/50 text-white font-semibold text-base md:text-lg hover:-translate-y-1 hover:border-primary/50 transition-all duration-200 flex items-center group w-full sm:w-auto justify-center"
              >
                View Offers &amp; Pricing
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
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
                Your business isn't broken.
                <span className="block"><span className="text-highlight">It has workflow leaks.</span></span>
              </h2>
              <p className="text-sm md:text-lg text-muted-foreground mb-4 md:mb-6">
                Most owner-led businesses don't have one giant problem. They have a dozen small ones: missed follow-ups, manual handoffs, scattered tools, inconsistent communication, and critical knowledge that lives only in the owner's head.
              </p>
              <p className="text-sm md:text-lg text-muted-foreground mb-6 md:mb-8">
                The result is a business that feels reactive. Things fall through the cracks. Growth stalls — not because you're not working hard, but because nothing is connected into a real system.
              </p>

              <div className="space-y-3 md:space-y-4">
                {[
                  "Leads come in but follow-up is slow, inconsistent, or manual",
                  "Client onboarding changes every time and takes too long",
                  "Content ideas pile up but never turn into actual content",
                  "Reports are built from scratch every week by hand",
                  "Past customers are never reactivated or re-engaged",
                  "Tasks live in your head or get lost in Slack",
                  "Your tools don't talk to each other",
                  "You're the only person who knows how things work",
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
              <h3 className="text-lg md:text-2xl font-display font-bold text-white mb-4 md:mb-6">The Systems We Build</h3>
              <div className="space-y-4 md:space-y-5">
                {[
                  { emoji: "⚡", title: "Lead Follow-Up Systems", desc: "Automated sequences that contact and nurture leads the moment they come in — no manual chasing required." },
                  { emoji: "🔄", title: "Client Onboarding Workflows", desc: "A consistent, professional onboarding process every time — intake, welcome, tasks, and handoffs handled automatically." },
                  { emoji: "✍️", title: "AI-Assisted Content Workflows", desc: "Systems that turn raw ideas into drafted content without spending hours at a blank page." },
                  { emoji: "📊", title: "Reporting & Visibility Dashboards", desc: "Automated reports that surface what matters — without pulling data manually every week." },
                  { emoji: "⚙️", title: "Internal Admin Automations", desc: "Eliminate repetitive tasks: data entry, reminders, status updates, and handoffs handled automatically." },
                  { emoji: "📋", title: "SOP & Process Systems", desc: "Document how your business works and build tools so your team can execute without asking the owner every time." },
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

      {/* ── WHAT WE BUILD ────────────────────────────────────────────────── */}
      <section id="services" className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-5">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-10 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3 md:mb-6">
              What We Build
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground">
              Practical AI-powered systems that run without you — so you can focus on the work that actually needs you.
            </p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
          >
            {WHAT_WE_BUILD.map((service, i) => (
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

          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center text-xs md:text-sm text-muted-foreground/70 mt-8 md:mt-10 max-w-xl mx-auto"
          >
            We do not manage paid ads or daily social media. We build the operational backbone that makes everything else run.
          </motion.p>
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
              Transparent pricing. Start where you are, build from there.
            </p>
          </motion.div>

          <div className="space-y-4 md:space-y-8">
            {/* Top row: 3 cards */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
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
                  {offer.badge && (
                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-4 py-1 rounded-full ${
                      offer.comingSoon ? "bg-secondary" : "bg-primary"
                    }`}>
                      {offer.badge}
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
                  </div>
                  <a
                    href={offer.href}
                    className={`w-full py-3 min-h-[44px] rounded-xl font-semibold text-center text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                      offer.featured
                        ? "bg-primary text-white hover:bg-primary/90"
                        : offer.comingSoon
                        ? "bg-background border border-border/40 text-muted-foreground cursor-default"
                        : "bg-background border border-border/60 text-white hover:border-primary/50 hover:bg-primary/10"
                    }`}
                  >
                    {offer.cta} {!offer.comingSoon && <ArrowRight className="w-4 h-4" />}
                  </a>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom row: 2 cards */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto"
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
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="process" className="py-12 md:py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="max-w-7xl mx-auto px-5">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-8 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3 md:mb-4">
              How It Works
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground max-w-2xl">
              A simple four-step engagement that gets your AI operations systems built and running.
            </p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-4 md:space-y-6"
          >
            {HOW_IT_WORKS.map((step, i) => (
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

      {/* ── WHO IT'S FOR ─────────────────────────────────────────────────── */}
      <section className="py-10 md:py-16 bg-card/20 border-y border-border/20">
        <div className="max-w-5xl mx-auto px-5">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-xl md:text-3xl lg:text-4xl font-display font-bold text-white mb-3">
              Built for Owner-Led Businesses
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              If you're growing, busy, and running too much through manual processes and scattered tools — this is built for you.
            </p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
          >
            {WHO_ITS_FOR.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex items-start gap-3 bg-card border border-border/40 rounded-xl p-4 md:p-5"
              >
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-sm md:text-base text-foreground/90">{item}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-8 md:mt-10 bg-card/50 border border-border/30 rounded-2xl p-5 md:p-8"
          >
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">What We Don't Do</h3>
            <div className="flex flex-wrap gap-3">
              {["No paid ads management", "No daily social media posting", "No bloated agency retainers"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-foreground/60">
                  <XCircle className="w-4 h-4 text-destructive/50 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WORKFLOW LEAK EXAMPLES ───────────────────────────────────────── */}
      <section className="py-12 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-5">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-10 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3 md:mb-4">
              Sound Familiar?
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground">
              These are the workflow leaks we find in almost every owner-led business — and what we replace them with.
            </p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {WORKFLOW_LEAK_EXAMPLES.map((example, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-card/50 border border-border/50 rounded-2xl p-5 md:p-6 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start gap-3 mb-3">
                  <XCircle className="w-4 h-4 text-destructive/70 shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground/70 leading-snug">{example.leak}</p>
                </div>
                <div className="border-t border-border/30 pt-3 flex items-start gap-3">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground/90 leading-snug">{example.fix}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROOF ────────────────────────────────────────────────────────── */}
      <section id="proof" className="py-12 md:py-24 bg-card/20 border-y border-border/20">
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
                alt="Thomas Nilsen, founder of Diamond Ace Growth AI operations systems"
                className="w-full h-full object-cover object-top md:object-center"
              />
            </motion.div>

            <motion.div variants={fadeInUp} className="w-full md:w-3/5 p-6 md:p-16 flex flex-col justify-center">
              <h2 className="text-xl md:text-3xl lg:text-4xl font-display font-bold text-white mb-4 md:mb-6">
                Meet Thomas
              </h2>
              <p className="text-sm md:text-lg text-muted-foreground mb-5 md:mb-8 leading-relaxed">
                Diamond Ace Growth is run by Thomas Nilsen — a practical systems builder with hands-on experience in marketing automation, email, CRM, operations, and AI-assisted workflows across growing businesses, SaaS teams, and service companies. He understands both the technical side of automation and the reality of running an owner-led business: you need things that actually work, not experiments that add complexity. The goal is simple — build systems that save you time, reduce operational chaos, and let your business run without everything going through you.
              </p>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Focus</div>
                  <div className="text-xs md:text-sm font-bold text-white">AI Ops Systems, Workflow Automation, Email & CRM</div>
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
                  <div className="text-xs md:text-sm font-bold text-white">Audits • Buildouts • Ongoing Partnerships</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="py-10 md:py-16 bg-card/20 border-y border-border/20">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4 md:mb-6">
              Ready to find your biggest workflow leak?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-sm md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-xl mx-auto">
              Start with a free AI Ops Audit request. We'll map out where your business is losing time and what to fix first.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#contact"
                className="cta-hero px-6 md:px-8 py-4 min-h-[52px] rounded-xl bg-primary text-white font-bold text-base md:text-lg hover:-translate-y-1 transition-all duration-200 flex items-center justify-center group"
              >
                Find Your Biggest Workflow Leak
                <ArrowRight className="ml-2 w-5 h-5 cta-arrow" />
              </a>
              <a
                href="#offers"
                className="px-6 md:px-8 py-4 min-h-[52px] rounded-xl bg-card border border-border/50 text-white font-semibold text-base md:text-lg hover:-translate-y-1 hover:border-primary/50 transition-all duration-200 flex items-center justify-center"
              >
                View All Offers
              </a>
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
          <img src={logoWhite} alt="Diamond Ace Growth - AI-Powered Operations Systems" className="h-10 md:h-12 w-auto mb-5 md:mb-6" />
          <p className="text-sm text-muted-foreground mb-6 md:mb-8 max-w-sm">AI-powered operations systems built to save time, reduce chaos, and help owner-led businesses scale without adding headcount.</p>

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
