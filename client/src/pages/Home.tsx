import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { ContactForm } from "@/components/ContactForm";
import { Helmet } from "react-helmet-async";
import { 
  ArrowRight, BarChart3, Mail, Target, 
  Zap, XCircle, CheckCircle2, TrendingUp, Users 
} from "lucide-react";
import operatorPhoto from "@assets/Untitled_design_(20)_1771891325681.png";
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
  "Email Revenue Architecture", "Lifecycle Automation", "Segmentation Strategy", 
  "Welcome Flow Optimization", "Abandoned Cart Systems", "Lead Nurture Sequences", 
  "Retention & Re-Engagement", "Revenue Attribution Mapping", "Deliverability & Infrastructure", 
  "A/B Testing Frameworks", "CRM & ESP Optimization", "Marketing Automation Buildouts", 
  "Behavioral Trigger Design", "Fractional Lifecycle Leadership"
];


export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Diamond Ace Growth | Email Marketing & Lifecycle Automation Consulting</title>
        <meta name="description" content="Diamond Ace Growth helps SaaS, ecommerce, and growth-stage brands turn their email lists into automated revenue engines through lifecycle automation, segmentation strategy, and retention systems." />
        <meta property="og:title" content="Diamond Ace Growth | Email Marketing & Lifecycle Automation Consulting" />
        <meta property="og:description" content="Turn your email list into an automated revenue engine. Expert lifecycle automation, segmentation strategy, and email retention systems for growth-stage brands." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Diamond Ace Growth" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Diamond Ace Growth | Email Marketing Consulting" />
        <meta name="twitter:description" content="Expert email lifecycle automation and retention systems for SaaS, ecommerce, and growth-stage brands." />
        <link rel="canonical" href="https://diamondacegrowth.com" />
      </Helmet>
      <Navbar />

      <section className="hero-section relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="hero-gradient-glow" aria-hidden="true" />
        <div className="hero-vignette" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="inline-block mb-6 px-4 py-1.5 rounded-full bg-card border border-border/50 text-sm font-medium text-accent">
              Stop leaving money on the table
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-display font-extrabold text-white leading-[1.1] mb-6">
              Engineer a <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Predictable Revenue System</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Diamond Ace Growth builds the infrastructure that turns traffic and customer data into predictable sales.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col items-center justify-center gap-4">
              <a 
                href="#contact"
                className="cta-hero px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg hover:-translate-y-1 transition-all duration-200 flex items-center group w-full sm:w-auto justify-center"
                data-testid="link-hero-cta"
              >
                Get a Free Revenue Audit
                <ArrowRight className="ml-2 w-5 h-5 cta-arrow" />
              </a>
              <p className="text-sm text-muted-foreground">
                Walk away with clarity — whether we work together or not.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-20 pt-10 border-t border-border/30 overflow-hidden relative marquee-container">
              <div className="flex whitespace-nowrap animate-marquee">
                {[0, 1, 2].map((copy) =>
                  MARQUEE_SERVICES.map((service, i) => (
                    <span key={`${copy}-${i}`} className="marquee-item relative mx-8 text-lg font-display font-medium text-white/70 flex items-center cursor-default">
                      {service} <span className="ml-8 text-primary">•</span>
                    </span>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="problem" className="py-24 bg-card/30 border-y border-border/20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                Growth shouldn't rely on <span className="text-highlight">guesswork</span>.
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Most brands rely on more ads, more campaigns, and more manual effort — without fixing the underlying revenue system driving conversions.
              </p>
              
              <div className="space-y-4">
                {[
                  "Rising acquisition costs without predictable ROI",
                  "Disconnected tools and manual follow-up",
                  "Leads and customers slipping through lifecycle gaps",
                  "No clear system for turning traffic into long-term revenue"
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <XCircle className="w-6 h-6 text-destructive shrink-0 mr-3 mt-0.5" />
                    <span className="text-foreground/90">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-card border border-border p-8 rounded-3xl relative">
              <div className="absolute -top-4 -right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-6">
                THE SOLUTION
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-6">The Diamond Ace Approach</h3>
              <div className="space-y-6">
                {[
                  { title: "Revenue Architecture", desc: "Mapping the full journey from first click to repeat purchase — eliminating friction and revenue leaks." },
                  { title: "Lifecycle Automation", desc: "Building systems that capture, nurture, convert, and expand customers automatically." },
                  { title: "Performance Optimization", desc: "Using data and financial insight to continuously improve revenue efficiency." }
                ].map((item, i) => (
                  <div key={i} className="flex">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mr-4">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
              Full-Stack Revenue Systems
            </h2>
            <p className="text-lg text-muted-foreground">
              I design and optimize the full revenue ecosystem. From prospect capture to lifecycle automation and performance optimization.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Zap className="w-8 h-8 text-accent" />,
                title: "Revenue Architecture",
                desc: "Mapping the full customer journey from first touch to repeat purchase — eliminating friction and revenue leaks."
              },
              {
                icon: <Mail className="w-8 h-8 text-accent" />,
                title: "Lifecycle Automation",
                desc: "Building systems that capture, nurture, convert, and expand customers automatically."
              },
              {
                icon: <Target className="w-8 h-8 text-accent" />,
                title: "Revenue Optimization",
                desc: "Using data, testing, and financial insight to continuously improve conversion efficiency and lifetime value."
              }
            ].map((service, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className="bg-card/50 hover:bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 p-8 rounded-3xl group"
              >
                <div className="w-16 h-16 rounded-2xl bg-background flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="process" className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
              The Process
            </h2>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-6"
          >
            {[
              {
                num: "01",
                title: "Audit",
                desc: "A structured evaluation of your revenue system to identify conversion leaks, lifecycle gaps, and untapped growth potential."
              },
              {
                num: "02",
                title: "Architect",
                desc: "Design and build scalable revenue systems aligned to your growth model, customer journey, and financial objectives."
              },
              {
                num: "03",
                title: "Optimize",
                desc: "Continuous refinement through testing, automation evolution, and performance analysis to increase revenue efficiency and predictability over time."
              }
            ].map((step, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className="flex flex-col md:flex-row items-start md:items-center p-8 md:p-10 bg-card rounded-3xl border border-border/30 hover:border-primary/40 transition-colors"
              >
                <div className="w-24 md:w-32 text-6xl md:text-8xl font-display font-extrabold text-white/5 mr-8 mb-4 md:mb-0 shrink-0 text-center">
                  {step.num}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-lg text-muted-foreground max-w-3xl">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="proof" className="py-24 bg-card/20 border-y border-border/20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Measured Results.
            </h2>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-16">
              Clean Execution.
            </h2>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {[
              { 
                stat: "$5,000+", 
                metric: "Incremental Sales", 
                quote: "Thomas is an email marketing professional who is not afraid to jump in and make a positive difference right from the start. He concepted, wrote copy, and deployed an email welcome flow that currently has a 75% open rate, a 10% click rate and has generated over $5,000 in sales during the 3 months it has been active.", 
                author: "Mary, Marketing & Branding Strategist" 
              },
              { 
                stat: "High Impact", 
                metric: "Strategic Execution", 
                quote: "Thomas is exceptionally easy to work with and demonstrates a remarkable ability to learn quickly, even within a niche market. His ability to combine technical execution with compelling copy that grabs attention sets him apart. His work consistently reflects clarity, strategic thinking, and creativity.", 
                author: "Heather, Marketing Specialist" 
              }
            ].map((testimonial, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className="bg-background border border-border/50 p-8 rounded-3xl relative"
              >
                <div className="mb-6">
                  <div className="text-4xl font-display font-bold text-primary mb-1">{testimonial.stat}</div>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{testimonial.metric}</div>
                </div>
                <p className="text-foreground/90 italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="text-sm font-bold text-white/70">{testimonial.author}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="bg-gradient-to-br from-card to-background border border-border/50 rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-2xl"
          >
            <motion.div variants={fadeInUp} className="w-full md:w-2/5 h-[400px] md:h-auto relative">
              <img 
                src={operatorPhoto} 
                alt="Thomas Nilsen, email marketing and lifecycle automation consultant at Diamond Ace Growth" 
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
            
            <motion.div variants={fadeInUp} className="w-full md:w-3/5 p-10 md:p-16 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                Meet the Operator
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                I design scalable revenue systems that connect prospect acquisition, lifecycle automation, and financial performance.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                My background includes building and optimizing revenue infrastructure at a publicly traded SaaS company — bringing enterprise-level systems thinking to growth-stage teams and founder-led brands. I focus on building systems that make revenue more efficient, measurable, and predictable.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Focus</div>
                  <div className="text-sm font-bold text-white">Revenue Systems & Lifecycle Architecture</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Location</div>
                  <div className="text-sm font-bold text-white">Utah County, UT</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Experience</div>
                  <div className="text-sm font-bold text-white">Public SaaS • Ecommerce • Agencies</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Engagement</div>
                  <div className="text-sm font-bold text-white">Project-Based & Fractional</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="py-24 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      <footer className="py-12 border-t border-border/20 bg-background text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <img src={logoWhite} alt="Diamond Ace Growth - Email marketing and lifecycle automation consulting" className="h-12 w-auto mb-6" />
          <p className="text-muted-foreground mb-8">Engineering predictable revenue.</p>
          
          <div className="flex gap-6 mb-8">
            <a href="/privacy" className="text-sm text-muted-foreground hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-sm text-muted-foreground hover:text-white transition-colors">Terms of Service</a>
          </div>

          <div className="text-sm text-muted-foreground/60">
            &copy; {new Date().getFullYear()} Diamond Ace Growth. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
