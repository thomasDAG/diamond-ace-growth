import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-invert max-w-none"
        >
          <h1 className="text-4xl font-display font-bold text-white mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">1. Introduction</h2>
          <p className="text-muted-foreground">Welcome to Diamond Ace Growth. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights.</p>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">2. The Data We Collect</h2>
          <p className="text-muted-foreground">We may collect, use, store and transfer different kinds of personal data about you which you provide through our contact forms, including your Name, Email Address, Company Name, and Business Details.</p>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">3. How We Use Your Data</h2>
          <p className="text-muted-foreground">We use your data only to provide our services to you, to communicate with you about your inquiry, and to improve our website experience. We do not sell your data to third parties.</p>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">4. Data Security</h2>
          <p className="text-muted-foreground">We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way.</p>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">5. Contact Us</h2>
          <p className="text-muted-foreground">If you have any questions about this privacy policy or our privacy practices, please contact us through the form on our homepage.</p>
        </motion.div>
      </div>
    </div>
  );
}
