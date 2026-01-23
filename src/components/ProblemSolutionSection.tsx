import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { XCircle, CheckCircle, Zap, Target, BookOpen, TrendingUp } from "lucide-react";

const problems = [
  "Scattered resources with no clear progression",
  "Theory-heavy courses disconnected from real work",
  "Outdated material that ignores recent advances",
  "No feedback loop to validate understanding",
];

const solutions = [
  { icon: Target, text: "Structured paths from fundamentals to advanced" },
  { icon: BookOpen, text: "Project-based learning with real codebases" },
  { icon: Zap, text: "Content updated as the field evolves" },
  { icon: TrendingUp, text: "Quizzes and exercises to cement knowledge" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5 }
  }
};

const itemVariantsRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5 }
  }
};

export function ProblemSolutionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Problem Side */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 border border-destructive/20 mb-6"
            >
              <XCircle className="w-4 h-4 text-destructive" />
              <span className="text-sm font-medium text-destructive">The Challenge</span>
            </motion.div>
            
            <motion.h2 
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-bold mb-6"
            >
              Self-teaching AI is harder than it needs to be
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-muted-foreground mb-8"
            >
              Most people give up not because AI is too difficult, 
              but because they lack a clear path forward.
            </motion.p>

            <motion.div 
              className="space-y-4"
              variants={containerVariants}
            >
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/10"
                >
                  <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <span className="text-foreground">{problem}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Solution Side */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.div 
              variants={itemVariantsRight}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Our Approach</span>
            </motion.div>
            
            <motion.h2 
              variants={itemVariantsRight}
              className="text-3xl sm:text-4xl font-bold mb-6"
            >
              A curriculum that actually makes sense
            </motion.h2>
            
            <motion.p 
              variants={itemVariantsRight}
              className="text-muted-foreground mb-8"
            >
              We designed VibeAI around how engineers actually learn—through 
              structured progression and hands-on practice.
            </motion.p>

            <motion.div 
              className="space-y-4"
              variants={containerVariants}
            >
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  variants={itemVariantsRight}
                  whileHover={{ 
                    x: 4, 
                    boxShadow: "0 0 30px hsl(156 100% 50% / 0.1)",
                    transition: { duration: 0.2 } 
                  }}
                  className="flex items-start gap-3 p-4 rounded-xl glass-card-hover"
                >
                  <motion.div 
                    className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <solution.icon className="w-5 h-5 text-primary" />
                  </motion.div>
                  <span className="text-foreground pt-2">{solution.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}