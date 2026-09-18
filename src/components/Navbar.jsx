import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Send, Code } from 'lucide-react';
import ThemeCustomizer from './ThemeCustomizer';

export default function Navbar({ isDark, toggleTheme, accent, setAccent, showToast, toggleTerminal, isTerminalOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#hero' },
    { name: 'ABOUT', href: '#about' },
    { name: 'SERVICES', href: '#services' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'EDUCATION', href: '#education' },
    { name: 'ACHIEVEMENTS', href: '#achievements' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3.5 bg-[#08090d]/90 backdrop-blur-xl border-b border-amber-500/20 shadow-2xl shadow-black/80'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="flex items-center justify-center p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300">
              <Code className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-wider text-slate-100 uppercase group-hover:text-amber-500 transition-colors">
              &lt;/&gt; JAYASURIYAN
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-semibold text-slate-300 hover:text-amber-500 tracking-wider transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Terminal CLI Button */}
            <button
              onClick={toggleTerminal}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all duration-200 ${
                isTerminalOpen
                  ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-amber-500/50 hover:text-slate-200'
              }`}
              title="Open CLI Terminal"
            >
              <Terminal className="w-3.5 h-3.5 text-amber-500" />
              <span>CLI</span>
            </button>

            {/* Theme Customizer */}
            <ThemeCustomizer
              isDark={isDark}
              toggleTheme={toggleTheme}
              accent={accent}
              setAccent={setAccent}
              showToast={showToast}
            />

            {/* Let's Talk CTA Button */}
            <a
              href="#contact"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider bg-amber-500 text-black uppercase hover:bg-amber-400 shadow-lg shadow-amber-500/25 transition-all duration-200 active:scale-95"
            >
              <span>LET'S TALK</span>
              <Send className="w-3.5 h-3.5 fill-current" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeCustomizer
              isDark={isDark}
              toggleTheme={toggleTheme}
              accent={accent}
              setAccent={setAccent}
              showToast={showToast}
            />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? <X className="w-5 h-5 text-amber-500" /> : <Menu className="w-5 h-5 text-amber-500" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0a0b10] border-b border-amber-500/30 px-6 py-6 mt-3 animate-fadeIn">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-sm font-semibold tracking-wider text-slate-200 hover:text-amber-500 border-b border-slate-900 transition-all"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => {
                  toggleTerminal();
                  setMobileOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300"
              >
                <Terminal className="w-4 h-4 text-amber-500" />
                <span>CLI Terminal</span>
              </button>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="px-5 py-2.5 text-xs font-bold tracking-wider rounded-lg bg-amber-500 text-black uppercase"
              >
                LET'S TALK
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
