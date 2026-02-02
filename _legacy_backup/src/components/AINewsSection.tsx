import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, ExternalLink } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";
import dashboardMockup from "@/assets/dashboard-mockup.png";

const newsItems = [
  {
    id: 1,
    title: "Understanding the Latest in Multimodal Models",
    excerpt: "A breakdown of how GPT-4V, Gemini, and Claude handle images, audio, and text—and what it means for developers.",
    category: "Technical Deep Dive",
    readTime: "8 min",
    date: "This week",
  },
  {
    id: 2,
    title: "Fine-tuning vs RAG: When to Use What",
    excerpt: "Practical guidance on choosing between fine-tuning and retrieval-augmented generation for your use case.",
    category: "Engineering",
    readTime: "6 min",
    date: "3 days ago",
  },
  {
    id: 3,
    title: "The State of Open Source LLMs",
    excerpt: "Llama 3, Mistral, and the new wave of models you can run locally. What's actually production-ready.",
    category: "Industry",
    readTime: "10 min",
    date: "1 week ago",
  },
  {
    id: 4,
    title: "Building Agents That Actually Work",
    excerpt: "Lessons from deploying LLM agents in production. Common pitfalls and how to avoid them.",
    category: "Tutorial",
    readTime: "12 min",
    date: "2 weeks ago",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export function AINewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="news" className="py-24 relative overflow-hidden">
      {/* Background Accent */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      />
      
      {/* Right Side Dashboard Mockup */}
      <motion.div 
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[450px] pointer-events-none hidden xl:block"
        initial={{ opacity: 0, x: 100, rotateY: -15 }}
        animate={isInView ? { opacity: 0.3, x: 50, rotateY: -15 } : {}}
        transition={{ duration: 1.2, delay: 0.4 }}
        style={{ perspective: '1000px' }}
      >
        <OptimizedImage 
          src={dashboardMockup} 
          alt="" 
          className="w-full h-full object-contain rounded-xl"
          style={{ 
            maskImage: 'linear-gradient(to left, black 0%, transparent 80%)',
            WebkitMaskImage: 'linear-gradient(to left, black 0%, transparent 80%)'
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
              <span className="text-sm font-medium text-primary">Stay Current</span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              The field moves fast. <span className="gradient-text">We keep up.</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Weekly updates on what matters. Research, tools, and techniques—curated for practitioners.
            </p>
          </div>
          
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button variant="heroOutline" className="group">
              View Archive
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>

        {/* News Grid */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Featured Article */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="glass-card p-6 lg:row-span-2 flex flex-col cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.span 
                className="px-3 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary"
                whileHover={{ scale: 1.05 }}
              >
                {newsItems[0].category}
              </motion.span>
              <span className="text-xs text-muted-foreground">{newsItems[0].date}</span>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
              {newsItems[0].title}
            </h3>
            
            <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
              {newsItems[0].excerpt}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{newsItems[0].readTime}</span>
              </div>
              <motion.div whileHover={{ x: 4 }}>
                <Button variant="ghost" size="sm" className="group/btn">
                  Read
                  <ExternalLink className="w-4 h-4 ml-1 group-hover/btn:rotate-12 transition-transform" />
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Other Articles */}
          {newsItems.slice(1).map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="glass-card p-5 flex flex-col cursor-pointer group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2.5 py-1 rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                  {item.category}
                </span>
                <span className="text-xs text-muted-foreground">{item.date}</span>
              </div>
              
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
                {item.excerpt}
              </p>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>{item.readTime}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}