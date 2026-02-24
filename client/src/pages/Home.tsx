import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { ContactForm } from "@/components/ContactForm";
import { 
  ArrowRight, BarChart3, Mail, Target, 
  Zap, XCircle, CheckCircle2, TrendingUp, Users 
} from "lucide-react";
import operatorPhoto from "@assets/Untitled_design_(20)_1771891325681.png";

// Animation variants
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

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[150px] -z-10" />

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
              We Turn Your Email List Into an <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Automated Revenue Engine</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Diamond Ace Growth helps e-commerce brands add 20-30% to their top-line revenue without spending another dime on ads.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#contact"
                className="px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-200 flex items-center group w-full sm:w-auto justify-center"
              >
                Get Your Free Audit
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-sm text-muted-foreground sm:ml-4">
                No commitment. Just actionable insights.
              </p>
            </motion.div>

            {/* Trusted By / Metrics banner */}
            <motion.div variants={fadeInUp} className="mt-20 pt-10 border-t border-border/30 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Average Revenue Bump", value: "25%+" },
                { label: "Emails Sent", value: "10M+" },
                { label: "ROI on Retainer", value: "5x-10x" },
                { label: "Client Retention", value: "98%" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-display font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section id="problem" className="py-24 bg-card/30 border-y border-border/20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                You're working too hard for <span className="text-highlight">new traffic</span>.
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Most brands pour all their profit into Zuck's pockets trying to acquire new customers, while ignoring the goldmine sitting right in their database.
              </p>
              
              <div className="space-y-4">
                {[
                  "Paying increasingly high CAC on Meta & Google",
                  "Sending occasional, unsegmented blast emails",
                  "Leaking 70% of potential buyers at checkout",
                  "Lacking a clear strategy to turn 1-time buyers into loyalists"
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
                  { title: "Behavioral Segmentation", desc: "Sending the right message to the right person at the right time." },
                  { title: "Automated Flow Systems", desc: "Setting up 24/7 revenue machines that trigger based on user actions." },
                  { title: "Strategic Campaign Calendars", desc: "Consistent, high-converting sends that don't burn out your list." }
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

      {/* SERVICES SECTION */}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
              Full-Stack Email Retention
            </h2>
            <p className="text-lg text-muted-foreground">
              We don't just write copy. We handle the entire ecosystem from technical setup to high-converting design.
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
                title: "Core Automations",
                desc: "Welcome Series, Abandoned Cart, Browse Abandonment, and Post-Purchase flows designed to maximize LTV automatically."
              },
              {
                icon: <Mail className="w-8 h-8 text-accent" />,
                title: "Campaign Management",
                desc: "2-4 strategic broadcasts per week. Full copywriting, custom design, and rigorous A/B testing for constant improvement."
              },
              {
                icon: <Target className="w-8 h-8 text-accent" />,
                title: "List Growth & Hygiene",
                desc: "Optimizing pop-ups for higher capture rates and managing deliverability so you always land in the primary inbox."
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

      {/* PROCESS SECTION */}
      <section id="process" className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
              How We Scale You
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
                title: "The Deep Dive Audit",
                desc: "We analyze your current setup, find the leaks where money is escaping, and project exact revenue targets we can hit in 90 days."
              },
              {
                num: "02",
                title: "Infrastructure & Flows",
                desc: "First 14 days: We rebuild your core automated flows. This is the foundation that prints money while you sleep."
              },
              {
                num: "03",
                title: "Aggressive Campaigning",
                desc: "Month 1 and beyond: We deploy our high-converting campaign calendar, pushing sales without annoying your subscribers."
              }
            ].map((step, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className="flex flex-col md:flex-row items-start md:items-center p-8 md:p-10 bg-card rounded-3xl border border-border/30 hover:border-primary/40 transition-colors"
              >
                <div className="text-6xl md:text-8xl font-display font-extrabold text-white/5 mr-8 mb-4 md:mb-0">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-lg text-muted-foreground max-w-3xl">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROOF SECTION */}
      <section id="proof" className="py-24 bg-card/20 border-y border-border/20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
              The Proof is in the Dashboard
            </h2>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { stat: "+32%", metric: "Total Store Revenue", quote: "Diamond Ace came in and completely revamped our Klaviyo. Within 45 days, email was driving 30% of our total sales. Absolutely incredible.", author: "Sarah J., Skincare Brand" },
              { stat: "4.8x", metric: "ROI on Retainer", quote: "We were hesitant to outsource, but their team operates like an in-house partner. The designs are stunning and the copy actually converts.", author: "Mike T., Tech Apparel" },
              { stat: "$120k", metric: "Added in 90 Days", quote: "The abandoned cart flow they built alone paid for their service for the entire year. Professional, fast, and highly skilled.", author: "Elena R., Home Goods" }
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
                <p className="text-foreground/90 italic mb-6">"{testimonial.quote}"</p>
                <div className="text-sm font-bold text-white/70">{testimonial.author}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="bg-gradient-to-br from-card to-background border border-border/50 rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-2xl"
          >
            <motion.div variants={fadeInUp} className="w-full md:w-2/5 h-[400px] md:h-auto relative">
              {/* HTML comment required for stock images, but this is a user asset */}
              <img 
                src={operatorPhoto} 
                alt="Founder of Diamond Ace Growth" 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background/90 to-transparent" />
            </motion.div>
            
            <motion.div variants={fadeInUp} className="w-full md:w-3/5 p-10 md:p-16 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                Your Dedicated Growth Partner
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                I founded Diamond Ace Growth after watching too many incredible brands struggle with sub-par retention strategies. Agencies charge astronomical fees and assign junior account managers to do the actual work.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We do things differently. When you work with us, you get senior-level strategy, copywriting, and design on every single campaign. We limit our client roster to ensure quality never drops.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-white font-medium">
                  <BarChart3 className="w-5 h-5 text-primary" /> Data-Driven
                </div>
                <div className="flex items-center gap-2 text-white font-medium">
                  <Users className="w-5 h-5 text-primary" /> Boutique Approach
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION */}
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

      {/* FOOTER */}
      <footer className="py-12 border-t border-border/20 bg-background text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-display font-bold text-xl mb-6 shadow-lg">
            DA
          </div>
          <h3 className="text-xl font-display font-bold text-white mb-2">DIAMOND ACE GROWTH</h3>
          <p className="text-muted-foreground mb-8">Elevating e-commerce retention.</p>
          
          <div className="text-sm text-muted-foreground/60">
            &copy; {new Date().getFullYear()} Diamond Ace Growth. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
