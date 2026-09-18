import React from 'react';
import { Award, Code, Smile, Zap, Cpu } from 'lucide-react';
import { statsData } from '../data/portfolioData';

const iconMap = {
  Code: Code,
  Smile: Smile,
  Award: Award,
  Zap: Zap,
  Cpu: Cpu
};

export default function Stats() {
  return (
    <section id="achievements" className="py-24 relative bg-[#08090d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono text-xs font-bold tracking-wider mb-4">
            <span>● ACHIEVEMENTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
            Numbers That Define Me
          </h2>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {statsData.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Code;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0c0e15] border border-amber-500/20 hover:border-amber-500 flex flex-col items-center text-center group transition-all duration-300 transform hover:-translate-y-2 shadow-xl"
              >
                <div className="p-3.5 rounded-xl bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-colors duration-300 mb-4">
                  <IconComponent className="w-6 h-6" />
                </div>
                <span className="text-3xl sm:text-5xl font-black text-amber-500 tracking-tight mb-2">
                  {item.value}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-300">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
