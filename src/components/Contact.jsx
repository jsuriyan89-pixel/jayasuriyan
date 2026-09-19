import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Globe, Loader2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Contact({ showToast }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedSubject = formData.subject.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
      showToast({
        title: '✕ Unable to send message.',
        subtitle: 'Please fill in all required fields.',
        type: 'error',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      showToast({
        title: '✕ Unable to send message.',
        subtitle: 'Please enter a valid email address.',
        type: 'error',
      });
      return;
    }

    setStatus('sending');

    try {
      const payload = JSON.stringify({
        name: trimmedName,
        email: trimmedEmail,
        subject: trimmedSubject,
        message: trimmedMessage,
      });
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers,
        body: payload,
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success) {
        setStatus('success');
        showToast({
          title: '✓ Message sent successfully!',
          subtitle: "I'll get back to you soon.",
          type: 'success',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        showToast({
          title: '✕ Unable to send message.',
          subtitle: result.error || result.message || 'Please try again later.',
          type: 'error',
        });
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus('error');
      showToast({
        title: '✕ Unable to send message.',
        subtitle: 'Please try again later.',
        type: 'error',
      });
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-[#08090d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono text-xs font-bold tracking-wider mb-4">
            <span>● CONTACT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
            Let's Build Something Amazing
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-[#0c0e15] border border-amber-500/20 shadow-2xl space-y-6">
              
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block mb-1">Email</span>
                  <a href={`mailto:${personalInfo.email}`} className="text-base font-bold text-slate-100 hover:text-amber-500 transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block mb-1">Phone</span>
                  <a href={`tel:${personalInfo.phone}`} className="text-base font-bold text-slate-100 hover:text-amber-500 transition-colors">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block mb-1">Location</span>
                  <span className="text-base font-bold text-slate-100">
                    {personalInfo.location}
                  </span>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-start gap-4 pt-4 border-t border-slate-900">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block mb-1">Availability</span>
                  <span className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Open for Freelance
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-[#0c0e15] border border-amber-500/20 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#08090d] border border-slate-800 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      maxLength={254}
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#08090d] border border-slate-800 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={200}
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#08090d] border border-slate-800 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    maxLength={5000}
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#08090d] border border-slate-800 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-4 rounded-xl bg-amber-500 text-black font-extrabold text-sm uppercase tracking-wider hover:bg-amber-400 shadow-xl shadow-amber-500/25 transition-all duration-200 active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-black" />
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <span>SEND MESSAGE</span>
                      <Send className="w-4 h-4 fill-current" />
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
