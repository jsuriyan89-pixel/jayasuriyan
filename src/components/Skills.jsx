import React from 'react';
import { techStackData } from '../data/portfolioData';

export default function Skills() {
  return (
    <section id="skills" className="py-20 relative bg-[#08090d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono text-xs font-bold tracking-wider mb-4">
            <span>● TECH STACK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
            Technologies I Work With
          </h2>
        </div>

        {/* Tech Icon Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {techStackData.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#0c0e15] border border-slate-800 hover:border-amber-500/60 hover:bg-slate-900/90 transition-all duration-300 transform hover:-translate-y-1 shadow-lg group"
            >
              <div className="w-12 h-12 mb-3 flex items-center justify-center filter group-hover:drop-shadow-[0_0_12px_rgba(255,102,0,0.5)] transition-all">
                <img src={tech.icon} alt={tech.name} className="w-full h-full object-contain" />
              </div>
              <span className="text-xs font-bold text-slate-300 group-hover:text-amber-500 transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
