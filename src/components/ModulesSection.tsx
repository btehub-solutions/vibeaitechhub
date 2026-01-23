import { motion, useInView, Variants } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";

const modules = [
  {
    id: 1,
    title: "Foundations",
    description: "What AI actually is, how it evolved, and where it's heading. The mental models that matter.",
    lessons: 8,
    duration: "4 hours",
    level: "Start Here",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: 2,
    title: "Machine Learning Core",
    description: "Supervised and unsupervised learning. Regression, classification, clustering—the building blocks.",
    lessons: 14,
    duration: "10 hours",
    level: "Fundamentals",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 3,
    title: "Deep Learning",
    description: "Neural networks from scratch. CNNs for vision, RNNs for sequences, Transformers for everything.",
    lessons: 18,
    duration: "14 hours",
    level: "Intermediate",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 4,
    title: "Language Models",
    description: "How GPT, BERT, and their successors work. Fine-tuning, prompting, and building with LLMs.",
    lessons: 12,
    duration: "10 hours",
    level: "Advanced",
    gradient: "from-orange-500/20 to-amber-500/20",
  },
  {
    id: 5,
    title: "Computer Vision",
    description: "Image classification, object detection, segmentation. Building systems that see.",
    lessons: 16,
    duration: "12 hours",
    level: "Advanced",
    gradient: "from-rose-500/20 to-red-500/20",
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

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % modules.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + modules.length) % modules.length);
  };

  return (
    <section ref={ref} id="modules" className="py-24 relative overflow-hidden">
      <div className="section-container">
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
              Twelve modules. <span className="gradient-text">One clear path.</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Each module builds on the last. Complete them in order, or jump to what you need.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="glass" 
                size="icon"
                onClick={prevSlide}
                className="rounded-full"
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
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Modules Carousel */}
        <motion.div 
          className="relative"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="flex gap-6 overflow-hidden">
            {modules.map((module, index) => {
              const position = (index - activeIndex + modules.length) % modules.length;
              const isVisible = position < 3;
              
              return (
                <motion.div
                  key={module.id}
                  animate={{ 
                    opacity: isVisible ? 1 : 0.3,
                    scale: isVisible ? 1 : 0.95,
                    x: `calc(-${activeIndex * 100}% - ${activeIndex * 24}px)`
                  }}
                  transition={{ duration: 0.5 }}
                  whileHover={isVisible ? { y: -8 } : {}}
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
                        <Button variant="hero" size="sm" className="w-full group/btn">
                          Explore Module
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {modules.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === activeIndex 
                  ? "w-8 bg-primary" 
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}