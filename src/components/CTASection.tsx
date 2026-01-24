import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ctaVisual from "@/assets/cta-visual.png";

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative glass-card p-12 lg:p-20 text-center overflow-hidden"
        >
          {/* Background Visual */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={isInView ? { opacity: 0.2, scale: 1 } : {}}
            transition={{ duration: 1.5 }}
          >
            <img 
              src={ctaVisual} 
              alt="" 
              className="w-full h-full object-cover object-center"
              style={{ 
                maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)'
              }}
            />
          </motion.div>
          
          {/* Animated Background Orbs */}
          <motion.div 
            className="absolute w-[500px] h-[500px] -top-60 -left-60 rounded-full blur-3xl opacity-30"
            style={{ background: "radial-gradient(circle, hsl(156 100% 50%) 0%, transparent 70%)" }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.35, 0.2],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute w-[400px] h-[400px] -bottom-40 -right-40 rounded-full blur-3xl opacity-20"
            style={{ background: "radial-gradient(circle, hsl(156 100% 50%) 0%, transparent 70%)" }}
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          
          {/* Content */}
          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            >
              Ready to start?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-muted-foreground mb-10"
            >
              The first three modules are free. No credit card, no trial period. 
              Just sign up and start learning.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button variant="hero" size="xl" className="group">
                  Create Free Account
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button variant="heroOutline" size="xl">
                  View Pricing
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}