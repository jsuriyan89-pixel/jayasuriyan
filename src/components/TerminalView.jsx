import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Sparkles, CornerDownLeft } from 'lucide-react';
import { personalInfo, projectsData, skillsCategories, experienceData } from '../data/portfolioData';

export default function TerminalView({ isOpen, onClose, setAccent, showToast }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome to Jayasuriyan\'s Interactive Developer CLI Terminal v2.4.0' },
    { type: 'system', text: 'Type "help" to display available terminal commands.' }
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    const newHistory = [...history, { type: 'user', text: `jayasuriyan@portfolio:~$ ${cmd}` }];

    const parts = trimmed.split(' ');
    const mainCmd = parts[0];
    const arg = parts[1];

    switch (mainCmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Available CLI Commands:
  about        - View background bio & role details
  skills       - Display core technical skills matrix
  projects     - List top engineered projects & metrics
  experience   - Display career timeline summary
  contact      - Show direct contact information
  theme [name] - Change accent color (cyan, violet, emerald, amber)
  clear        - Clear the terminal screen
  whoami       - Display current session info
  date         - Output current system time
  sudo hire    - Execute hiring procedure`
        });
        break;

      case 'about':
        newHistory.push({
          type: 'output',
          text: `${personalInfo.name} - ${personalInfo.title}
${personalInfo.bio}
Location: ${personalInfo.location}
Status: ${personalInfo.availability}`
        });
        break;

      case 'skills':
        const skillsText = skillsCategories.map(cat => (
          `[${cat.name}]\n  ` + cat.skills.map(s => `${s.name} (${s.level}%)`).join(', ')
        )).join('\n\n');
        newHistory.push({ type: 'output', text: skillsText });
        break;

      case 'projects':
        const projText = projectsData.map((p, i) => (
          `${i + 1}. ${p.title} [${p.category}] - ${p.stars} Stars\n   Stack: ${p.tags.join(', ')}\n   Demo: ${p.demoUrl}`
        )).join('\n\n');
        newHistory.push({ type: 'output', text: projText });
        break;

      case 'experience':
        const expText = experienceData.map(e => (
          `• ${e.role} @ ${e.company} (${e.period})\n  ${e.description}`
        )).join('\n\n');
        newHistory.push({ type: 'output', text: expText });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `Email: ${personalInfo.email}
Phone: ${personalInfo.phone}
GitHub: ${personalInfo.github}
LinkedIn: ${personalInfo.linkedin}`
        });
        break;

      case 'theme':
        if (['cyan', 'violet', 'emerald', 'amber'].includes(arg)) {
          setAccent(arg);
          showToast(`Terminal updated theme accent to ${arg}!`);
          newHistory.push({ type: 'output', text: `Success: Accent theme changed to "${arg}".` });
        } else {
          newHistory.push({ type: 'error', text: `Error: Invalid accent "${arg}". Valid choices: cyan, violet, emerald, amber.` });
        }
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'whoami':
        newHistory.push({ type: 'output', text: 'guest_recruiter@portfolio-session' });
        break;

      case 'date':
        newHistory.push({ type: 'output', text: new Date().toString() });
        break;

      case 'sudo':
        if (parts.slice(1).join(' ') === 'hire') {
          showToast('🎉 Hire Request Received! Redirecting to contact section...');
          newHistory.push({
            type: 'output',
            text: 'Access Granted: Initiating priority recruitment workflow! Redirecting to #contact...'
          });
          setTimeout(() => {
            window.location.hash = '#contact';
          }, 1200);
        } else {
          newHistory.push({ type: 'error', text: `sudo: command not found: ${parts.slice(1).join(' ')}` });
        }
        break;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not recognized: "${trimmed}". Type "help" for a list of valid commands.`
        });
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setInput(commandHistory[commandHistory.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <section id="terminal" className="py-20 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DEVELOPER CLI INTERFACE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Interactive Terminal Mode
          </h2>
          <p className="text-slate-400 max-w-xl text-sm sm:text-base mt-2">
            Prefer shell commands? Type <span className="font-mono text-accent">help</span> to explore my skills, projects, background, or switch theme colors directly via CLI.
          </p>
        </div>

        {/* Terminal Window */}
        <div className="rounded-2xl border border-slate-700/80 bg-slate-950 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500 hover:opacity-80 cursor-pointer" onClick={() => setHistory([])} />
              <div className="w-3 h-3 rounded-full bg-amber-500 hover:opacity-80 cursor-pointer" onClick={() => setIsMinimized(!isMinimized)} />
              <div className="w-3 h-3 rounded-full bg-emerald-500 hover:opacity-80 cursor-pointer" />
              <span className="ml-2 text-xs text-slate-400 font-mono flex items-center gap-1.5">
                <TerminalIcon className="w-3.5 h-3.5 text-accent" />
                jayasuriyan@portfolio:~ (bash)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-slate-400 hover:text-white p-1"
                aria-label="Toggle size"
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          {!isMinimized && (
            <div className="p-5 h-96 overflow-y-auto space-y-3 bg-slate-950/95" onClick={() => inputRef.current?.focus()}>
              {history.map((item, idx) => (
                <div key={idx} className="leading-relaxed">
                  {item.type === 'user' && (
                    <span className="text-emerald-400 font-semibold">{item.text}</span>
                  )}
                  {item.type === 'system' && (
                    <span className="text-cyan-400">{item.text}</span>
                  )}
                  {item.type === 'output' && (
                    <pre className="text-slate-300 whitespace-pre-wrap font-mono text-xs">{item.text}</pre>
                  )}
                  {item.type === 'error' && (
                    <span className="text-rose-400 font-mono">{item.text}</span>
                  )}
                </div>
              ))}

              {/* Input Line */}
              <div className="flex items-center gap-2 pt-2">
                <span className="text-accent font-bold">jayasuriyan@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none text-slate-100 font-mono text-xs sm:text-sm"
                  placeholder="Type a command (e.g. 'help', 'skills', 'sudo hire')..."
                />
                <button
                  onClick={() => handleCommand(input)}
                  className="p-1 rounded bg-slate-900 text-accent hover:bg-slate-800"
                  title="Send command"
                >
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </button>
              </div>

              <div ref={bottomRef} />
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
