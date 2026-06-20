import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Award } from 'lucide-react';
import { GithubIcon } from './Icons';

export interface ProjectData {
  id: string;
  number: string;
  title: string;
  description: string;
  subtitle: string;
  problem: string[];
  built: string[];
  outcome?: string[];
  tech: string[];
  github?: string;
  cert?: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
            className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-3xl bg-white text-black z-10 flex flex-col border border-black/10 shadow-2xl"
          >
            {/* Header Container */}
            <div className="flex justify-between items-center px-6 py-5 bg-white border-b border-black/5 flex-shrink-0">
              <span className="text-sm font-bold tracking-widest text-black/45 uppercase">
                Project {project.number}
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-black/5 text-black/60 hover:text-black transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 sm:p-8 md:p-10 space-y-8 overflow-y-auto modal-scrollbar flex-1">
              {/* Title Section */}
              <div>
                <h2 
                  className="text-3xl sm:text-5xl font-normal tracking-tight text-black mb-4"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {project.title}
                </h2>
                <p className="text-black/70 text-base sm:text-lg leading-relaxed font-light">
                  {project.subtitle}
                </p>
              </div>

              {/* Grid content: Problem Statement vs What was built */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-black/5">
                {/* Problem Statement */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-black/90 tracking-wide border-b border-black/10 pb-2">
                    Problem Statement
                  </h3>
                  <ul className="space-y-3">
                    {project.problem.map((item, idx) => (
                      <li key={idx} className="flex items-start text-sm text-black/70 leading-relaxed">
                        <span className="text-black/40 mr-2 mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-black" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What Was Built / Achievements */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-black/90 tracking-wide border-b border-black/10 pb-2">
                    What Was Built
                  </h3>
                  <ul className="space-y-3">
                    {project.built.map((item, idx) => (
                      <li key={idx} className="flex items-start text-sm text-black/70 leading-relaxed">
                        <span className="text-black/40 mr-2 mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-black" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Outcome (Smart India Hackathon, etc.) */}
                  {project.outcome && (
                    <div className="mt-6 p-4 rounded-xl bg-black/5 border border-black/5 space-y-2">
                      <h4 className="text-sm font-semibold text-black flex items-center gap-2">
                        <Award className="w-4 h-4 text-black/60" />
                        Outcome & Recognition
                      </h4>
                      <ul className="space-y-2">
                        {project.outcome.map((item, idx) => (
                          <li key={idx} className="text-xs text-black/60 leading-relaxed">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Technologies */}
              <div className="pt-6 border-t border-black/5 space-y-3">
                <h3 className="text-sm font-medium text-black/45 uppercase tracking-widest">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-black/5 border border-black/10 text-black/80 hover:bg-black hover:text-white transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="pt-8 border-t border-black/5 flex flex-wrap gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-black text-white hover:bg-black/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <GithubIcon className="w-4 h-4" />
                    View on GitHub
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </a>
                )}
                {project.cert && (
                  <a
                    href={project.cert}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-black/20 text-black hover:bg-black/5 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Award className="w-4 h-4" />
                    View Certificate
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-full text-sm font-medium border border-black/10 text-black/60 hover:text-black hover:bg-black/5 transition-all ml-auto"
                >
                  Close Detail
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
