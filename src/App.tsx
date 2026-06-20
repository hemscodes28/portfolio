import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LandingPage } from './components/LandingPage';
import { LoadingScreen } from './components/LoadingScreen';
import { Portfolio } from './components/Portfolio';
import { ProjectModal } from './components/ProjectModal';
import type { ProjectData } from './components/ProjectModal';

function App() {
  const [screen, setScreen] = useState<'landing' | 'loading' | 'portfolio'>('landing');
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);

  return (
    <div className="bg-[#ECEAE6] w-full min-h-screen text-black select-none">
      <AnimatePresence mode="wait">
        {screen === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="w-full"
          >
            <LandingPage onBeginJourney={() => setScreen('loading')} />
          </motion.div>
        ) : screen === 'loading' ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <LoadingScreen onComplete={() => setScreen('portfolio')} />
          </motion.div>
        ) : (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full"
          >
            <Portfolio
              onBackToLanding={() => setScreen('landing')}
              onOpenProject={(proj) => setActiveProject(proj)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen detail modal */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}

export default App;
