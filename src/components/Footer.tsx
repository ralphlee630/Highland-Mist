/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, Sparkles, Mail, CheckCircle, ShieldCheck } from 'lucide-react';

interface FooterProps {
  setTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export default function Footer({ setTab, onOpenBooking }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please input a valid email address');
      return;
    }
    setError('');
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 4000);
  };

  const handleLinkClick = (tabId: string) => {
    setTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-pine-deep text-mist-white rounded-t-2xl font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="flex flex-col space-y-4">
            <div>
              <span className="font-headline font-bold text-2xl text-pine-accent tracking-tight block">
                Highland Mist
              </span>
              <span className="font-mono text-[10px] text-pine-accent/70 tracking-widest uppercase block">
                The Summer Capital Guide
              </span>
            </div>
            <p className="font-sans text-xs text-mist-white/80 leading-relaxed max-w-sm">
              Your premium guide to the pristine pine walks, historic landmarks, dense morning mist, and academic excellence of Baguio City. Curated for local travelers and cultural explorers alike.
            </p>
            <div className="pt-2 flex items-center space-x-2 text-pine-accent/70 font-mono text-[10px]">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Official Civic Guide 2026</span>
            </div>
          </div>

          {/* Tab Links Column */}
          <div className="flex flex-col space-y-3">
            <span className="font-headline text-xs font-semibold tracking-wider text-pine-accent uppercase block mb-2">
              Explore Inside
            </span>
            {[
              { id: 'explore', label: 'Explore (Home)' },
              { id: 'landmarks', label: 'Iconic Landmarks' },
              { id: 'culture', label: 'Culture & Festivals' },
              { id: 'plan', label: 'Travel Itineraries' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className="text-left text-xs text-mist-white/70 hover:text-pine-accent hover:underline transition-all duration-200 focus:outline-none"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Legal / Secondary Column */}
          <div className="flex flex-col space-y-3">
            <span className="font-headline text-xs font-semibold tracking-wider text-pine-accent uppercase block mb-2">
              Civic & Legal
            </span>
            <button
              onClick={() => handleLinkClick('ordinances')}
              className="text-left text-xs text-mist-white/70 hover:text-pine-accent hover:underline transition-colors focus:outline-none"
            >
              City Rules & Ordinances
            </button>
            <button
              onClick={() => handleLinkClick('education')}
              className="text-left text-xs text-mist-white/70 hover:text-pine-accent hover:underline transition-colors focus:outline-none"
            >
              Higher Education Center
            </button>
            <button
              onClick={onOpenBooking}
              className="text-left text-xs text-mist-white/70 hover:text-pine-accent hover:underline transition-colors focus:outline-none font-bold"
            >
              Book Pine Cabins & Lodges
            </button>
            <span className="font-sans text-[11px] text-mist-white/50 block pt-1">
              Contact: government@baguio.gov.ph
            </span>
          </div>

          {/* Newsletter Column */}
          <div className="flex flex-col space-y-4">
            <span className="font-headline text-xs font-semibold tracking-wider text-pine-accent uppercase block">
              Highland Newsletter
            </span>
            <p className="font-sans text-xs text-mist-white/70 leading-relaxed">
              Stay ahead with weather updates, festival dates, and travel vouchers for the Summer Capital.
            </p>

            {subscribed ? (
              <div className="bg-white/10 border border-pine-accent/30 p-3 rounded-lg flex items-start space-x-2 animate-fade-in text-xs">
                <CheckCircle className="w-4 h-4 text-pine-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-headline font-semibold text-pine-accent">Successfully Subscribed!</p>
                  <p className="text-[10px] text-mist-white/80">Checking voucher box shortly...</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col space-y-1.5">
                <div className="flex border-b border-mist-white/40 pb-1 focus-within:border-pine-accent transition-colors">
                  <Mail className="w-4 h-4 text-mist-white/60 mr-2 mt-1 shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="Input summer email..."
                    className="bg-transparent border-none text-xs text-white placeholder-mist-white/50 w-full outline-none focus:ring-0 px-0"
                  />
                  <button 
                    type="submit" 
                    className="text-pine-accent hover:text-white transition-colors"
                    title="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                {error && <span className="font-mono text-[10px] text-red-300">{error}</span>}
              </form>
            )}
            
            <div className="pt-2 text-left">
              <span className="inline-flex items-center space-x-1.5 bg-white/10 px-3 py-1 rounded-full text-[10px] font-mono text-pine-accent">
                <Sparkles className="w-3 h-3 animate-spin text-pine-accent" />
                <span>Breathtaking altitude await</span>
              </span>
            </div>
          </div>
        </div>

        {/* Outer bottom copyright statement */}
        <div className="border-t border-mist-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-mist-white/60">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} Highland Mist Baguio. Built for authentic mountain explorers. All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase mt-2 sm:mt-0 tracking-widest text-pine-accent/50">
            Design paired with Hanken Grotesk & Inter
          </p>
        </div>
      </div>
    </footer>
  );
}
