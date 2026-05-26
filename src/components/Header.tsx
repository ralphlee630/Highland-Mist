/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Compass, Menu, X, Clock, Landmark as IconLandmark, Heart, Search } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setTab: (tab: string) => void;
  onOpenBooking: () => void;
  itemCount: number;
  onOpenBookmarks: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function Header({
  currentTab,
  setTab,
  onOpenBooking,
  itemCount,
  onOpenBookmarks,
  searchTerm,
  setSearchTerm
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    tick();
    const interval = setInterval(tick, 60000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'explore', label: 'Explore' },
    { id: 'landmarks', label: 'Landmarks' },
    { id: 'culture', label: 'Culture' },
    { id: 'plan', label: 'Plan' },
    { id: 'ordinances', label: 'Ordinances' },
    { id: 'education', label: 'Education' }
  ];

  const handleTabClick = (tabId: string) => {
    setTab(tabId);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav
        id="top-nav"
        className={`fixed top-0 w-full z-50 transition-all duration-300 font-sans ${
          scrolled
            ? 'bg-mist-glow shadow-md border-b border-outline-variant/30 backdrop-blur-md py-3'
            : 'bg-mist-glow/85 backdrop-blur-md py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div 
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={() => handleTabClick('explore')}
            >
              <div className="p-2 bg-pine-deep text-mist-white rounded-lg group-hover:bg-pine-light transition-colors duration-200">
                <Compass className="h-5 w-5 animate-pulse" />
              </div>
              <div>
                <span className="font-headline font-bold text-xl text-charcoal tracking-tight block">
                  Highland Mist
                </span>
                <span className="font-mono text-[9px] text-pine-light uppercase tracking-wider block -mt-1 font-semibold">
                  Summer Capital Guide
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 items-center">
              {navItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`font-sans text-[15px] font-medium tracking-tight transition-all pb-1 duration-200 ${
                      isActive
                        ? 'text-pine-deep border-b-2 border-pine-deep font-semibold'
                        : 'text-outline hover:text-pine-deep'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Actions Panel */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center text-xs font-mono text-outline border border-outline-variant/40 rounded-full px-3 py-1 bg-white/50">
                <Clock className="w-3.5 h-3.5 text-pine-light mr-1.5" />
                <span>Baguio {currentTime}</span>
              </div>

              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`text-outline hover:text-pine-deep p-2 rounded-full transition-colors ${
                  searchTerm ? 'bg-sky-tint text-sky-blue' : 'hover:bg-white/50'
                }`}
                title="Search landmarks, local laws, schools..."
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Bookmarks Folder Link */}
              <button
                onClick={onOpenBookmarks}
                className="relative text-outline hover:text-pine-deep p-2 hover:bg-white/50 rounded-full transition-all duration-200"
                title="Saved Places Itinerary"
              >
                <Heart className={`h-5 w-5 ${itemCount > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-red-500 rounded-full">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                onClick={onOpenBooking}
                className="bg-pine-deep text-mist-white font-headline text-xs tracking-wider uppercase font-semibold px-5 py-2.5 rounded-full hover:bg-pine-light transform hover:-translate-y-0.5 active:translate-y-0 shadow-sm transition-all duration-300"
              >
                Book Now
              </button>
            </div>

            {/* Mobile Actions Drawer menu */}
            <div className="flex md:hidden items-center space-x-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-outline hover:text-pine-deep p-1.5"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={onOpenBookmarks}
                className="relative text-outline p-1.5"
              >
                <Heart className={`h-5 w-5 ${itemCount > 0 ? 'fill-red-500 text-red-500 text-red-500' : ''}`} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-[9px] font-bold leading-none text-white bg-red-500 rounded-full">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="text-pine-deep hover:bg-white/40 p-2 rounded-lg transition-colors border border-outline-variant/30"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Global Search Overlay Panel */}
        {searchOpen && (
          <div className="bg-white border-t border-b border-outline-variant/30 py-3 px-4 shadow-sm animate-fade-in">
            <div className="max-w-3xl mx-auto flex items-center space-x-2">
              <Search className="w-5 h-5 text-outline" />
              <input
                type="text"
                placeholder="Search landmarks, local rules/ordinances, culture, universities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-sky-blue focus:ring-0 font-sans text-sm py-1.5 outline-none transition-colors"
                autoFocus
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="font-mono text-xs text-outline hover:text-pine-deep px-2 py-1 bg-outline-variant/20 rounded"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearchTerm('');
                }}
                className="text-sm font-medium text-outline hover:text-pine-deep px-2"
              >
                Close
              </button>
            </div>
            {searchTerm && (
              <div className="max-w-3xl mx-auto text-xs text-outline mt-2 font-mono">
                Showing relative filters for: &ldquo;<span className="text-pine-deep font-semibold">{searchTerm}</span>&rdquo;
              </div>
            )}
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="md:hidden bg-mist-white border-b border-outline-variant/30 animate-slide-down">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-outline-variant/20">
              {navItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-pine-deep text-mist-white font-semibold'
                        : 'text-outline hover:bg-white/40 hover:text-pine-deep'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            <div className="p-4 border-t border-outline-variant/20 flex flex-col space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-outline">
                <span>Current Time:</span>
                <span>Baguio {currentTime}</span>
              </div>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-pine-deep text-mist-white font-headline text-center uppercase tracking-wider text-xs font-semibold py-3 rounded-lg shadow"
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </nav>
      {/* Scroll gap element to push main down */}
      <div className="h-20" />
    </>
  );
}
