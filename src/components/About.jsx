import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import myPhoto from '../assets/img/my photo.jpg';

export default function About() {
  return (
    <section id="about" className="py-24 relative bg-[#08090d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Photo Card with Experience Badge */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Glowing Accent Border Container */}
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden border-2 border-amber-500/40 p-2 bg-slate-900/90 shadow-2xl shadow-amber-500/15 group">
              <div className="relative h-96 sm:h-[420px] rounded-xl overflow-hidden">
                <img
                  src={myPhoto}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 filter brightness-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-transparent to-transparent opacity-70" />
              </div>

              {/* Floating Badge - MCA CGPA 8.07 */}
              <div className="absolute top-6 right-6 px-4 py-3 rounded-xl bg-amber-500 text-black shadow-xl font-bold flex flex-col items-center">
                <span className="text-3xl font-black leading-none">8.07</span>
                <span className="text-[10px] uppercase tracking-wider font-extrabold mt-1">MCA CGPA</span>
              </div>
            </div>
          </div>

          {/* Right Column: About Details */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono text-xs font-bold tracking-wider mb-4">
              <span>● ABOUT ME</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight leading-tight mb-6">
              {personalInfo.aboutTitle}
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              {personalInfo.aboutBio}
            </p>

            {/* Checklist Grid (2 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-10">
              {personalInfo.aboutPoints.map((point) => (
                <div key={point} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                  <div className="p-1 rounded-full bg-amber-500/20 text-amber-500">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-slate-200">{point}</span>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold tracking-wider bg-slate-900 border border-amber-500/50 text-amber-400 hover:bg-amber-500 hover:text-black transition-all duration-300"
            >
              <span>MORE ABOUT ME</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
