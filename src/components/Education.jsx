import React from 'react';
import { GraduationCap, Award, Calendar, CheckCircle2, Sparkles, Brain, Compass } from 'lucide-react';
import { educationData, certificationsData, additionalInfoData } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="py-24 relative bg-[#08090d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono text-xs font-bold tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>● EDUCATION & CERTIFICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
            Academic Background & Credentials
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Education Timeline (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/30">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-100">Education History</h3>
            </div>

            <div className="relative border-l-2 border-slate-800 ml-4 space-y-8">
              {educationData.map((item, idx) => (
                <div key={idx} className="relative pl-6 sm:pl-8 group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#08090d] border-2 border-slate-700 text-amber-500 flex items-center justify-center group-hover:border-amber-500 group-hover:scale-110 transition-all duration-300 shadow-md">
                    <GraduationCap className="w-4 h-4" />
                  </div>

                  {/* Card Content */}
                  <div className="p-6 rounded-2xl bg-[#0c0e15] border border-amber-500/20 hover:border-amber-500/60 shadow-xl transition-all duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h4 className="text-lg font-bold text-slate-100 group-hover:text-amber-500 transition-colors">
                        {item.degree}
                      </h4>
                      <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-amber-400 font-bold">
                        {item.period}
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-slate-300 mb-2">
                      {item.institution}
                    </p>

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-extrabold mb-3">
                      <span>Score: {item.score}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Certifications & Additional Info (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Certifications Card */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/30">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-100">Certifications</h3>
              </div>

              <div className="space-y-4">
                {certificationsData.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#0c0e15] border border-amber-500/30 hover:border-amber-500 shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-base font-bold text-slate-100">{cert.title}</h4>
                      <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                        {cert.issuer}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mt-2">
                      {cert.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Strengths */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/30">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-100">Core Strengths</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {additionalInfoData.strengths.map((str, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0c0e15] border border-slate-800 text-slate-200 text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                    <span>{str}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Areas of Interest */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/30">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-100">Areas of Interest</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {additionalInfoData.areasOfInterest.map((interest, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs font-semibold">
                    #{interest}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
