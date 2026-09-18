import React from 'react';
import { Sun, Moon } from 'lucide-react';

const ACCENTS = [
  { id: 'cyan', name: 'Cyan Neon', colorBg: 'bg-[#00b4d8]' },
  { id: 'violet', name: 'Electric Violet', colorBg: 'bg-[#7b2cbf]' },
  { id: 'emerald', name: 'Emerald Glow', colorBg: 'bg-[#10b981]' },
  { id: 'amber', name: 'Sunset Amber', colorBg: 'bg-[#d97706]' },
];

export default function ThemeCustomizer({ isDark, toggleTheme, accent, setAccent, showToast }) {
  return (
    <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#0a0d17] border border-slate-800 shadow-xl backdrop-blur-xl">
      {/* Dark/Light Toggle */}
      <button
        onClick={() => {
          toggleTheme();
          if (showToast) showToast(isDark ? 'Switched to Light mode' : 'Switched to Dark mode');
        }}
        className="p-1 text-amber-400 hover:scale-110 transition-transform duration-200 cursor-pointer"
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        aria-label="Toggle Theme"
      >
        {isDark ? <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20" /> : <Moon className="w-4 h-4 text-amber-400 fill-amber-400/20" />}
      </button>

      {/* Vertical Divider Line */}
      <div className="w-[1px] h-4 bg-slate-800" />

      {/* Accent Color Dots */}
      <div className="flex items-center gap-2">
        {ACCENTS.map((item) => {
          const isActive = accent === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setAccent(item.id);
                if (showToast) showToast(`Accent theme: ${item.name}`);
              }}
              className={`w-4 h-4 rounded-full ${item.colorBg} transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0a0d17] scale-110'
                  : 'opacity-80 hover:opacity-100 hover:scale-110'
              }`}
              title={`Select ${item.name}`}
              aria-label={`Select ${item.name}`}
            />
          );
        })}
      </div>
    </div>
  );
}
