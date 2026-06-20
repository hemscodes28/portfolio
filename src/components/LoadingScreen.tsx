import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DotField from './DotField';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 6000; // Slower counter (6.0 seconds)
    const start = performance.now();
    let animationFrameId: number;

    const updateProgress = (now: number) => {
      const elapsed = now - start;
      const currentProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(currentProgress);

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    // Complete loading sequence and transition to portfolio at 6.4s
    const completionTimer = setTimeout(() => {
      onComplete();
    }, 6400);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(completionTimer);
    };
  }, [onComplete]);

  // Split Calmness.. into individual characters for staggered animation
  const calmnessLetters = Array.from("Calmness..");

  // Container variants for staggered text animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.4,
      }
    }
  };

  // Letter variants
  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      filter: 'blur(8px)',
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any
      }
    }
  };

  // Kindness text variants
  const kindnessVariants = {
    hidden: { 
      opacity: 0, 
      y: 15, 
      letterSpacing: '0.05em', 
      filter: 'blur(10px)' 
    },
    visible: {
      opacity: 0.85,
      y: 0,
      letterSpacing: '0.15em',
      filter: 'blur(0px)',
      transition: {
        duration: 1.2,
        delay: 1.6,
        ease: [0.16, 1, 0.3, 1] as any
      }
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#ECEAE6] flex flex-col items-center justify-center overflow-hidden select-none">
      {/* DotField — interactive dot grid fills the full screen */}
      <div className="absolute inset-0 z-0">
        <DotField
          dotRadius={1.5}
          dotSpacing={14}
          bulgeStrength={67}
          glowRadius={160}
          sparkle={false}
          waveAmplitude={0}
          gradientFrom="rgba(0, 0, 0, 0.55)"
          gradientTo="rgba(0, 0, 0, 0.40)"
          showGlow={false}
        />
      </div>
      {/* Background Noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none z-10" />

      {/* Floating Fluid Ambient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Orb 1: Warm White */}
        <motion.div
          animate={{
            x: ['-10%', '10%', '-5%', '-10%'],
            y: ['-10%', '5%', '-15%', '-10%'],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute left-[-10%] top-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.4)_0%,transparent_70%)] blur-[60px]"
        />

        {/* Orb 2: Soft Light Gray */}
        <motion.div
          animate={{
            x: ['10%', '-10%', '5%', '10%'],
            y: ['10%', '-5%', '15%', '10%'],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute right-[-10%] bottom-[-10%] w-[65vw] h-[65vw] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.03)_0%,transparent_70%)] blur-[80px]"
        />
      </div>

      {/* Center Stage Content */}
      <div className="relative z-30 flex flex-col items-center justify-center px-6 text-center max-w-2xl">
        
        {/* SVG Kinetic Emblem Loader */}
        <div className="relative w-20 h-20 mb-10 flex items-center justify-center">
          <svg className="w-full h-full text-black/80" viewBox="0 0 100 100">
            {/* Outer dotted tracking track */}
            <circle
              cx="50"
              cy="50"
              r="42"
              className="stroke-black/5"
              strokeWidth="1"
              strokeDasharray="4 4"
              fill="none"
            />
            {/* Outer ring */}
            <motion.circle
              cx="50"
              cy="50"
              r="38"
              className="stroke-black/20"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: "25 150", strokeDashoffset: 0 }}
              animate={{ 
                strokeDashoffset: -200,
                rotate: 360
              }}
              transition={{
                strokeDashoffset: { repeat: Infinity, ease: "linear", duration: 3 },
                rotate: { repeat: Infinity, ease: "linear", duration: 5 }
              }}
            />
            
            {/* Inner reverse ring */}
            <motion.circle
              cx="50"
              cy="50"
              r="28"
              className="stroke-black/40"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: "15 100", strokeDashoffset: 0 }}
              animate={{ 
                strokeDashoffset: 150,
                rotate: -360
              }}
              transition={{
                strokeDashoffset: { repeat: Infinity, ease: "linear", duration: 2 },
                rotate: { repeat: Infinity, ease: "linear", duration: 4 }
              }}
            />

            {/* Central pulsing core */}
            <motion.circle
              cx="50"
              cy="50"
              r="3.5"
              className="fill-black/80"
              animate={{
                scale: [0.8, 1.4, 0.8],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </svg>
        </div>

        {/* Text Presentation Column */}
        <div className="flex flex-col items-center space-y-4">
          {/* Sentence 1: Calmness.. */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-[0.05em]"
          >
            {calmnessLetters.map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="text-3xl sm:text-4xl md:text-5xl text-black font-serif italic font-normal inline-block select-none"
              >
                {char}
              </motion.span>
            ))}
          </motion.div>

          {/* Divider Line */}
          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.15 }}
            transition={{ delay: 1.2, duration: 1.2, ease: "easeInOut" }}
            className="w-16 h-[1px] bg-black/30 origin-center"
          />

          {/* Sentence 2: Treat people with kindness */}
          <motion.h3
            variants={kindnessVariants}
            initial="hidden"
            animate="visible"
            className="text-base sm:text-lg md:text-xl text-black/70 font-serif italic font-normal tracking-[0.12em] select-none"
          >
            Treat people with kindness
          </motion.h3>

          {/* Dynamic Loading Progress Bar & Percentage Counter */}
          <div className="flex flex-col items-center mt-6 space-y-2">
            <motion.div 
              initial={{ opacity: 0, scaleX: 0.3 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1.6, duration: 1.0, ease: "easeOut" as any }}
              className="w-48 sm:w-64 h-[1px] bg-black/10 relative overflow-hidden rounded-full origin-center"
            >
              <div 
                className="absolute left-0 top-0 h-full bg-black shadow-[0_0_8px_rgba(0,0,0,0.2)] transition-all duration-100 ease-out" 
                style={{ width: `${progress}%` }}
              />
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="text-xs font-mono tracking-[0.2em] text-black/50 tabular-nums"
            >
              {progress}%
            </motion.span>
          </div>
        </div>
      </div>
    </div>
  );
};
