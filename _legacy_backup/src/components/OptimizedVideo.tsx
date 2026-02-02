import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface OptimizedVideoProps {
  src: string;
  className?: string;
  posterColor?: string;
}

export function OptimizedVideo({ 
  src, 
  className = "",
  posterColor = "hsl(0 0% 7%)"
}: OptimizedVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [canAutoplay, setCanAutoplay] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check if autoplay is supported
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setCanAutoplay(true);
        })
        .catch(() => {
          setCanAutoplay(false);
        });
    }
  }, []);

  return (
    <div className="relative w-full h-full" style={{ backgroundColor: posterColor }}>
      <motion.video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        onLoadedData={() => setIsLoaded(true)}
      >
        <source src={src} type="video/mp4" />
      </motion.video>
      
      {/* Fallback gradient for mobile/slow connections */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
