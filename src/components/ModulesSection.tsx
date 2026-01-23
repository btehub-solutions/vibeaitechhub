import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";

const modules = [
  {
    id: 1,
    title: "Foundations of AI",
    description: "Understand the core concepts, history, and fundamental principles of artificial intelligence.",
    lessons: 12,
    duration: "6 hours",
    level: "Beginner",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: 2,
    title: "Machine Learning Essentials",
    description: "Master supervised and unsupervised learning algorithms with practical implementations.",
    lessons: 18,
    duration: "12 hours",
    level: "Intermediate",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 3,
    title: "Deep Learning & Neural Networks",
    description: "Dive deep into neural network architectures, CNNs, RNNs, and transformers.",
    lessons: 24,
    duration: "18 hours",
    level: "Advanced",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 4,
    title: "Natural Language Processing",
    description: "Build AI systems that understand and generate human language.",
    lessons: 16,
    duration: "14 hours",
    level: "Advanced",
    gradient: "from-orange-500/20 to-amber-500/20",
  },
  {
    id: 5,
    title: "Computer Vision",
    description: "Create AI that can see and interpret visual information from the world.",
    lessons: 20,
    duration: "16 hours",
    level: "Advanced",
    gradient: "from-rose-500/20 to-red-500/20",
  },
];

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
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12"
        >
          <div className="max-w-2xl mb-6 lg:mb-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-sm font-medium text-primary">Learning Modules</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Explore our <span className="gradient-text">expert modules</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Progressive learning paths designed to take you from fundamentals to advanced AI mastery.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="glass" 
              size="icon"
              onClick={prevSlide}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button 
              variant="glass" 
              size="icon"
              onClick={nextSlide}
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        {/* Modules Carousel */}
        <div className="relative">
          <div className="flex gap-6 overflow-hidden">
            {modules.map((module, index) => {
              const position = (index - activeIndex + modules.length) % modules.length;
              const isVisible = position < 3;
              
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { 
                    opacity: isVisible ? 1 : 0.3,
                    scale: isVisible ? 1 : 0.95,
                    x: `calc(-${activeIndex * 100}% - ${activeIndex * 24}px)`
                  } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  <div className={`glass-card-hover p-6 h-full relative overflow-hidden`}>
                    {/* Gradient Accent */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-50`} />
                    
                    <div className="relative z-10">
                      {/* Level Badge */}
                      <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-4">
                        {module.level}
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-3">{module.title}</h3>
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
                      
                      <Button variant="hero" size="sm" className="w-full group">
                        Start Module
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {modules.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeIndex 
                  ? "w-8 bg-primary" 
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
