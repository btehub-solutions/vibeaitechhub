import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { StaticImageData } from "next/image";

interface OptimizedImageProps {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
}

export function OptimizedImage({ 
  src, 
  alt, 
  className = "", 
  style,
  priority = false 
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const imageSrc = typeof src === 'string' ? src : src.src;

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Handle error state gracefully
  const handleError = () => {
    console.warn(`Failed to load image: ${imageSrc}`);
  };

  return (
    <motion.img
      ref={imgRef}
      src={isInView ? imageSrc : undefined}
      alt={alt}
      className={className}
      style={style}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      onLoad={() => setIsLoaded(true)}
      onError={handleError}
    />
  );
}
