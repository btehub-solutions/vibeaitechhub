import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  GraduationCap, 
  BarChart3, 
  Newspaper, 
  Code2, 
  Users, 
  Shield,
  Brain,
  Rocket
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Expert-Crafted Modules",
    description: "Learn from carefully structured courses designed by AI industry professionals with real-world experience.",
  },
  {
    icon: Code2,
    title: "Hands-On Projects",
    description: "Apply your knowledge with practical exercises, coding challenges, and real-world mini-projects.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Monitor your learning journey with detailed analytics, completion rates, and personalized recommendations.",
  },
  {
    icon: Newspaper,
    title: "AI News Feed",
    description: "Stay updated with the latest AI developments, research breakthroughs, and industry trends.",
  },
  {
    icon: Brain,
    title: "Interactive Quizzes",
    description: "Reinforce your understanding with adaptive quizzes and immediate feedback on your performance.",
  },
  {
    icon: Users,
    title: "Community Learning",
    description: "Connect with fellow learners, share insights, and collaborate on projects.",
  },
  {
    icon: Rocket,
    title: "Career Pathways",
    description: "Get guided learning tracks tailored to specific AI career goals and industry requirements.",
  },
  {
    icon: Shield,
    title: "Enterprise Ready",
    description: "Secure, scalable platform suitable for individual learners and enterprise teams alike.",
  },
];

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="features" className="py-24 relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-medium text-primary">Platform Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Everything you need to <span className="gradient-text">master AI</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A comprehensive learning platform designed to take you from beginner to expert 
            with all the tools and resources you need.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * index }}
              className="glass-card-hover p-6 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
