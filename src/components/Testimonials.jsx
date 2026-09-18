import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonialsData } from '../data/portfolioData';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-24 relative bg-[#08090d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono text-xs font-bold tracking-wider mb-4">
            <span>● TESTIMONIALS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
            What Clients Say
          </h2>
        </div>

        {/* Testimonials Grid / Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {testimonialsData.map((item, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-2xl bg-[#0c0e15] border transition-all duration-300 flex flex-col justify-between ${
                idx === currentIndex
                  ? 'border-amber-500 shadow-2xl shadow-amber-500/10'
                  : 'border-slate-800/80 opacity-80 hover:opacity-100'
              }`}
            >
              <div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                  "{item.quote}"
                </p>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-6 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-900">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-500"
                />
                <div>
                  <h4 className="font-bold text-slate-100 text-sm">{item.name}</h4>
                  <p className="text-xs text-slate-400 font-mono">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prevTestimonial}
            className="p-3 rounded-full bg-slate-900 border border-slate-800 text-amber-500 hover:bg-amber-500 hover:text-black transition-all"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentIndex ? 'w-8 bg-amber-500' : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextTestimonial}
            className="p-3 rounded-full bg-slate-900 border border-slate-800 text-amber-500 hover:bg-amber-500 hover:text-black transition-all"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
