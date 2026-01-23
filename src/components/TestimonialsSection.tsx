import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "David Park",
    role: "Software Engineer transitioning to ML",
    content: "Finally, a course that doesn't assume I'm either a complete beginner or already have a PhD. The pacing is perfect for working engineers.",
  },
  {
    name: "Amara Okonkwo",
    role: "Product Manager at a Series B startup",
    content: "I needed to understand AI well enough to make product decisions. This gave me exactly that—no more, no less. Highly practical.",
  },
  {
    name: "James Liu",
    role: "CS Student, UC Berkeley",
    content: "Way more useful than my university's ML course. The projects here are things I can actually show in interviews.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.6 }
  }
};

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="testimonials" className="py-24 relative">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm font-medium text-primary">From the Community</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            People who <span className="gradient-text">actually finished</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Not paid endorsements. Real feedback from learners at different stages.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass-card p-6 relative group"
            >
              <motion.div
                initial={{ opacity: 0.1 }}
                whileHover={{ opacity: 0.2, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                <Quote className="w-12 h-12 text-primary absolute top-6 right-6" />
              </motion.div>
              
              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed relative z-10">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/50 to-primary/20 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <span className="text-sm font-semibold text-primary-foreground">
                    {testimonial.name.charAt(0)}
                  </span>
                </motion.div>
                <div>
                  <div className="font-medium text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}