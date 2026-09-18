import React from 'react';
import { Layout, Smartphone, Code, Gauge } from 'lucide-react';
import { servicesData } from '../data/portfolioData';

const iconMap = {
  Layout: Layout,
  Smartphone: Smartphone,
  Code: Code,
  Gauge: Gauge
};

export default function Services() {
  return (
    <section id="services" className="py-24 relative bg-[#08090d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col items-start mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono text-xs font-bold tracking-wider mb-4">
            <span>● SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
            What I Can Do For You
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service) => {
            const IconComponent = iconMap[service.icon] || Code;
            return (
              <div
                key={service.id}
                className="group relative p-8 rounded-2xl bg-[#0d0e14] border border-amber-500/20 hover:border-amber-500 transition-all duration-300 transform hover:-translate-y-2 shadow-xl shadow-black/60 flex flex-col justify-between"
              >
                {/* Top Glowing Bar */}
                <div className="absolute top-0 left-6 right-6 h-1 bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-md" />

                <div>
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-colors duration-300 mb-6">
                    <IconComponent className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-amber-500 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
