import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check, Zap, Crown, Building2 } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₦0",
    period: "forever",
    description: "Perfect for getting started with AI fundamentals",
    icon: Zap,
    features: [
      "Access to 3 foundational modules",
      "Community forum access",
      "Weekly AI news digest",
      "Basic progress tracking",
      "Certificate of completion",
    ],
    cta: "Start Free",
    popular: false,
    gradient: "from-slate-500/20 to-gray-500/20",
  },
  {
    name: "Pro",
    price: "₦15,000",
    period: "per month",
    description: "Full curriculum access for serious learners",
    icon: Crown,
    features: [
      "All modules unlocked",
      "Hands-on projects with feedback",
      "Priority community support",
      "Live monthly workshops",
      "AI tools dashboard access",
      "Personalized learning path",
      "Pro certification badge",
    ],
    cta: "Go Pro",
    popular: true,
    gradient: "from-primary/30 to-emerald-500/20",
  },
  {
    name: "Enterprise",
    price: "₦75,000",
    period: "per seat/month",
    description: "For teams building AI capabilities",
    icon: Building2,
    features: [
      "Everything in Pro",
      "Custom team dashboard",
      "Dedicated success manager",
      "Private training sessions",
      "API access for integrations",
      "Custom learning paths",
      "Priority feature requests",
      "SLA guarantees",
    ],
    cta: "Contact Sales",
    popular: false,
    gradient: "from-purple-500/20 to-blue-500/20",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="pricing" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm font-medium text-primary">Pricing</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Invest in your <span className="gradient-text">AI future</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that matches your learning goals. Upgrade or cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className={`relative ${plan.popular ? 'lg:-mt-4 lg:mb-4' : ''}`}
            >
              {plan.popular && (
                <motion.div 
                  className="absolute -top-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold z-20 shadow-lg shadow-primary/30"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Most Popular
                </motion.div>
              )}
              
              <div className={`glass-card p-8 h-full relative overflow-hidden ${plan.popular ? 'border-primary/50 border-2 mt-2' : ''}`}>
                {/* Gradient Background */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-50`}
                  whileHover={{ opacity: 0.7 }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative z-10">
                  {/* Plan Icon & Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div 
                      className="p-2 rounded-lg bg-primary/10 border border-primary/20"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <plan.icon className="w-5 h-5 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-semibold">{plan.name}</h3>
                  </div>
                  
                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">/{plan.period}</span>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>
                  
                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-start gap-3 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 + index * 0.05 }}
                      >
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  {/* CTA Button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      variant={plan.popular ? "hero" : "heroOutline"} 
                      size="lg" 
                      className="w-full"
                    >
                      {plan.cta}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Note */}
        <motion.p 
          className="text-center text-sm text-muted-foreground mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          All prices in Nigerian Naira. Team discounts available for 10+ seats.
        </motion.p>
      </div>
    </section>
  );
}
