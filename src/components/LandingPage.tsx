import React, { useState } from 'react';

interface LandingPageProps {
  onBeginJourney: () => void;
}
export const LandingPage: React.FC<LandingPageProps> = ({ onBeginJourney }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black select-none">
      {/* Fullscreen Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Noise overlay */}
      <div className="absolute inset-0 z-10 noise-overlay opacity-[0.65] mix-blend-overlay pointer-events-none" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/30 via-transparent to-black/60 pointer-events-none" />

      {/* Centered Top Text (Above the person sitting in the video) */}
      <div className="absolute top-[22%] left-1/2 -translate-x-1/2 w-full max-w-3xl px-6 text-center z-20 pointer-events-none">
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide text-[#E1E0CC] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] font-serif"
        >
          Hem invites you beyond the clouds.
        </h1>
      </div>

      {/* Centered Bottom Text (Below the person sitting in the video) */}
      <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-full max-w-3xl px-6 text-center z-20 pointer-events-none">
        <p 
          className="text-lg sm:text-xl md:text-2xl font-normal text-[#E1E0CC]/80 drop-shadow-[0_3px_8px_rgba(0,0,0,0.8)] font-serif italic"
        >
          Where ideas take flight and innovation knows no limits.
        </p>
      </div>

      {/* INNOVATIVE IDE CODE EDITOR WIDGET (Bottom Right Corner) */}
      <div 
        className="!absolute bottom-6 right-6 sm:bottom-12 sm:right-12 z-20 w-[300px] sm:w-[350px] rounded-2xl liquid-glass border border-white/10 shadow-3xl overflow-hidden flex flex-col font-times"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Editor Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-black/50 border-b border-white/5 backdrop-blur-md">
          {/* OS Dot controls */}
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80" />
          </div>
          {/* Filename */}
          <span className="text-[10px] uppercase tracking-widest text-[#DEDBC8]/60 font-semibold">
            main.ts
          </span>
          <div className="w-10" />
        </div>

        {/* Code Block Workspace */}
        <div className="p-5 text-sm leading-relaxed text-left text-white/50 space-y-1.5 bg-black/20" style={{ fontFamily: "'Chelsea Market', cursive" }}>
          <div className="flex">
            <span className="text-white/20 select-none mr-4 w-4 text-right">1</span>
            <span className="text-[#DEDBC8]/90 font-bold">if</span>
            <span className="text-white/80">&nbsp;(dreams&nbsp;</span>
            <span className="text-white/40">!==</span>
            <span className="text-white/80">&nbsp;reality)&nbsp;&#123;</span>
          </div>

          <div className="flex">
            <span className="text-white/20 select-none mr-4 w-4 text-right">2</span>
            <span className="text-white/70">&nbsp;&nbsp;&nbsp;&nbsp;code();</span>
          </div>

          <div className="flex">
            <span className="text-white/20 select-none mr-4 w-4 text-right">3</span>
            <span className="text-white/70">&nbsp;&nbsp;&nbsp;&nbsp;learn();</span>
          </div>

          <div className="flex">
            <span className="text-white/20 select-none mr-4 w-4 text-right">4</span>
            <span className="text-white/70">&nbsp;&nbsp;&nbsp;&nbsp;innovate();</span>
          </div>

          {/* Interactive function call (Into the Unknown Button) */}
          <div className="flex items-center py-1.5 my-0.5 relative">
            <span className="text-white/20 select-none mr-4 w-4 text-right">5</span>
            <span className="text-[#DEDBC8] font-bold select-none">&nbsp;&nbsp;&nbsp;&nbsp;run</span>
            <span className="text-white/85">(</span>
            
            {/* Embedded Button box */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBeginJourney();
              }}
              className="mx-1.5 px-3 py-1 rounded border border-[#DEDBC8]/35 bg-black/45 text-[#DEDBC8] font-bold shadow-lg transition-all duration-300 hover:bg-[#DEDBC8]/15 hover:border-[#DEDBC8]/80 hover:shadow-[0_0_12px_rgba(222,219,200,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer flex items-center gap-1.5" style={{ fontFamily: "'Chelsea Market', cursive" }}
            >
              <span className="text-[9px] text-[#DEDBC8]/70 select-none">▶</span>
              "Into the Unknown"
            </button>

            <span className="text-white/85">);</span>
          </div>

          <div className="flex">
            <span className="text-white/20 select-none mr-4 w-4 text-right">6</span>
            <span className="text-white/80">&#125;</span>
          </div>
        </div>

        {/* Terminal Compilation Console Panel */}
        <div className="px-4 py-2 bg-black/60 border-t border-white/5 flex items-center justify-between text-[9px] text-[#DEDBC8]/45">
          <div className="flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full ${isHovered ? 'bg-[#DEDBC8] animate-pulse' : 'bg-[#DEDBC8]/20'}`} />
            <span>{isHovered ? 'Ready to execute compile' : 'System idling'}</span>
          </div>
          <span className="animate-pulse">_</span>
        </div>
      </div>
    </div>
  );
};
