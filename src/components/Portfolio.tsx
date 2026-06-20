import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MessageCircle, Compass } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import type { ProjectData } from './ProjectModal';
import Spline from '@splinetool/react-spline';
import { Logo } from './Logo';
import GooeyNav from './GooeyNav';

interface PortfolioProps {
  onBackToLanding: () => void;
  onOpenProject: (project: ProjectData) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onOpenProject }) => {
  const [isSplineLoading, setIsSplineLoading] = useState(true);

  // Typewriter effect state
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = ['Fullstack Developer', 'Freelancer'];

  useEffect(() => {
    const handleType = () => {
      const current = loopNum % words.length;
      const fullText = words[current];

      if (isDeleting) {
        setTypedText(fullText.substring(0, typedText.length - 1));
        setTypingSpeed(75);
      } else {
        setTypedText(fullText.substring(0, typedText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && typedText === fullText) {
        setTypingSpeed(2000); // pause at full word
        setIsDeleting(true);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500); // pause before starting next word
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, loopNum, typingSpeed]);

  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogoExpanded, setIsLogoExpanded] = useState(false);

  // Scroll-aware logo collapse
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
        setIsLogoExpanded(false); // auto-collapse on any scroll
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Spline watermark removal hook
  useEffect(() => {
    const removeWatermark = () => {
      // Find spline-viewers and hide their logo elements in shadowRoot
      const viewers = document.querySelectorAll('spline-viewer');
      viewers.forEach((viewer) => {
        if (viewer.shadowRoot) {
          const logo = viewer.shadowRoot.querySelector('#logo') || 
                       viewer.shadowRoot.querySelector('a[href*="spline.design"]');
          if (logo) {
            (logo as HTMLElement).style.display = 'none';
          }
        }
      });

      // Find any anchor tags in the main DOM pointing to spline
      const anchors = document.querySelectorAll('a');
      anchors.forEach((anchor) => {
        if (anchor.href && anchor.href.includes('spline.design')) {
          anchor.style.display = 'none';
        }
      });

      // Find elements by id
      const logoId = document.getElementById('logo');
      if (logoId) {
        logoId.style.display = 'none';
      }
    };

    const interval = setInterval(removeWatermark, 100);
    const timeout = setTimeout(() => clearInterval(interval), 12000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // Projects list (Contents)
  const projects: ProjectData[] = [
    {
      id: 'acoustic',
      number: '01',
      title: 'Acoustic Canopy',
      description: 'IoT / Arduino-based project for environmental sound monitoring and analysis',
      subtitle: 'An IoT and Arduino-based environmental sound monitoring system designed to capture, analyze, and visualize acoustic data for ecological research and urban planning applications.',
      problem: [
        'Urban areas and natural environments require continuous monitoring of sound levels for environmental assessment.',
        'Traditional sound monitoring methods are expensive and difficult to deploy at scale.',
        'Need for real-time acoustic data collection to understand environmental patterns and noise pollution.',
        'Lack of accessible tools for researchers and city planners to gather comprehensive sound data.'
      ],
      built: [
        'Developed an Arduino-based sound sensor network capable of capturing ambient noise levels in real-time.',
        'Implemented IoT connectivity to transmit acoustic data wirelessly to a central monitoring system.',
        'Created data visualization dashboard to display sound patterns, peak levels, and temporal trends.',
        'Designed low-power sensor nodes for field deployment in remote locations.',
        'Built calibration system to ensure accurate decibel measurements across different environments.'
      ],
      tech: ['IoT', 'Arduino', 'Sensors', 'WiFi/LoRa', 'Python', 'Data Visualization', 'Cloud Storage'],
      cert: 'perpetualfest.pdf'
    },
    {
      id: 'train',
      number: '02',
      title: 'AI-Powered Train Traffic Control',
      description: 'Maximizing section throughput using precise AI-driven train traffic management',
      subtitle: 'A conceptual AI-based approach proposed to improve railway traffic efficiency through predictive scheduling and safety-aware decision support, recognized in the Smart India Hackathon.',
      problem: [
        'Railway networks experience frequent congestion, leading to delays and reduced operational efficiency.',
        'Traditional signaling systems lack the ability to dynamically optimize train spacing in real time.',
        'Manual traffic control methods are reactive, causing cascading delays across routes.',
        'Need for intelligent, data-driven systems to maximize track utilization while maintaining safety protocols.'
      ],
      built: [
        'Designed an AI-powered conceptual framework to optimize train spacing and scheduling.',
        'Proposed machine learning-based analysis of historical railway data to identify bottlenecks.',
        'Conceptualized a predictive decision-support system to assist railway traffic controllers.',
        'Designed logic for delay prediction and proactive scheduling adjustment recommendations.',
        'Created system architecture representing AI-assisted railway traffic control.'
      ],
      outcome: [
        'Presented as a conceptual AI-based railway control solution at Smart India Hackathon internal round.',
        'Secured 3rd place at the department-level internal hackathon based on innovation and feasibility.'
      ],
      tech: ['Artificial Intelligence', 'Machine Learning', 'Decision-Support Systems', 'Simulation', 'System Design'],
      cert: 'sih.pdf'
    },
    {
      id: 'contractiq',
      number: '03',
      title: 'ContractIQ - Financial Contract Analytics',
      description: 'AI-powered financial risk intelligence platform standardizing contracts and simulating future outcomes',
      subtitle: 'An intelligent digital layer for financial contracts that standardizes agreements into ACTUS models, simulates cashflow outcomes, predicts default risk, and automates tracking with blockchain.',
      problem: [
        'Banks struggle to assess credit risk, default probabilities, and expected portfolio losses in real time.',
        'Lack of standardization (like the ACTUS framework) makes future cashflow simulation and stress testing difficult.',
        'Manual compliance reporting to financial regulators is slow, expensive, and prone to human errors.',
        'Lack of transparency, auditability, and tamper-proof verification in contract execution and risk management.'
      ],
      built: [
        'Developed ACTUS Conversion Engine to standardize uploaded contracts into machine-readable financial models (e.g. PAM).',
        'Built Cashflow Simulation & Liquidity Forecasting Engine to project future payments and predict portfolio liquidity risks.',
        'Implemented AI Risk Prediction Module to compute default probabilities, risk categories, and expected losses.',
        'Created Scenario Stress Testing framework to simulate economic shocks like interest rate spikes and recessions.',
        'Integrated AI Contract Negotiation Agent suggesting optimal contract terms (rates, tenure, collateral) for high-risk profiles.',
        'Built Blockchain Smart Contract Automation to create tamper-proof logs containing contract hashes and parameters.',
        'Developed Automated Regulatory Reporting and a Dual Dashboard system for internal bank decision-making and regulator monitoring.'
      ],
      tech: ['ACTUS', 'AI Risk Prediction', 'Machine Learning', 'Blockchain', 'React', 'TypeScript', 'Data Science', 'Financial APIs'],
      github: 'https://github.com/Balamurali-006/Delta_build.git'
    },
    {
      id: 'gold',
      number: '04',
      title: 'Gold Rate Prediction',
      description: 'Predictive analytics model for forecasting gold prices using historical data',
      subtitle: 'A comprehensive machine learning system that forecasts gold prices using historical market data, economic indicators, and time-series analysis to provide investors with data-driven insights.',
      problem: [
        'Gold prices are highly volatile and influenced by multiple complex economic factors.',
        'Investors and traders need accurate forecasting tools to make data-driven, informed decisions.',
        'Traditional analysis methods struggle to capture non-linear patterns in gold price movements.',
        'Lack of accessible predictive models for retail investors.'
      ],
      built: [
        'Developed regression models to predict future gold prices based on historical trends.',
        'Implemented time-series analysis techniques to capture seasonal patterns.',
        'Built feature engineering pipeline incorporating multiple economic variables.',
        'Trained multiple models (Linear Regression, Random Forest, Gradient Boosting) and compared metrics.',
        'Created visualization tools to display predicted vs actual prices and confidence intervals.'
      ],
      tech: ['Machine Learning', 'Python', 'Regression Analysis', 'Time-Series', 'Scikit-learn', 'Pandas', 'NumPy'],
      github: 'https://github.com/hemscodes28/Gold-Rate-Prediction'
    },
    {
      id: 'aircraft',
      number: '05',
      title: 'Aircraft Prediction System',
      description: 'Machine learning system for aircraft identification and classification',
      subtitle: 'An advanced machine learning and deep learning system designed to identify and classify different aircraft types using image recognition, supporting aviation security, air traffic management, and defense applications.',
      problem: [
        'Aircraft identification is critical for air defense, aviation security, and traffic management.',
        'Manual visual identification is time-consuming and requires specialized expert training.',
        'Need for automated systems that can quickly and accurately classify aircraft models from visual feeds.',
        'Challenges in distinguishing between highly similar aircraft models with subtle design differences.'
      ],
      built: [
        'Developed deep learning models for multi-class aircraft classification from images.',
        'Created comprehensive dataset preprocessing and image pipeline.',
        'Implemented Convolutional Neural Networks (CNNs) to extract visual features.',
        'Built data augmentation techniques to improve model robustness and reduce overfitting.',
        'Implemented transfer learning using pre-trained computer vision architectures for high accuracy.'
      ],
      tech: ['Deep Learning', 'Computer Vision', 'CNNs', 'TensorFlow', 'Python', 'Transfer Learning', 'Scikit-learn'],
      github: 'https://github.com/hemscodes28/Airbus-Aircraft-Prediction'
    },
    {
      id: 'socialmedia',
      number: '06',
      title: 'AI Social Media Automation',
      description: 'Automated content scheduling and generation platform using generative AI and platform APIs',
      subtitle: 'A full-stack automation system that leverages AI models to generate high-engagement social media content, schedule postings, and automatically publish posts directly to Twitter and LinkedIn.',
      problem: [
        'Content creators and businesses struggle to maintain a consistent posting schedule across multiple platforms.',
        'Manually drafting, formatting, and scheduling posts for different audiences is repetitive and time-consuming.',
        'Lack of automated content suggestions and optimization for peak engagement hours.'
      ],
      built: [
        'Integrated Large Language Models (LLM APIs) to generate high-quality post drafts, hashtags, and visual prompts.',
        'Developed dynamic scheduler with cron tasks to queue and publish content at high-traffic times automatically.',
        'Connected social media APIs (Twitter/X and LinkedIn) to handle authentication and direct automated publishing.',
        'Designed intuitive dashboard interface allowing users to preview posts, manage the queue, and view analytics.'
      ],
      tech: ['Generative AI', 'Node.js', 'Express', 'React', 'TypeScript', 'Social Media APIs (Twitter/LinkedIn)', 'MongoDB', 'Cron Jobs'],
      github: 'https://github.com/hemscodes28/SocialMediaPost'
    }
  ];

  // Technical Skills List
  const skills = [
    { category: 'Programming Languages', list: ['Python', 'C', 'SQL'] },
    { category: 'Frontend Development', list: ['HTML', 'CSS', 'JavaScript', 'React'] },
    { category: 'AI & Data Science', list: ['Pandas', 'NumPy', 'Scikit-learn', 'Data Wrangling'] },
    { category: 'Machine Learning', list: ['Google Colab', 'TensorFlow', 'Deep Learning', 'CNNs'] },
    { category: 'Data Visualization', list: ['Seaborn', 'Matplotlib'] },
    { category: 'Project Management', list: ['GitHub', 'Git Version Control'] }
  ];

  // Animation constants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } }
  };

  return (
    <div className="mainframe-theme min-h-screen relative selection:bg-black selection:text-white bg-[#ECEAE6]">
      {/* Brand Logo — full on load, collapses to HR badge on scroll */}
      <div
        className={`fixed z-50 bg-[#ECEAE6] transition-all duration-300 ease-in-out select-none
          ${
            isScrolled && !isLogoExpanded
              ? 'top-3 left-4 sm:top-3 sm:left-6 w-10 h-10 rounded-full shadow-md border border-black/10 flex items-center justify-center cursor-pointer hover:shadow-lg hover:scale-110'
              : 'top-1 left-4 sm:top-2 sm:left-8 w-20 h-20 sm:w-28 sm:h-28 rounded-xl'
          }`
        }
        onMouseEnter={() => { if (isScrolled) setIsLogoExpanded(true); }}
        onMouseLeave={() => { if (isScrolled) setIsLogoExpanded(false); }}
        onClick={() => { if (isScrolled && !isLogoExpanded) setIsLogoExpanded(true); }}
      >
        {isScrolled && !isLogoExpanded ? (
          // Mini sunglasses badge (unique branded icon)
          <svg
            viewBox="14 28 72 26"
            className="w-[28px] pointer-events-none drop-shadow-sm"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Top Bar */}
            <rect x="22" y="32" width="56" height="3.5" rx="1.5" fill="#2C3E50" />
            {/* Left Frame */}
            <rect x="24" y="35" width="22" height="14" rx="4" fill="none" stroke="#2C3E50" strokeWidth="3" />
            {/* Right Frame */}
            <rect x="54" y="35" width="22" height="14" rx="4" fill="none" stroke="#2C3E50" strokeWidth="3" />
            {/* Bridge */}
            <path d="M 46,37.5 Q 50,35.5 54,37.5" fill="none" stroke="#2C3E50" strokeWidth="3" />
            {/* Left Temple */}
            <path d="M 24,34 Q 19,34 17,38" fill="none" stroke="#2C3E50" strokeWidth="2.5" strokeLinecap="round" />
            {/* Right Temple */}
            <path d="M 76,34 Q 81,34 83,38" fill="none" stroke="#2C3E50" strokeWidth="2.5" strokeLinecap="round" />
            {/* Left shutter lines */}
            <line x1="25.5" y1="38" x2="44.5" y2="38" stroke="#2C3E50" strokeWidth="1.8" />
            <line x1="25.5" y1="41" x2="44.5" y2="41" stroke="#2C3E50" strokeWidth="1.8" />
            <line x1="26.5" y1="44" x2="43.5" y2="44" stroke="#2C3E50" strokeWidth="1.8" />
            {/* Right shutter lines */}
            <line x1="55.5" y1="38" x2="74.5" y2="38" stroke="#2C3E50" strokeWidth="1.8" />
            <line x1="55.5" y1="41" x2="74.5" y2="41" stroke="#2C3E50" strokeWidth="1.8" />
            <line x1="56.5" y1="44" x2="73.5" y2="44" stroke="#2C3E50" strokeWidth="1.8" />
          </svg>
        ) : (
          // Full logo
          <Logo
            onClick={() => {
              setActiveSection('home');
              window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
            }}
            className="w-full h-full"
          />
        )}
      </div>

      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center bg-white/70 backdrop-blur-md border border-black/5 rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.06)] px-2 py-1.5 max-w-[95vw] sm:max-w-none overflow-x-auto no-scrollbar">
        <GooeyNav
          items={[
            { label: 'Home' },
            { label: 'About' },
            { label: 'Skills' },
            { label: 'Projects' },
            { label: 'Resume' },
            { label: 'Contact' },
          ]}
          initialActiveIndex={['home', 'about', 'skills', 'projects', 'resume', 'contact'].indexOf(activeSection)}
          onItemClick={(index) => {
            const ids = ['home', 'about', 'skills', 'projects', 'resume', 'contact'];
            setActiveSection(ids[index]);
            window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
          }}
          particleCount={15}
          particleDistances={[90, 10]}
          particleR={100}
          animationTime={600}
          timeVariance={300}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        />
      </div>

      {/* HERO SECTION (HOME) */}
      <div className={activeSection === 'home' ? 'block' : 'hidden'}>
        <section id="home" className="relative z-10 w-full min-h-screen flex flex-col justify-center px-5 sm:px-8 md:px-12 py-24 bg-[#ECEAE6] text-black">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Centered Text & Typewriter */}
            <div className="lg:col-span-7 space-y-6 text-center flex flex-col items-center justify-center py-8">
              <div className="space-y-4 w-full">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase font-playfair text-[#00bfff] drop-shadow-[0_0_20px_rgba(0,191,255,0.2)]">
                  The Digital Realm of Hemkumar
                </h1>
                <div className="text-lg sm:text-xl md:text-2xl font-light uppercase tracking-widest text-black/60 font-['Space_Grotesk'] min-h-[36px] flex items-center justify-center">
                  <span>{typedText}</span>
                  <span className="w-[3px] h-6 bg-[#00bfff] ml-1.5 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Right Column: Spline 3D Scene */}
            <div className="lg:col-span-5 h-[350px] sm:h-[450px] lg:h-[600px] w-full relative flex items-center justify-center bg-black/5 rounded-3xl border border-black/5 overflow-hidden shadow-inner">
              {isSplineLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#ECEAE6] transition-opacity duration-300">
                  <div className="w-10 h-10 border-2 border-black border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              <div className="w-full h-full scale-[1.0] transition-transform duration-500">
                <Spline
                  scene="https://prod.spline.design/s37dBkN37al8PSnt/scene.splinecode"
                  onLoad={() => setIsSplineLoading(false)}
                  className="w-full h-full"
                />
              </div>
            </div>

          </div>
        </section>
      </div>

      {/* SUB PAGES CONTENT (ABOUT, SKILLS, PROJECTS, CONTACT) */}
      <div className={activeSection !== 'home' ? 'block' : 'hidden'}>
        <div className="relative z-20 bg-[#ECEAE6] text-black pt-36 pb-16 min-h-[calc(100vh-80px)]">
          <main className="max-w-7xl mx-auto px-6">
            <AnimatePresence mode="wait">
              {activeSection === 'about' && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  {/* ABOUT SECTION */}
                  <section id="about" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                      {/* Left Column: Content */}
                      <div className="lg:col-span-7 space-y-5 text-left">
                        <div className="space-y-1.5">
                          <span className="text-[11px] uppercase tracking-widest text-black/45 font-medium block">
                            Profile
                          </span>
                          <h2 className="text-2xl sm:text-4xl font-normal text-black font-mainframe-heading">
                            More Than Just a Developer
                          </h2>
                        </div>

                        <div className="space-y-3.5 text-black/75 text-sm sm:text-base leading-relaxed font-light font-sans">
                          <p className="font-semibold text-black/90">
                            I believe great technology starts with curiosity.
                          </p>
                          <p>
                            Currently pursuing Artificial Intelligence and Data Science at Coimbatore Institute of Technology, I'm fascinated by how data, intelligence, and creativity can come together to solve real-world problems.
                          </p>
                          <p>
                            I enjoy creating things that are not only functional but memorable. For me, every project is an opportunity to learn, innovate, and leave something better than I found it.
                          </p>
                        </div>

                        <div className="space-y-3 pt-2">
                          <h3 className="text-xs uppercase tracking-wider text-black/50 font-bold font-sans">
                            Current Interests
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {[
                              "Artificial Intelligence",
                              "Intelligent Automation",
                              "Full-Stack Development",
                              "User Experience & Design",
                              "Building Projects That Matter"
                            ].map((interest, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2.5 bg-white/50 border border-black/5 rounded-xl p-2.5 hover:bg-white/90 hover:border-black/10 hover:shadow-sm transition-all duration-300"
                              >
                                <span className="text-sm text-black/60">⚡</span>
                                <span className="text-xs sm:text-sm font-medium text-black/80 font-sans">{interest}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-black/10">
                          <blockquote className="border-l-2 border-black/35 pl-4 italic text-black/75 text-sm sm:text-base leading-relaxed">
                            "The future isn't a destination we arrive at—it's a masterpiece we build."
                            <span className="block text-xs font-bold uppercase tracking-wider text-black/45 mt-1.5 not-italic font-sans">
                              — Hemkumar
                            </span>
                          </blockquote>
                        </div>
                      </div>

                      {/* Right Column: MacBook-styled Photo Widget */}
                      <div className="lg:col-span-5 flex justify-center w-full">
                        <div className="w-full max-w-[280px] sm:max-w-[345px] aspect-[4/5] rounded-2xl bg-black border border-white/10 shadow-2xl overflow-hidden flex flex-col font-times relative group">
                          {/* Glass highlight overlay */}
                          <div className="absolute inset-0 z-10 noise-overlay opacity-[0.03] mix-blend-overlay pointer-events-none" />
                          
                          {/* Editor Title Bar */}
                          <div className="flex items-center justify-between px-4 py-2.5 bg-black/60 border-b border-white/5 backdrop-blur-md z-20">
                            {/* OS Dot controls */}
                            <div className="flex space-x-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/85" />
                              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/85" />
                              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/85" />
                            </div>
                            {/* Filename */}
                            <span className="text-[10px] uppercase tracking-widest text-[#DEDBC8]/65 font-semibold font-mono">
                              unwritten.story
                            </span>
                            <div className="w-10" />
                          </div>

                          {/* Photo Space */}
                          <div className="relative flex-1 w-full h-full overflow-hidden bg-[#121212] z-20">
                            <img
                              src="/hemkumar.jpeg"
                              alt="Hemkumar"
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </motion.div>
              )}

              {activeSection === 'skills' && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  {/* SKILLS SECTION */}
                  <section id="skills" className="space-y-10">
                    <div className="space-y-2 text-center sm:text-left">
                      <span className="text-[11px] uppercase tracking-widest text-black/45 font-medium">Capabilities</span>
                      <h2 className="text-3xl sm:text-5xl font-normal text-black font-mainframe-heading">
                        Technical Expertise
                      </h2>
                    </div>

                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: '-100px' }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                      {skills.map((skill, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className="bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-black/5 flex flex-col justify-between hover:border-black/15 hover:bg-white/90 transition-all duration-300 text-left shadow-sm hover:shadow-md"
                        >
                          <div className="space-y-4">
                            <h3 className="text-base font-semibold text-black/85 tracking-wide border-b border-black/5 pb-2">
                              {skill.category}
                            </h3>
                            <ul className="space-y-2.5">
                              {skill.list.map((item, idx) => (
                                <li key={idx} className="flex items-center text-sm text-black/70">
                                  <span className="w-1.5 h-1.5 rounded-full bg-black/35 mr-2.5" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </section>
                </motion.div>
              )}

              {activeSection === 'projects' && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  {/* PROJECTS SECTION */}
                  <section id="projects" className="space-y-10">
                    <div className="space-y-2 text-center sm:text-left">
                      <span className="text-[11px] uppercase tracking-widest text-black/45 font-medium">Works</span>
                      <h2 className="text-3xl sm:text-5xl font-normal text-black font-mainframe-heading">
                        Featured Projects
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {projects.map((project, index) => (
                        <div
                          key={project.id}
                          onClick={() => onOpenProject(project)}
                          className={`bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-black/5 flex flex-col justify-between cursor-pointer group hover:bg-white/95 hover:border-[#00bfff]/25 hover:shadow-[0_20px_50px_rgba(0,191,255,0.08)] transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] text-left ${
                            index === 2 || index === 5 ? 'md:col-span-2' : ''
                          }`}
                        >
                          <div className="space-y-6">
                            {/* Top indicator */}
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold tracking-widest text-black/45 uppercase group-hover:text-[#00bfff]/80 transition-colors duration-300">
                                Project {project.number}
                              </span>
                              <span className="text-xs text-black/35 group-hover:text-[#00bfff] transition-colors flex items-center gap-1 font-mono">
                                Interact <Compass className="w-3.5 h-3.5 animate-spin-slow group-hover:rotate-180 group-hover:scale-110 transition-all duration-500" />
                              </span>
                            </div>

                            {/* Title & Desc */}
                            <div className="space-y-2">
                              <h3 className="text-2xl sm:text-4xl font-normal text-black tracking-tight font-mainframe-heading group-hover:text-[#00bfff] transition-colors duration-300">
                                {project.title}
                              </h3>
                              <p className="text-black/65 text-sm leading-relaxed font-light">
                                {project.description}
                              </p>
                            </div>
                          </div>

                          {/* Tech tags list */}
                          <div className="flex flex-wrap gap-2 mt-8 pt-4 border-t border-black/5">
                            {project.tech.slice(0, 3).map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-3 py-1 rounded-md text-[10px] font-semibold bg-black/5 text-black/75 border border-black/10 group-hover:bg-[#00bfff]/10 group-hover:text-[#0088cc] group-hover:border-[#00bfff]/25 transition-all duration-300"
                              >
                                {tag}
                              </span>
                            ))}
                            {project.tech.length > 3 && (
                              <span className="px-3 py-1 rounded-md text-[10px] font-semibold bg-black/5 text-black/40 group-hover:bg-black/5 group-hover:text-black/60 transition-colors duration-300">
                                +{project.tech.length - 3} More
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </motion.div>
              )}

              {activeSection === 'resume' && (
                <motion.div
                  key="resume"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="space-y-8 flex flex-col items-center"
                >
                  <div className="space-y-2 text-center w-full">
                    <span className="text-[11px] uppercase tracking-widest text-black/45 font-medium block">
                      Curriculum Vitae
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-normal text-black font-mainframe-heading">
                      Professional Resume
                    </h2>
                  </div>

                  {/* Download CV button */}
                  <a
                    href="/resume.pdf"
                    download="Hemkumar_Resume.pdf"
                    className="relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-black text-white font-semibold text-sm hover:bg-black/90 active:scale-[0.98] transition-all hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)] hover:scale-[1.02]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-download"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                    Download CV
                  </a>

                  {/* PDF Viewer Container */}
                  <div className="w-full max-w-4xl aspect-[1/1.414] bg-white rounded-3xl border border-black/10 shadow-2xl overflow-hidden relative">
                    <iframe
                      src="/resume.pdf#toolbar=0"
                      title="Hemkumar Resume"
                      className="w-full h-full border-0"
                    />
                  </div>
                </motion.div>
              )}

              {activeSection === 'contact' && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  {/* CONTACT / FOOTER SECTION */}
                  <section id="contact" className="space-y-12">
                    <div className="text-center space-y-4 max-w-2xl mx-auto">
                      <span className="text-[11px] uppercase tracking-widest text-black/45 font-medium">Get In Touch</span>
                      <blockquote className="text-2xl sm:text-4xl italic text-black/85 leading-tight font-light font-mainframe-heading">
                        "Do something today that your future self will thank you for."
                      </blockquote>
                    </div>

                    <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
                      <a
                        href="mailto:hemkumarr2803@gmail.com"
                        className="relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-black text-white font-semibold text-lg hover:bg-black/90 active:scale-[0.98] transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:scale-[1.03]"
                      >
                        <Mail className="w-5 h-5 text-white" />
                        Email Me Now
                      </a>

                      {/* Contact details Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-16">
                        <a
                          href="tel:+919566781809"
                          className="bg-white/70 backdrop-blur-md p-5 rounded-2xl border border-black/5 flex flex-col items-center justify-center gap-3 hover:bg-white/95 hover:border-[#00bfff]/25 hover:shadow-[0_20px_50px_rgba(0,191,255,0.08)] hover:-translate-y-2 hover:scale-[1.01] transition-all duration-500 shadow-sm hover:shadow-md group"
                        >
                          <Phone className="w-6 h-6 text-black/55 group-hover:text-[#00bfff] group-hover:scale-110 transition-all duration-500" />
                          <span className="text-xs font-semibold text-black/85 group-hover:text-[#00bfff] transition-colors duration-300">Call Me</span>
                        </a>

                        <a
                          href="https://www.linkedin.com/in/hemkumar-r-7b749b326"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/70 backdrop-blur-md p-5 rounded-2xl border border-black/5 flex flex-col items-center justify-center gap-3 hover:bg-white/95 hover:border-[#00bfff]/25 hover:shadow-[0_20px_50px_rgba(0,191,255,0.08)] hover:-translate-y-2 hover:scale-[1.01] transition-all duration-500 shadow-sm hover:shadow-md group"
                        >
                          <LinkedinIcon className="w-6 h-6 text-black/55 group-hover:text-[#00bfff] group-hover:scale-110 transition-all duration-500" />
                          <span className="text-xs font-semibold text-black/85 group-hover:text-[#00bfff] transition-colors duration-300">LinkedIn</span>
                        </a>

                        <a
                          href="https://github.com/hemscodes28"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/70 backdrop-blur-md p-5 rounded-2xl border border-black/5 flex flex-col items-center justify-center gap-3 hover:bg-white/95 hover:border-[#00bfff]/25 hover:shadow-[0_20px_50px_rgba(0,191,255,0.08)] hover:-translate-y-2 hover:scale-[1.01] transition-all duration-500 shadow-sm hover:shadow-md group"
                        >
                          <GithubIcon className="w-6 h-6 text-black/55 group-hover:text-[#00bfff] group-hover:scale-110 transition-all duration-500" />
                          <span className="text-xs font-semibold text-black/85 group-hover:text-[#00bfff] transition-colors duration-300">GitHub</span>
                        </a>

                        <a
                          href="https://wa.me/919566781809"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/70 backdrop-blur-md p-5 rounded-2xl border border-black/5 flex flex-col items-center justify-center gap-3 hover:bg-white/95 hover:border-[#00bfff]/25 hover:shadow-[0_20px_50px_rgba(0,191,255,0.08)] hover:-translate-y-2 hover:scale-[1.01] transition-all duration-500 shadow-sm hover:shadow-md group"
                        >
                          <MessageCircle className="w-6 h-6 text-black/55 group-hover:text-[#00bfff] group-hover:scale-110 transition-all duration-500" />
                          <span className="text-xs font-semibold text-black/85 group-hover:text-[#00bfff] transition-colors duration-300">WhatsApp</span>
                        </a>
                      </div>

                      <p className="text-black/35 text-xs tracking-widest uppercase mt-12">
                        Coimbatore || India
                      </p>
                    </div>
                  </section>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Footer footer */}
      <footer className="w-full text-center py-8 border-t border-black/5 text-[10px] tracking-widest text-black/35 uppercase bg-black/5 relative z-30">
        © {new Date().getFullYear()} Designed and Developed by Hemkumar
      </footer>
    </div>
  );
};
