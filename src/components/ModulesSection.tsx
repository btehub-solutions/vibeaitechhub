import { motion, useInView, Variants } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import modulesVisual from "@/assets/modules-visual.png";

const modules = [
  {
    id: 1,
    title: "Introduction to AI",
    description: "What AI actually is, how it evolved, and where it's heading. The mental models that matter.",
    lessons: 6,
    duration: "3 hours",
    level: "Start Here",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: 2,
    title: "AI Tools, Platforms & Ecosystems",
    description: "Navigate the AI landscape. Understand which tools to use and when to use them.",
    lessons: 8,
    duration: "5 hours",
    level: "Fundamentals",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 3,
    title: "Machine Learning Fundamentals",
    description: "Supervised and unsupervised learning. Regression, classification, clustering basics.",
    lessons: 14,
    duration: "10 hours",
    level: "Fundamentals",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 4,
    title: "Natural Language Processing",
    description: "Text processing, sentiment analysis, and understanding how machines read language.",
    lessons: 10,
    duration: "8 hours",
    level: "Intermediate",
    gradient: "from-orange-500/20 to-amber-500/20",
  },
  {
    id: 5,
    title: "Large Language Models",
    description: "How GPT, Claude, and Llama work. Architecture, training, and practical applications.",
    lessons: 12,
    duration: "10 hours",
    level: "Advanced",
    gradient: "from-rose-500/20 to-red-500/20",
  },
  {
    id: 6,
    title: "AI Fluency: Framework & Fundamentals",
    description: "Build intuition for AI capabilities and limitations. Think like an AI practitioner.",
    lessons: 8,
    duration: "6 hours",
    level: "Intermediate",
    gradient: "from-indigo-500/20 to-violet-500/20",
  },
  {
    id: 7,
    title: "Prompt Engineering",
    description: "Master the art of instructing AI. Techniques that get consistent, quality outputs.",
    lessons: 10,
    duration: "7 hours",
    level: "Intermediate",
    gradient: "from-cyan-500/20 to-sky-500/20",
  },
  {
    id: 8,
    title: "Generative AI",
    description: "Create with AI. Images, text, code, and beyond. Understand diffusion and generation.",
    lessons: 12,
    duration: "9 hours",
    level: "Advanced",
    gradient: "from-fuchsia-500/20 to-pink-500/20",
  },
  {
    id: 9,
    title: "Building RAGs",
    description: "Retrieval Augmented Generation. Connect AI to your data and documents.",
    lessons: 10,
    duration: "8 hours",
    level: "Advanced",
    gradient: "from-lime-500/20 to-green-500/20",
  },
  {
    id: 10,
    title: "Building Chatbots",
    description: "Design and deploy conversational AI. From simple bots to complex assistants.",
    lessons: 8,
    duration: "7 hours",
    level: "Advanced",
    gradient: "from-amber-500/20 to-yellow-500/20",
  },
  {
    id: 11,
    title: "AI Automation Agents",
    description: "Build autonomous systems. Multi-step reasoning, tool use, and agent architectures.",
    lessons: 14,
    duration: "12 hours",
    level: "Expert",
    gradient: "from-teal-500/20 to-emerald-500/20",
  },
  {
    id: 12,
    title: "Vibe Coding",
    description: "Code with AI as your partner. Workflow optimization and AI-assisted development.",
    lessons: 8,
    duration: "6 hours",
    level: "Intermediate",
    gradient: "from-primary/30 to-emerald-500/20",
  },
  {
    id: 13,
    title: "AI Ethics, Privacy & Safety",
    description: "Responsible AI practices. Bias, fairness, transparency, and regulatory considerations.",
    lessons: 6,
    duration: "4 hours",
    level: "Essential",
    gradient: "from-slate-500/20 to-gray-500/20",
  },
  {
    id: 14,
    title: "Career Paths in AI",
    description: "Navigate AI careers. Roles, skills, portfolios, and breaking into the industry.",
    lessons: 5,
    duration: "3 hours",
    level: "Career",
    gradient: "from-violet-500/20 to-purple-500/20",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export function ModulesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleCount = 3;
  const maxIndex = modules.length - visibleCount;

  const nextSlide = () => {
    setActiveIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section ref={ref} id="modules" className="py-24 relative overflow-hidden">
      {/* Background Visual */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.15 } : {}}
        transition={{ duration: 1.5 }}
      >
        <img 
          src={modulesVisual} 
          alt="" 
          className="w-full h-full object-cover"
          style={{ 
            maskImage: 'linear-gradient(to top, black 0%, transparent 50%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 50%, transparent 100%)'
          }}
        />
      </motion.div>
      
      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12"
        >
          <div className="max-w-2xl mb-6 lg:mb-0">
            <motion.div 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm font-medium text-primary">The Curriculum</span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Growing curriculum. <span className="gradient-text">One clear path.</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Continuously expanding modules designed by practitioners. Learn in order, or jump to what you need.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="glass" 
                size="icon"
                onClick={prevSlide}
                className="rounded-full"
                disabled={activeIndex === 0}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="glass" 
                size="icon"
                onClick={nextSlide}
                className="rounded-full"
                disabled={activeIndex >= maxIndex}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Modules Carousel */}
        <motion.div 
          className="relative overflow-hidden"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div 
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(calc(-${activeIndex * 100 / visibleCount}% - ${activeIndex * 24 / visibleCount}px))` }}
          >
            {modules.map((module) => (
              <motion.div
                key={module.id}
                whileHover={{ y: -8 }}
                className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <div className="glass-card p-6 h-full relative overflow-hidden cursor-pointer group">
                  {/* Gradient Accent */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-50`}
                    whileHover={{ opacity: 0.7 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="relative z-10">
                    {/* Level Badge */}
                    <motion.div 
                      className="inline-flex px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-4"
                      whileHover={{ scale: 1.05 }}
                    >
                      {module.level}
                    </motion.div>
                    
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{module.title}</h3>
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                      {module.description}
                    </p>
                    
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4" />
                        <span>{module.lessons} lessons</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{module.duration}</span>
                      </div>
                    </div>
                    
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link to={`/module/${module.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}>
                        <Button variant="hero" size="sm" className="w-full group/btn">
                          Explore Module
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-1 mt-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{activeIndex + 1}</span>
            <div className="w-24 h-1 bg-muted rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((activeIndex + visibleCount) / modules.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span>{modules.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
