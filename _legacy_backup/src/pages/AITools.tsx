import { motion, useInView, Variants } from "framer-motion";
import { useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageTransition } from "@/components/PageTransition";
import { 
  Search, Filter, ExternalLink, TrendingUp, Zap, Star, 
  MessageSquare, Image, Code, Brain, Sparkles, Music, Video
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

// Mock categories for now, but could be dynamic
const categories = [
  { id: "all", label: "All Tools" },
  { id: "LLM", label: "Language Models" },
  { id: "Image Gen", label: "Image Generation" },
  { id: "Code", label: "Code Assistants" },
  { id: "Audio", label: "Audio & Speech" },
  { id: "Video", label: "Video AI" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export default function AITools() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: tools = [], isLoading } = useQuery({
    queryKey: ['tools'],
    queryFn: async () => {
      const response = await api.get('/tools/');
      return response.data;
    }
  });

  const filteredTools = Array.isArray(tools) ? tools.filter((tool: any) => { // Type check for tools
    const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }) : [];

  const getStatusColor = (status: boolean) => {
      return status ? "bg-orange-500/20 text-orange-400" : "bg-muted text-muted-foreground";
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navbar />
      <main className="pt-24 pb-16" ref={ref}>
        <div className="section-container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Trending AI Tools</span>
            </motion.div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Discover the best <span className="gradient-text">AI tools</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Curated collection of the most powerful AI tools for learning, building, and creating.
              Updated weekly by our engineering team.
            </p>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search tools..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="heroOutline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-2 mb-8 overflow-x-auto pb-2"
          >
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "hero" : "ghost"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className="whitespace-nowrap"
              >
                {category.label}
              </Button>
            ))}
          </motion.div>

          {/* Tools Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {isLoading ? (
                Array(6).fill(0).map((_, i) => (
                    <Skeleton key={i} className="h-64 rounded-xl" />
                ))
            ) : filteredTools.map((tool: any) => (
              <motion.div
                key={tool.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="glass-card p-6 relative overflow-hidden group cursor-pointer"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                         {/* Fallback Icon logic could be improved based on category */}
                         <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {tool.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm">
                        <Badge variant="outline" className="text-xs border-primary/20 text-primary bg-primary/5">
                            {tool.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {tool.is_trending && (
                      <Badge variant="secondary" className="bg-orange-500/10 text-orange-400 border-orange-500/20">
                        <Star className="w-3 h-3 mr-1 fill-orange-400" /> Hot
                      </Badge>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {tool.description}
                </p>

                {/* CTA */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="heroOutline" size="sm" className="w-full gap-2" asChild>
                    <a href={tool.url} target="_blank" rel="noopener noreferrer">
                        Learn More <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {!isLoading && filteredTools.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No tools found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
    </PageTransition>
  );
}
