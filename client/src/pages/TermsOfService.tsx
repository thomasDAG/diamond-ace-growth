import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-invert max-w-none"
        >
          <h1 className="text-4xl font-display font-bold text-white mb-8">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground">By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">2. Use License</h2>
          <p className="text-muted-foreground">Permission is granted to temporarily download one copy of the materials (information or software) on Diamond Ace Growth's website for personal, non-commercial transitory viewing only.</p>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">3. Disclaimer</h2>
          <p className="text-muted-foreground">The materials on Diamond Ace Growth's website are provided on an 'as is' basis. Diamond Ace Growth makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">4. Limitations</h2>
          <p className="text-muted-foreground">In no event shall Diamond Ace Growth or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Diamond Ace Growth's website.</p>

          <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4">5. Governing Law</h2>
          <p className="text-muted-foreground">Any claim relating to Diamond Ace Growth's website shall be governed by the laws of the State of Utah without regard to its conflict of law provisions.</p>
        </motion.div>
      </div>
    </div>
  );
}
