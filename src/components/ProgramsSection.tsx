import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Video, ExternalLink, MapPin } from "lucide-react";

const programs = [
  {
    id: 1,
    title: "AI Foundations Bootcamp",
    type: "Training Program",
    description: "Intensive 4-week program covering ML fundamentals, neural networks, and practical implementation.",
    date: "Feb 15 - Mar 15, 2025",
    time: "10:00 AM - 2:00 PM WAT",
    format: "Live Online",
    spots: 25,
    spotsLeft: 8,
    price: "₦120,000",
  },
  {
    id: 2,
    title: "LLM Engineering Workshop",
    type: "Workshop",
    description: "Hands-on workshop on building production-ready applications with large language models.",
    date: "Feb 22, 2025",
    time: "2:00 PM - 6:00 PM WAT",
    format: "Hybrid",
    spots: 50,
    spotsLeft: 12,
    price: "₦35,000",
  },
  {
    id: 3,
    title: "Weekly AI Office Hours",
    type: "Meeting",
    description: "Open Q&A session with AI engineers. Bring your questions, projects, and challenges.",
    date: "Every Thursday",
    time: "4:00 PM WAT",
    format: "Zoom",
    spots: 100,
    spotsLeft: 67,
    price: "Free",
    meetingLink: "https://zoom.us/j/example",
  },
  {
    id: 4,
    title: "Computer Vision Masterclass",
    type: "Training Program",
    description: "Deep dive into image processing, object detection, and building vision AI systems.",
    date: "Mar 1 - Mar 28, 2025",
    time: "6:00 PM - 9:00 PM WAT",
    format: "Live Online",
    spots: 30,
    spotsLeft: 15,
    price: "₦95,000",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export function ProgramsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="programs" className="py-24 relative overflow-hidden">
      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm font-medium text-primary">Programs & Events</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Learn with <span className="gradient-text">live guidance</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our training programs, workshops, and community sessions led by practicing AI engineers.
          </p>
        </motion.div>

        {/* Programs Grid */}
        <motion.div 
          className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {programs.map((program) => (
            <motion.div
              key={program.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="glass-card p-6 relative overflow-hidden group"
            >
              {/* Type Badge */}
              <motion.div 
                className="inline-flex px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-4"
                whileHover={{ scale: 1.05 }}
              >
                {program.type}
              </motion.div>
              
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {program.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {program.description}
              </p>
              
              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{program.date}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{program.time}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  {program.format === "Zoom" ? (
                    <Video className="w-4 h-4 text-primary" />
                  ) : (
                    <MapPin className="w-4 h-4 text-primary" />
                  )}
                  <span>{program.format}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4 text-primary" />
                  <span>{program.spotsLeft} spots left</span>
                </div>
              </div>
              
              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <span className="text-lg font-semibold text-primary">{program.price}</span>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="hero" size="sm" className="gap-2">
                    {program.meetingLink ? (
                      <>
                        Join Meeting
                        <ExternalLink className="w-3 h-3" />
                      </>
                    ) : (
                      "Register Now"
                    )}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
