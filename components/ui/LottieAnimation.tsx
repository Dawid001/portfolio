"use client";
import { useState, useEffect } from "react";

interface LottieAnimationProps {
  animationData: any;
  loop?: boolean;
  autoplay?: boolean;
  height?: number;
  width?: number;
}

const LottieAnimation = ({ 
  animationData, 
  loop = false, 
  autoplay = true, 
  height = 200, 
  width = 400 
}: LottieAnimationProps) => {
  const [isClient, setIsClient] = useState(false);
  const [LottieComponent, setLottieComponent] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    // Dynamically load lottie-react on client side only
    if (typeof window !== "undefined") {
      import("lottie-react")
        .then((mod) => {
          // Handle both default and named exports
          const Lottie = mod.default || mod;
          setLottieComponent(() => Lottie);
        })
        .catch((err) => {
          console.warn("Failed to load lottie-react:", err);
          setLottieComponent(null);
        });
    }
  }, []);

  // Don't render on server or if component not loaded
  if (!isClient || typeof window === "undefined" || !LottieComponent) {
    return null;
  }

  try {
    return (
      <LottieComponent 
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        style={{ height, width }}
      />
    );
  } catch (error) {
    // Silently fail if there's an error
    console.warn("Lottie animation error:", error);
    return null;
  }
};

export default LottieAnimation;
