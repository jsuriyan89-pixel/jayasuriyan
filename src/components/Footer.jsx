import React from 'react';
import { ArrowUp, Code } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from './SocialIcons';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-slate-900 bg-[#06070a] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-900">
          
          {/* Logo & Bio */}
          <div className="md:col-span-6 flex flex-col items-start">
            <a href="#hero" className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500">
                <Code className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-wider text-slate-100 uppercase">
                &lt;/&gt; JAYASURIYAN
              </span>
            </a>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md leading-relaxed">
              Crafting fast, bold and beautiful web experiences that make an impact.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest mb-4">QUICK LINKS</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-400">
              <li><a href="#hero" className="hover:text-amber-500 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-amber-500 transition-colors">About</a></li>
              <li><a href="#services" className="hover:text-amber-500 transition-colors">Services</a></li>
              <li><a href="#projects" className="hover:text-amber-500 transition-colors">Projects</a></li>
              <li><a href="#contact" className="hover:text-amber-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest mb-4">FOLLOW ME</h4>
            <div className="flex items-center gap-3">
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-500 hover:border-amber-500/40 transition-all">
                <GithubIcon className="w-4 h-4" />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-500 hover:border-amber-500/40 transition-all">
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a href={personalInfo.twitter} target="_blank" rel="noreferrer" className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-500 hover:border-amber-500/40 transition-all">
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a href={personalInfo.instagram} target="_blank" rel="noreferrer" className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-500 hover:border-amber-500/40 transition-all">
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="p-3 rounded-lg bg-amber-500 text-black hover:bg-amber-400 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
