import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { XCircle, CheckCircle, Zap, Target, BookOpen, TrendingUp } from "lucide-react";

const problems = [
  "Overwhelming amount of scattered AI resources",
  "No clear learning path or progression",
  "Outdated content that doesn't reflect current trends",
  "Theory-heavy courses with no practical application",
];

const solutions = [
  { icon: Target, text: "Curated, structured learning paths" },
  { icon: BookOpen, text: "Expert-designed progressive modules" },
  { icon: Zap, text: "Real-time AI news and updates" },
  { icon: TrendingUp, text: "Hands-on projects and exercises" },
];

export function ProblemSolutionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Problem Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 border border-destructive/20 mb-6">
              <XCircle className="w-4 h-4 text-destructive" />
              <span className="text-sm font-medium text-destructive">The Problem</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Learning AI shouldn't feel like navigating a maze
            </h2>
            
            <p className="text-muted-foreground mb-8">
              Most aspiring AI professionals struggle with fragmented resources, 
              unclear roadmaps, and content that's either too theoretical or outdated.
            </p>

            <div className="space-y-4">
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/10"
                >
                  <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <span className="text-foreground">{problem}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Solution Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">The Solution</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              VibeAI provides a clear path to AI mastery
            </h2>
            
            <p className="text-muted-foreground mb-8">
              Our platform offers structured learning paths designed by industry experts, 
              combining theory with practical application and real-time updates.
            </p>

            <div className="space-y-4">
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + 0.1 * index }}
                  className="flex items-start gap-3 p-4 rounded-xl glass-card-hover"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <solution.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground pt-2">{solution.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
