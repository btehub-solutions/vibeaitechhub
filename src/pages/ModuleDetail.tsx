import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Clock, CheckCircle2, Circle, Play, Lock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";

const moduleData: Record<string, {
  title: string;
  description: string;
  duration: string;
  level: string;
  lessons: Array<{
    id: number;
    title: string;
    duration: string;
    completed: boolean;
    locked: boolean;
  }>;
}> = {
  "introduction-to-ai": {
    title: "Introduction to AI",
    description: "What AI actually is, how it evolved, and where it's heading. This foundational course builds the mental models that matter for understanding artificial intelligence. You'll explore the history of AI, key breakthroughs, and current capabilities.",
    duration: "3 hours",
    level: "Start Here",
    lessons: [
      { id: 1, title: "What is Artificial Intelligence?", duration: "25 min", completed: true, locked: false },
      { id: 2, title: "A Brief History of AI", duration: "30 min", completed: true, locked: false },
      { id: 3, title: "Types of AI: Narrow vs General", duration: "28 min", completed: false, locked: false },
      { id: 4, title: "Machine Learning vs Traditional Programming", duration: "32 min", completed: false, locked: false },
      { id: 5, title: "Current State of AI Technology", duration: "35 min", completed: false, locked: true },
      { id: 6, title: "The Future of AI: Trends and Predictions", duration: "30 min", completed: false, locked: true },
    ],
  },
  "prompt-engineering": {
    title: "Prompt Engineering",
    description: "Master the art of instructing AI. Learn techniques that get consistent, quality outputs from language models. From basic prompting to advanced chain-of-thought methods.",
    duration: "7 hours",
    level: "Intermediate",
    lessons: [
      { id: 1, title: "Understanding Prompts", duration: "20 min", completed: true, locked: false },
      { id: 2, title: "Basic Prompting Techniques", duration: "35 min", completed: true, locked: false },
      { id: 3, title: "Zero-shot and Few-shot Learning", duration: "40 min", completed: false, locked: false },
      { id: 4, title: "Chain of Thought Prompting", duration: "45 min", completed: false, locked: false },
      { id: 5, title: "System Prompts and Personas", duration: "35 min", completed: false, locked: true },
      { id: 6, title: "Prompt Templates and Patterns", duration: "40 min", completed: false, locked: true },
      { id: 7, title: "Debugging and Iterating Prompts", duration: "30 min", completed: false, locked: true },
      { id: 8, title: "Advanced Techniques", duration: "45 min", completed: false, locked: true },
      { id: 9, title: "Real-world Applications", duration: "35 min", completed: false, locked: true },
      { id: 10, title: "Best Practices and Common Mistakes", duration: "25 min", completed: false, locked: true },
    ],
  },
};

// Default module for any unspecified slug
const defaultModule = {
  title: "Module Overview",
  description: "This module is part of the VibeAI growing curriculum. Detailed content is being prepared and will be available soon.",
  duration: "Coming soon",
  level: "TBD",
  lessons: [
    { id: 1, title: "Introduction", duration: "15 min", completed: false, locked: false },
    { id: 2, title: "Core Concepts", duration: "30 min", completed: false, locked: true },
    { id: 3, title: "Practical Examples", duration: "25 min", completed: false, locked: true },
    { id: 4, title: "Summary & Next Steps", duration: "15 min", completed: false, locked: true },
  ],
};

export default function ModuleDetail() {
  const { slug } = useParams();
  const module = moduleData[slug || ""] || defaultModule;
  
  const completedCount = module.lessons.filter(l => l.completed).length;
  const progress = (completedCount / module.lessons.length) * 100;

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        
        <main className="pt-24 pb-16">
          <div className="section-container">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link to="/#modules">
                <Button variant="ghost" size="sm" className="mb-6 group">
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Curriculum
                </Button>
              </Link>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Module Header */}
                  <div className="glass-card p-8 mb-6">
                    <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-4">
                      {module.level}
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4">{module.title}</h1>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      {module.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>{module.lessons.length} lessons</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{module.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Lessons List */}
                  <div className="glass-card p-6">
                    <h2 className="text-xl font-semibold mb-6">Lesson Overview</h2>
                    <div className="space-y-3">
                      {module.lessons.map((lesson, index) => (
                        <motion.div
                          key={lesson.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                            lesson.locked 
                              ? "border-border/30 bg-muted/20 opacity-60" 
                              : lesson.completed
                                ? "border-primary/30 bg-primary/5"
                                : "border-border/50 bg-secondary/30 hover:border-primary/40 cursor-pointer"
                          }`}
                        >
                          <div className="flex-shrink-0">
                            {lesson.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-primary" />
                            ) : lesson.locked ? (
                              <Lock className="w-5 h-5 text-muted-foreground/50" />
                            ) : (
                              <Circle className="w-5 h-5 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className={`font-medium truncate ${lesson.locked ? "text-muted-foreground/60" : ""}`}>
                              {lesson.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span>{lesson.duration}</span>
                            {!lesson.locked && !lesson.completed && (
                              <Play className="w-4 h-4 text-primary" />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="glass-card p-6 sticky top-24"
                >
                  <h3 className="font-semibold mb-4">Your Progress</h3>
                  
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Completed</span>
                      <span className="font-medium">{completedCount}/{module.lessons.length}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      />
                    </div>
                  </div>

                  {/* Continue Button */}
                  <Button variant="hero" className="w-full mb-4">
                    {completedCount > 0 ? "Continue Learning" : "Start Module"}
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    Pick up where you left off
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
