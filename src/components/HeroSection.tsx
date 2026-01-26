import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { PageTransition } from "@/components/PageTransition";

export function HeroSection() {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Lazy load video only when component mounts
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // For mobile, load video with lower priority
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      video.preload = "none";
    }

    const handleCanPlay = () => setVideoLoaded(true);
    video.addEventListener("canplaythrough", handleCanPlay);
    
    return () => video.removeEventListener("canplaythrough", handleCanPlay);
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Video Background with Parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        {/* Gradient fallback for fast initial load */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background transition-opacity duration-700 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}
          aria-hidden="true"
        />
        <motion.video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover scale-110"
          initial={{ opacity: 0 }}
          animate={{ opacity: videoLoaded ? 1 : 0 }}
          transition={{ duration: 0.7 }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </motion.video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </motion.div>

      <motion.div className="section-container relative z-10" style={{ opacity }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <motion.div className="w-2 h-2 rounded-full bg-primary" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <span className="text-sm font-medium text-primary">Now in Public Beta</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
          >
            Learn AI the way
            <br />
            <span className="gradient-text">professionals do</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            From foundational concepts to production-ready skills. 
            A curriculum designed by engineers who build AI systems every day.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="hero" size="xl" className="group">
              Start Learning
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="heroOutline" size="xl" className="group">
              <Play className="w-5 h-5" />
              See How It Works
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 mt-16 pt-8 border-t border-border/50"
          >
            {[
              { value: "Growing", label: "Module Library" },
              { value: "40+", label: "Hands-on Projects" },
              { value: "Free", label: "To Get Started" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}