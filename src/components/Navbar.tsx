import React, { useState } from 'react';
import { Briefcase, BarChart3, Mail, FileText, Github, Linkedin, Sparkles, Sun, Moon } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  activeView: 'showcase' | 'tracker';
  setActiveView: (view: 'showcase' | 'tracker') => void;
  onOpenContact: () => void;
  onOpenBrief: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  onOpenContact,
  onOpenBrief,
  theme,
  onToggleTheme,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#070a12]/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo & Identity with Profile Picture */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden ring-2 ring-emerald-500/50 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform shrink-0 bg-slate-800">
                {!imageError ? (
                  <img
                    src="./jeevan-dutta.jpg"
                    alt="Jeevan Dutta"
                    className="w-full h-full object-cover object-top"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-slate-950 font-extrabold text-sm">
                    JD
                  </div>
                )}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
              </div>
              <div>
                <span className="font-display font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  {PERSONAL_INFO.name}
                </span>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available Immediately · Hamburg</span>
                </div>
              </div>
            </a>
          </div>

          {/* Mode Switcher: Showcase vs Portfolio Tracker */}
          <div className="hidden md:flex items-center p-1 bg-slate-900/90 border border-slate-800 rounded-xl shadow-inner">
            <button
              id="view-showcase-tab"
              onClick={() => setActiveView('showcase')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'showcase'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Portfolio Showcase
            </button>
            <button
              id="view-tracker-tab"
              onClick={() => setActiveView('tracker')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'tracker'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Career Pipeline & Analytics
              <span className="px-1.5 py-0.2 bg-cyan-950 text-cyan-300 text-[10px] rounded-full border border-cyan-700/50">
                Live
              </span>
            </button>
          </div>

          {/* Navigation Links for standard view */}
          {activeView === 'showcase' && (
            <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-xs font-medium text-slate-300">
              <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
              <a href="#education" className="hover:text-purple-300 text-purple-400/95 font-semibold transition-colors flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                Education
              </a>
              <a href="#master-thesis" className="hover:text-purple-300 transition-colors">Master's Thesis</a>
              <a href="#projects" className="hover:text-emerald-400 transition-colors">Projects</a>
              <a href="#skills" className="hover:text-emerald-400 transition-colors">Skills & Certs</a>
              <a href="#experience" className="hover:text-emerald-400 text-slate-200 transition-colors font-medium">Work Experience</a>
              <a href="#observability" className="hover:text-emerald-400 text-emerald-400/90 transition-colors flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Observability Studio
              </a>
              <a href="#academic-reference" className="hover:text-purple-400 text-purple-300/90 transition-colors flex items-center gap-1">
                Academic Reference
              </a>
              <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
            </nav>
          )}

          {/* Right CTAs for Recruiters / Clients */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Links */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-[#0a66c2] rounded-lg hover:bg-slate-800 transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-btn"
              onClick={onToggleTheme}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-1.5"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Dark/Light Mode"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-cyan-400" />
              )}
              <span className="hidden xl:inline text-[11px] font-mono font-medium">
                {theme === 'dark' ? 'Light' : 'Dark'}
              </span>
            </button>

            {/* Recruiter Brief Button */}
            <button
              id="navbar-brief-btn"
              onClick={onOpenBrief}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Recruiter Brief</span>
            </button>

            {/* Direct Connect / Hire Button */}
            <button
              id="navbar-contact-btn"
              onClick={onOpenContact}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </button>
          </div>
        </div>

        {/* Mobile View Toggle */}
        <div className="flex md:hidden items-center justify-center p-1 my-2 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setActiveView('showcase')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-lg ${
              activeView === 'showcase' ? 'bg-emerald-500 text-slate-950 font-semibold' : 'text-slate-400'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Showcase
          </button>
          <button
            onClick={() => setActiveView('tracker')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-lg ${
              activeView === 'tracker' ? 'bg-cyan-500 text-slate-950 font-semibold' : 'text-slate-400'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" /> Portfolio Tracker
          </button>
        </div>
      </div>
    </header>
  );
};
