import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { 
  Layers, 
  BarChart3, 
  Newspaper, 
  Code2, 
  MessageSquare, 
  Shield,
  Brain,
  Rocket
} from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Structured Curriculum",
    description: "Twelve modules that build on each other. No jumping around or wondering what to learn next.",
  },
  {
    icon: Code2,
    title: "Real Projects",
    description: "Build actual systems—classifiers, chatbots, recommenders—not toy examples.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "See exactly where you are and what comes next. Stay motivated with clear milestones.",
  },
  {
    icon: Newspaper,
    title: "Industry Updates",
    description: "The field moves fast. Our content stays current with weekly updates on what matters.",
  },
  {
    icon: Brain,
    title: "Concept Reinforcement",
    description: "Quizzes after each section. Spaced repetition to make knowledge stick.",
  },
  {
    icon: MessageSquare,
    title: "Discussion Threads",
    description: "Ask questions, share insights, and learn from others on the same path.",
  },
  {
    icon: Rocket,
    title: "Career Guidance",
    description: "Understand which skills matter for different roles. ML Engineer, Research, Product—pick your path.",
  },
  {
    icon: Shield,
    title: "No Fluff Guarantee",
    description: "Every lesson earns its place. If it doesn't help you build, it's not in the curriculum.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5 }
  }
};

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} id="features" className="py-24 relative">
      {/* Animated Background Gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      />
      
      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm font-medium text-primary">What You Get</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Built for <span className="gradient-text">serious learners</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to go from curious to capable. 
            No subscriptions to forget about—learn at your own pace.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                transition: { duration: 0.3 } 
              }}
              className="glass-card p-6 group cursor-pointer"
            >
              <motion.div 
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.4 }}
              >
                <feature.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}