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

// Mock Data - AI Tools
const categories = [
  { id: "all", label: "All Tools", count: 24 },
  { id: "llm", label: "Language Models", count: 8 },
  { id: "image", label: "Image Generation", count: 6 },
  { id: "code", label: "Code Assistants", count: 5 },
  { id: "audio", label: "Audio & Speech", count: 3 },
  { id: "video", label: "Video AI", count: 2 },
];

const tools = [
  {
    id: 1,
    name: "Claude 3.5 Sonnet",
    category: "llm",
    description: "Anthropic's most intelligent model. Excellent for complex reasoning, coding, and nuanced conversations.",
    status: "Hot",
    rating: 4.9,
    icon: MessageSquare,
    features: ["200K context", "Vision support", "Advanced reasoning"],
    link: "#",
  },
  {
    id: 2,
    name: "GPT-4 Turbo",
    category: "llm",
    description: "OpenAI's flagship model with improved instruction following and knowledge cutoff.",
    status: "Popular",
    rating: 4.8,
    icon: Brain,
    features: ["128K context", "Vision support", "Function calling"],
    link: "#",
  },
  {
    id: 3,
    name: "Midjourney v6",
    category: "image",
    description: "Industry-leading image generation with unprecedented photorealism and artistic control.",
    status: "Trending",
    rating: 4.9,
    icon: Image,
    features: ["Photorealistic", "Style control", "Inpainting"],
    link: "#",
  },
  {
    id: 4,
    name: "Cursor AI",
    category: "code",
    description: "AI-first code editor built on VS Code. Writes, refactors, and understands your codebase.",
    status: "New",
    rating: 4.7,
    icon: Code,
    features: ["Codebase aware", "Multi-file edits", "Chat interface"],
    link: "#",
  },
  {
    id: 5,
    name: "DALL-E 3",
    category: "image",
    description: "OpenAI's latest image model with improved prompt following and text rendering.",
    status: "Popular",
    rating: 4.6,
    icon: Image,
    features: ["Text in images", "ChatGPT integration", "Safe by design"],
    link: "#",
  },
  {
    id: 6,
    name: "GitHub Copilot",
    category: "code",
    description: "Your AI pair programmer. Suggests code completions and entire functions in real-time.",
    status: "Essential",
    rating: 4.7,
    icon: Code,
    features: ["IDE integration", "Multi-language", "Context aware"],
    link: "#",
  },
  {
    id: 7,
    name: "Llama 3 70B",
    category: "llm",
    description: "Meta's open-source powerhouse. Run locally or deploy with full control.",
    status: "Open Source",
    rating: 4.5,
    icon: MessageSquare,
    features: ["Open weights", "Local deployment", "Fine-tunable"],
    link: "#",
  },
  {
    id: 8,
    name: "ElevenLabs",
    category: "audio",
    description: "Realistic AI voice generation and cloning. Create lifelike speech in any voice.",
    status: "Trending",
    rating: 4.8,
    icon: Music,
    features: ["Voice cloning", "Multi-language", "Emotional range"],
    link: "#",
  },
  {
    id: 9,
    name: "Runway Gen-2",
    category: "video",
    description: "Generate and edit videos with AI. Text-to-video, image-to-video, and more.",
    status: "Hot",
    rating: 4.6,
    icon: Video,
    features: ["Text to video", "Motion brush", "Green screen"],
    link: "#",
  },
  {
    id: 10,
    name: "Perplexity AI",
    category: "llm",
    description: "AI-powered search engine that provides cited, conversational answers.",
    status: "Rising",
    rating: 4.7,
    icon: Sparkles,
    features: ["Real-time search", "Citations", "Pro search"],
    link: "#",
  },
  {
    id: 11,
    name: "Stable Diffusion XL",
    category: "image",
    description: "Open-source image generation. Full control, local deployment, infinite customization.",
    status: "Open Source",
    rating: 4.5,
    icon: Image,
    features: ["Open source", "LoRA support", "Local running"],
    link: "#",
  },
  {
    id: 12,
    name: "Gemini Pro",
    category: "llm",
    description: "Google's multimodal AI. Understands text, images, audio, and code natively.",
    status: "New",
    rating: 4.6,
    icon: Brain,
    features: ["Multimodal", "1M context", "Grounding"],
    link: "#",
  },
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

  const filteredTools = tools.filter((tool) => {
    const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hot": return "bg-red-500/20 text-red-400";
      case "Trending": return "bg-orange-500/20 text-orange-400";
      case "New": return "bg-blue-500/20 text-blue-400";
      case "Popular": return "bg-primary/20 text-primary";
      case "Essential": return "bg-purple-500/20 text-purple-400";
      case "Open Source": return "bg-green-500/20 text-green-400";
      case "Rising": return "bg-amber-500/20 text-amber-400";
      default: return "bg-muted text-muted-foreground";
    }
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
                <span className="ml-2 text-xs opacity-60">{category.count}</span>
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
            {filteredTools.map((tool) => (
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
                      <tool.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {tool.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-muted-foreground">{tool.rating}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(tool.status)}`}>
                    {tool.status}
                  </span>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {tool.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="text-xs px-2 py-1 rounded-md bg-surface-elevated text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="heroOutline" size="sm" className="w-full gap-2">
                    Learn More
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredTools.length === 0 && (
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
