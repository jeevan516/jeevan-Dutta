import React from 'react';
import { SKILL_CATEGORIES, CERTIFICATIONS } from '../data/portfolioData';
import { TargetRole } from '../types';
import { 
  Brain, 
  Activity, 
  Server, 
  Database, 
  Network, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  ExternalLink,
  Linkedin,
  FileCheck
} from 'lucide-react';

interface SkillsSectionProps {
  activeRole: TargetRole;
}

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Brain':
      return <Brain className="w-5 h-5 text-emerald-400" />;
    case 'Activity':
      return <Activity className="w-5 h-5 text-cyan-400" />;
    case 'Server':
      return <Server className="w-5 h-5 text-blue-400" />;
    case 'Database':
      return <Database className="w-5 h-5 text-indigo-400" />;
    case 'Network':
      return <Network className="w-5 h-5 text-teal-400" />;
    default:
      return <Cpu className="w-5 h-5 text-emerald-400" />;
  }
};

export const SkillsSection: React.FC<SkillsSectionProps> = ({ activeRole }) => {
  return (
    <section id="skills" className="py-16 border-t border-slate-800/80 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider mb-2">
            <Cpu className="w-4 h-4" />
            Full-Spectrum Technical Toolkit
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Technical Proficiencies & Systems Mastery
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Validated across high-throughput industrial facilities, deep learning sequence research at TU Clausthal, and enterprise IT infrastructure.
          </p>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              id={`skill-category-${cat.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 shadow-lg"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800/80">
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 shadow-inner">
                  {getCategoryIcon(cat.icon)}
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white">
                    {cat.title}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">
                    {cat.skills.length} core competencies
                  </span>
                </div>
              </div>

              {/* Skills Progress List */}
              <div className="space-y-3.5">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-medium flex items-center gap-1.5 ${skill.highlight ? 'text-white font-semibold' : 'text-slate-300'}`}>
                        {skill.highlight && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        )}
                        {skill.name}
                      </span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-800/90 border border-slate-700/60 text-cyan-300 font-medium">
                        {skill.experience}
                      </span>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          skill.highlight
                            ? 'bg-gradient-to-r from-emerald-500 to-cyan-400'
                            : 'bg-slate-500'
                        }`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Industry Certifications */}
        <div className="mt-8 pt-8 border-t border-slate-800/80">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                Continuous Learning & Verified Credentials
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
                Certifications & Academic Credentials
              </h3>
            </div>
            <span className="hidden sm:inline-block text-xs font-mono text-slate-400">
              Anthropic · Microsoft · TU Clausthal · LinkedIn · Accenture
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                    <span className="font-mono text-emerald-400 font-semibold">{cert.issuer}</span>
                    <span className="text-[11px] font-mono text-slate-400">{cert.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white leading-snug">
                    {cert.title}
                  </h4>
                </div>

                <div className="mt-3">
                  <div className="flex flex-wrap gap-1 mb-2.5 pt-2 border-t border-slate-800/60">
                    {cert.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <Linkedin className="w-3 h-3 text-[#0A66C2]" />
                      <span>Verified on LinkedIn</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
