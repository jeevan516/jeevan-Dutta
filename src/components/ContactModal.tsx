import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Copy, Sparkles, Building2, User, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpportunitySubmitted?: (opportunity: {
    company: string;
    contact: string;
    email: string;
    role: string;
    message: string;
  }) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onOpportunitySubmitted,
}) => {
  const [template, setTemplate] = useState<'fulltime' | 'contract' | 'general'>('fulltime');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(
    'Hi Jeevan, we reviewed your portfolio, especially your work at WaDaCon with Grafana/InfluxDB and your MSc at TU Clausthal. We would like to discuss an opportunity on our team.'
  );
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  if (!isOpen) return null;

  const handleSelectTemplate = (type: 'fulltime' | 'contract' | 'general') => {
    setTemplate(type);
    if (type === 'fulltime') {
      setMessage(
        'Hi Jeevan, we are actively hiring for an AI / Industrial IoT Engineer role in Germany. We were impressed by your telemetry and anomaly detection track record at WaDaCon and would like to invite you for a preliminary conversation.'
      );
    } else if (type === 'contract') {
      setMessage(
        'Hi Jeevan, we have an upcoming consulting / engineering initiative focused on observability and data pipelines. We would love to discuss your availability for contract work.'
      );
    } else {
      setMessage(
        'Hi Jeevan, I came across your portfolio and would like to connect regarding future technical collaborations.'
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.warn('Confetti error', err);
    }

    if (onOpportunitySubmitted) {
      onOpportunitySubmitted({
        company: company || 'Recruiter Inquiry',
        contact: name || 'Talent Partner',
        email: email || 'talent@company.example',
        role: template === 'fulltime' ? 'Full-Time Engineering Role' : template === 'contract' ? 'Contract IoT/AI Project' : 'General Connection',
        message: message,
      });
    }

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-xl rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-slate-950 font-bold text-sm">
              JD
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                Connect with Jeevan Dutta
              </h3>
              <p className="text-xs text-emerald-400 font-mono">
                Open to Opportunities · Hamburg, Germany
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Direct Contact Quick Chips */}
        <div className="px-6 py-4 bg-slate-950/40 border-b border-slate-800/80 flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono">{PERSONAL_INFO.email}</span>
            {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
          </button>

          <button
            onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono">{PERSONAL_INFO.phone}</span>
            {copiedPhone ? <Check className="w-3 h-3 text-cyan-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
          </button>
        </div>

        {/* Inquiry Form */}
        <div className="p-6 space-y-4">
          {submitted ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <Check className="w-7 h-7" />
              </div>
              <h4 className="font-display font-bold text-xl text-white">
                Inquiry Logged to Pipeline!
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Your outreach has been recorded into the live portfolio tracker. Jeevan will review and reply promptly via {email || 'email'}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Preset Template Chips */}
              <div>
                <label className="block text-slate-400 mb-1.5 font-medium">
                  Inquiry Purpose:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'fulltime', label: 'Full-Time Role' },
                    { id: 'contract', label: 'Contract / Consulting' },
                    { id: 'general', label: 'General Connect' },
                  ].map((t) => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => handleSelectTemplate(t.id as any)}
                      className={`py-2 px-2.5 rounded-xl text-center font-medium transition-all ${
                        template === t.id
                          ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-white border border-emerald-500/50 font-semibold'
                          : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid: Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sabine Weber"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Company / Organization</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Airbus, Otto Group, Tech Startup..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              {/* Grid: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Your Work Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone (Optional)</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+49 ..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Message / Project Context</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-emerald-400 leading-relaxed font-sans"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <a
                  href={`mailto:${PERSONAL_INFO.email}?subject=Opportunity%20Inquiry%20from%20${encodeURIComponent(company || 'Recruiter')}&body=${encodeURIComponent(message)}`}
                  className="text-xs text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1 font-mono"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Open native email client</span>
                </a>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send & Record in Tracker</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
