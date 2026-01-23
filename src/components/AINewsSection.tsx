import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, ExternalLink } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "GPT-5 Announced: What We Know So Far",
    excerpt: "OpenAI reveals plans for their next-generation language model with unprecedented reasoning capabilities.",
    category: "Industry News",
    readTime: "5 min read",
    date: "2 hours ago",
  },
  {
    id: 2,
    title: "New Research: AI in Healthcare Diagnosis",
    excerpt: "Stanford researchers achieve 98% accuracy in early cancer detection using novel deep learning approaches.",
    category: "Research",
    readTime: "8 min read",
    date: "5 hours ago",
  },
  {
    id: 3,
    title: "EU AI Act: Implications for Developers",
    excerpt: "A comprehensive breakdown of the new regulatory framework and what it means for AI practitioners.",
    category: "Policy",
    readTime: "12 min read",
    date: "1 day ago",
  },
  {
    id: 4,
    title: "Tutorial: Building RAG Systems from Scratch",
    excerpt: "Step-by-step guide to implementing retrieval-augmented generation for your applications.",
    category: "Tutorial",
    readTime: "15 min read",
    date: "2 days ago",
  },
];

export function AINewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="news" className="py-24 relative">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      
      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12"
        >
          <div className="max-w-2xl mb-6 lg:mb-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-sm font-medium text-primary">AI News Feed</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Stay ahead with <span className="gradient-text">latest updates</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Curated AI news, research breakthroughs, and industry insights delivered to your dashboard.
            </p>
          </div>
          
          <Button variant="heroOutline" className="group">
            View All News
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* News Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Featured Article */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card-hover p-6 lg:row-span-2 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">
                {newsItems[0].category}
              </span>
              <span className="text-xs text-muted-foreground">{newsItems[0].date}</span>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
              {newsItems[0].title}
            </h3>
            
            <p className="text-muted-foreground mb-6 flex-grow">
              {newsItems[0].excerpt}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{newsItems[0].readTime}</span>
              </div>
              <Button variant="ghost" size="sm" className="group">
                Read More
                <ExternalLink className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </motion.div>

          {/* Other Articles */}
          {newsItems.slice(1).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + 0.1 * index }}
              className="glass-card-hover p-5 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2.5 py-1 rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                  {item.category}
                </span>
                <span className="text-xs text-muted-foreground">{item.date}</span>
              </div>
              
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
                {item.excerpt}
              </p>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>{item.readTime}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
