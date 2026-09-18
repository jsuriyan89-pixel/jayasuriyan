import React from 'react';
import { ArrowRight, Download, Terminal, MousePointer } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from './SocialIcons';
import { personalInfo } from '../data/portfolioData';
import myPhoto from '../assets/img/my photo.jpg';

export default function Hero({ showToast, toggleTerminal }) {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-[#08090d]">
      {/* Ambient glowing orange background spots */}
      <div className="glow-ambient -top-20 -left-20 opacity-70" />
      <div className="glow-ambient top-1/3 -right-32 opacity-50" />

      {/* Radial grid pattern background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Intro */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Category Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono text-xs font-bold tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span>● PYTHON FULL STACK DEVELOPER</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-100 tracking-tight leading-[1.08] mb-6">
              PYTHON. FLASK. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400">
                REST APIs & ML
              </span> <br />
              PREDICTIONS.
            </h1>

            {/* Paragraph Bio */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed mb-8">
              {personalInfo.tagline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-12">
              <a
                href="#projects"
                className="flex items-center justify-center gap-3 px-7 py-4 rounded-xl font-bold text-sm bg-amber-500 text-black hover:bg-amber-400 shadow-xl shadow-amber-500/30 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 group"
              >
                <span>VIEW MY WORK</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => showToast('CV Download initiated!')}
                className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-bold text-sm bg-slate-900/90 border border-slate-700/80 text-slate-200 hover:border-amber-500 hover:text-amber-400 transition-all duration-300 transform hover:-translate-y-1"
              >
                <Download className="w-4 h-4 text-amber-500" />
                <span>DOWNLOAD CV</span>
              </button>

              <button
                onClick={toggleTerminal}
                className="flex items-center justify-center gap-2 p-4 rounded-xl font-mono text-xs bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/50 transition-all"
                title="Launch CLI Mode"
              >
                <Terminal className="w-4 h-4 text-amber-500" />
              </button>
            </div>

            {/* Social Connect Icons */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500">LET'S CONNECT:</span>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-amber-500 hover:border-amber-500/50 transition-all"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-amber-500 hover:border-amber-500/50 transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-amber-500 hover:border-amber-500/50 transition-all"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-amber-500 hover:border-amber-500/50 transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual with Animated Geometric Photo Frame */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[440px] sm:min-h-[500px]">
            
            {/* Outer Glowing Neon Geometric Diamond (rotate-45) */}
            <div className="absolute w-64 sm:w-80 h-64 sm:h-80 border-2 border-amber-500/60 rounded-3xl animate-rotate-diamond pointer-events-none z-0" />
            <div className="absolute w-72 sm:w-88 h-72 sm:h-88 border border-amber-500/20 rounded-3xl rotate-45 pointer-events-none z-0 animate-pulse-glow" />

            {/* User Photo Frame */}
            <div className="relative z-10 w-64 sm:w-80 h-80 sm:h-96 rounded-2xl overflow-hidden border-2 border-amber-500/50 shadow-2xl shadow-amber-500/20 group animate-float">
              <img
                src={myPhoto}
                alt={personalInfo.name}
                className="w-full h-full object-cover object-top filter brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
              />
              {/* Bottom Gradient Fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-transparent to-transparent opacity-80" />
            </div>

            {/* Top Right Floating Code Snippet Card */}
            <div className="absolute -top-6 -right-2 sm:-right-8 z-20 w-56 sm:w-64 p-3.5 rounded-xl bg-[#0c0e15]/95 border border-amber-500/30 backdrop-blur-xl shadow-2xl font-mono text-[11px] leading-relaxed animate-float hidden sm:block">
              <div className="text-slate-400">
                <span className="text-amber-500">const</span> dev = &#123;
              </div>
              <div className="pl-3 text-slate-300">
                name: <span className="text-amber-400">"{personalInfo.name}"</span>,
              </div>
              <div className="pl-3 text-slate-300">
                role: <span className="text-amber-400">"Python Developer"</span>,
              </div>
              <div className="pl-3 text-slate-300">
                specialty: <span className="text-amber-400">"Flask & ML Systems"</span>,
              </div>
              <div className="pl-3 text-slate-300">
                code: <span className="text-emerald-400">"Clean, Data-Driven"</span>
              </div>
              <div className="text-slate-400">&#125;;</div>
            </div>

            {/* Right Bottom Floating Status Badge */}
            <div className="absolute -bottom-4 -left-2 sm:-left-6 z-20 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#0c0e15]/95 border border-amber-500/40 backdrop-blur-xl shadow-xl font-mono text-xs text-slate-200">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-bold tracking-wider text-[11px]">AVAILABLE FOR FREELANCE</span>
            </div>

            {/* Scroll Indicator Icon */}
            <div className="absolute -bottom-12 right-0 hidden lg:flex flex-col items-center gap-1.5 text-slate-500">
              <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">SCROLL</span>
              <div className="w-5 h-8 rounded-full border-2 border-slate-700 flex justify-center p-1">
                <div className="w-1 h-2 rounded-full bg-amber-500 animate-bounce" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
