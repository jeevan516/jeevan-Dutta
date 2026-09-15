import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { SystemArchitectureVisualizer } from './graphics/SystemArchitectureVisualizer';
import { 
  Database, 
  Server, 
  Cpu, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Terminal,
  Activity
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 border-t border-slate-800/80 bg-slate-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Bio */}
          <div className="lg:col-span-7 space-y-6">
            
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                Engineering Philosophy & Background
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                Where Data Intelligence Meets Industrial Infrastructure
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              <p>
                I'm a results-oriented IT professional with a dual foundation in <strong className="text-white font-medium">Data Analysis</strong> and <strong className="text-white font-medium">IT Engineering</strong>. With an <strong className="text-emerald-400 font-medium">MSc in Informatics from TU Clausthal</strong> and over a decade of hands-on experience, I specialize in transforming complex technical processes into streamlined, impactful outcomes.
              </p>

              <p>
                Previously at <strong className="text-white font-medium">WaDaCon GmbH</strong> in Hamburg, I applied this expertise to the recycling industry — building Next-Gen <strong className="text-cyan-400 font-medium">MRF (Material Recovery Facility)</strong> solutions through observability pipelines, AI-driven anomaly detection, and industrial IoT data engineering.
              </p>

              <p>
                From building Grafana + Prometheus stacks to training ML models, from CI/CD automation with Docker to secure SSH tunneling with Teleport — I bring end-to-end ownership to every system I touch.
              </p>
            </div>

            {/* Pillar Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                  <Database className="w-4 h-4" />
                  <span>Data & AI Intelligence</span>
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  Spatial-temporal sequence forecasting (LSTMs), ISO vibration anomaly detection, and time-series analytics with Python & PyTorch.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
                  <Server className="w-4 h-4" />
                  <span>Resilient IT Infrastructure</span>
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  Docker containerization, zero-trust Teleport SSH edge access, Prometheus scraping, and automated incident webhooks.
                </p>
              </div>
            </div>

            {/* Key Availability Note */}
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-200 flex items-start sm:items-center gap-3 shadow-lg shadow-emerald-950/20">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-white uppercase font-mono tracking-wider text-[11px]">
                    Status: Available for New Role
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
                    Immediate Availability · Germany
                  </span>
                </div>
                <p className="text-slate-300 mt-1">
                  Fully authorized for employment across Germany. Based in Hamburg, ready for immediate onboarding in full-time or high-impact contract roles (On-site, Hybrid, or Remote).
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Architectural Highlights, Executive Profile & Interactive Visualizer */}
          <div className="lg:col-span-5 space-y-4">
            {/* Professional Profile Spotlight Card */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-xl flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden ring-2 ring-emerald-500/50 shadow-md bg-slate-800">
                  <img
                    src="./jeevan-dutta.jpg"
                    alt="Jeevan Dutta - Professional Profile"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-emerald-500 text-slate-950">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-950 font-bold" />
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white font-display">
                    Jeevan Dutta
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Verified
                  </span>
                </div>
                <div className="text-slate-300 font-medium">
                  MSc Informatics (TU Clausthal)
                </div>
                <div className="text-slate-400 text-[11px] leading-snug">
                  Specializing in Industrial IoT Observability, Deep Sequence Forecasting, and Resilient IT Architecture.
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 pt-0.5">
                  <span>Authorized to Work in Germany</span>
                  <span>·</span>
                  <span>DTZ B1 Certified</span>
                </div>
              </div>
            </div>

            <SystemArchitectureVisualizer />
          </div>

        </div>

      </div>
    </section>
  );
};
