/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Compass,
  MapPin,
  Heart,
  Calendar,
  AlertTriangle,
  GraduationCap,
  Sparkles,
  Search,
  BookOpen,
  ArrowRight,
  Flame,
  Star,
  Trash2,
  Check,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  HelpCircle,
  Clock,
  X
} from 'lucide-react';

import { LANDMARKS, ORDINANCES, INSTITUTIONS, CULTURE_EVENTS } from './data.ts';
import { Landmark, Ordinance, Institution, CultureEvent } from './types.ts';

import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import BookingPortal from './components/BookingPortal.tsx';
import ItineraryEngine from './components/ItineraryEngine.tsx';
import DetailModal from './components/DetailModal.tsx';

export default function App() {
  // Global States
  const [currentTab, setTab] = useState<string>('explore');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Modals & Sidebars
  const [bookingOpen, setBookingOpen] = useState<boolean>(false);
  const [bookmarksOpen, setBookmarksOpen] = useState<boolean>(false);
  const [detailModal, setDetailModal] = useState<{ id: string; type: 'landmark' | 'ordinance' | 'institution'; data: any } | null>(null);

  // User Interactive Bookmarks / Favorites Checklist State
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  // Landmark Filtering State
  const [landmarkFilter, setLandmarkFilter] = useState<string>('All');

  // Interactive Ordinance Report State
  const [reportOrdinance, setReportOrdinance] = useState<string>('smoke-free');
  const [reportLocation, setReportLocation] = useState<string>('');
  const [reportAlertLevel, setReportAlertLevel] = useState<string>('medium');
  const [reportDescription, setReportDescription] = useState<string>('');
  const [reportSuccess, setReportSuccess] = useState<string | null>(null);

  // Initialize bookmarks count from localStorage if present
  useEffect(() => {
    const saved = localStorage.getItem('highland_mist_bookmarks');
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Sync state back to client storage
  const saveBookmarks = (newBookmarks: string[]) => {
    setBookmarks(newBookmarks);
    localStorage.setItem('highland_mist_bookmarks', JSON.stringify(newBookmarks));
  };

  const handleToggleBookmark = (id: string) => {
    const isSaved = bookmarks.includes(id);
    let updated;
    if (isSaved) {
      updated = bookmarks.filter((bId) => bId !== id);
    } else {
      updated = [...bookmarks, id];
    }
    saveBookmarks(updated);
  };

  const isBookmarked = (id: string) => bookmarks.includes(id);

  const toggleChecklistItem = (id: string) => {
    setChecklist(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Render trigger functions
  const openDetailCard = (id: string, type: 'landmark' | 'ordinance' | 'institution') => {
    let sourceData = null;
    if (type === 'landmark') sourceData = LANDMARKS.find((x) => x.id === id);
    if (type === 'ordinance') sourceData = ORDINANCES.find((x) => x.id === id);
    if (type === 'institution') sourceData = INSTITUTIONS.find((x) => x.id === id);
    
    if (sourceData) {
      setDetailModal({ id, type, data: sourceData });
    }
  };

  // Filter components logic
  const filteredLandmarks = LANDMARKS.filter((l) => {
    const matchesSearch = searchTerm
      ? l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.category.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
      
    const matchesCategory = landmarkFilter === 'All' ? true : l.category === landmarkFilter;
    
    return matchesSearch && matchesCategory;
  });

  const filteredOrdinances = ORDINANCES.filter((o) => {
    return searchTerm
      ? o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.category.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
  });

  const filteredSchools = INSTITUTIONS.filter((s) => {
    return searchTerm
      ? s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.category.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
  });

  // Handle reporting submit handler
  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportLocation || !reportDescription) return;

    const refCode = `POLICE-${Math.floor(1000 + Math.random() * 9000)}`;
    setReportSuccess(refCode);
    setTimeout(() => {
      setReportLocation('');
      setReportDescription('');
      setReportSuccess(null);
    }, 6000);
  };

  return (
    <div className="min-h-screen bg-background-primary flex flex-col font-sans selection:bg-pine-accent selection:text-pine-deep">
      
      {/* 1. TOP HEADER NAVIGATION */}
      <Header
        currentTab={currentTab}
        setTab={setTab}
        onOpenBooking={() => setBookingOpen(true)}
        itemCount={bookmarks.length}
        onOpenBookmarks={() => setBookmarksOpen(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* 2. DYNAMIC CONTENT VIEWS */}
      <main className="flex-grow">
        
        {/* ========================================================= */}
        {/* TAB 1: EXPLORE (HOME SCREEN)                              */}
        {/* ========================================================= */}
        {currentTab === 'explore' && (
          <div className="space-y-16 pb-20">
            {/* HERO SEGMENT HERO BANNER */}
            <section className="relative h-[80vh] min-h-[550px] flex items-center justify-center bg-pine-deep overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzL7MT9J-0bV73ggS-PlBmc-IW4uQ_RuBer7WvGy2wvlqY0l58nnBPrnkXhj70PykXyiik3z9iNWaeNyACePw5EtxedjQBoT3SvJAyfQZ2I2L7B9_JAmkzc38dYbcE5H-InhR5bZcxSqlYSLKMJxgsQnubwiy13C9nj0lIs-wGOJ6oeRPbmmX8EZV7bAQ1EkRdEqN3Q3oTwYlKJjTBvS1Roa7TGKIOvR2roMUy6xyXB_nhQ6mQqS315Aki_iicL7KH2Ro8bbUYz-bf"
                  alt="Misty pine forest landscape"
                  className="w-full h-full object-cover object-center opacity-70 scale-105 transition-transform duration-700 hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-pine-deep/40 via-pine-deep/20 to-background-primary z-10" />
              </div>

              <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
                <span className="inline-block px-4 py-1.5 rounded-full bg-sky-tint/80 backdrop-blur-md text-sky-blue font-mono text-xs uppercase tracking-widest font-semibold shadow-sm border border-white/20">
                  The Summer Capital
                </span>
                <h1 className="font-headline text-white text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight drop-shadow">
                  Breathe in the <br /> Highland Mist
                </h1>
                <p className="font-sans text-sm sm:text-base md:text-lg text-mist-white max-w-2xl mx-auto leading-relaxed drop-shadow">
                  Escape to the cool, pine-scented environment of Baguio City. Discover centuries of rich heritage, unique backstrap looms, and misty sunrise valleys that invite you to slow down.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={() => {
                      setTab('plan');
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center space-x-2 bg-mist-white text-pine-deep px-8 py-3.5 rounded-full font-headline text-xs font-bold uppercase tracking-wider hover:bg-sky-tint hover:-translate-y-0.5 active:translate-y-0 shadow-lg transition-all duration-300 pointer-events-auto"
                  >
                    <span>Start Your Adventure</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setBookingOpen(true)}
                    className="inline-flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-full font-headline text-xs font-semibold uppercase tracking-wider border border-white/20 transition-all duration-300"
                  >
                    <Flame className="w-4 h-4 text-pine-accent shrink-0 animate-bounce" />
                    <span>Book Pine Cabins</span>
                  </button>
                </div>
              </div>
            </section>

            {/* OVERVIEW SECTION (ASYMMETRIC GRID) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 space-y-6 order-2 lg:order-1 text-left">
                  <span className="font-mono text-xs text-pine-light font-bold uppercase tracking-wider block">
                    Our Pine heritage
                  </span>
                  <h2 className="font-headline font-bold text-3xl sm:text-4xl text-pine-deep leading-tight">
                    A City Woven <br /> Among the Pines
                  </h2>
                  <p className="font-sans text-sm text-outline leading-relaxed">
                    Perched high in the Cordillera Central mountain range, Baguio City offers a refreshing sanctuary from the tropical lowlands. Known affectionately as the City of Pines, its winding trails reveal breathtaking vistas, historical parks, and a highly active local arts scene.
                  </p>
                  <p className="font-sans text-sm text-outline leading-relaxed">
                    Whether you seek the quiet tranquility of a foggy morning jog at Burnham or the sensory bloom of the Panagbenga festival, Baguio promises an unforgettable high-altitude experience.
                  </p>
                  <button
                    onClick={() => {
                      setTab('culture');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center space-x-1 font-mono text-xs font-bold text-pine-deep uppercase tracking-wider border-b border-pine-light pb-1 hover:text-pine-light transition-colors"
                  >
                    <span>Read local Culture stories</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="lg:col-span-7 relative order-1 lg:order-2">
                  <div className="absolute -inset-4 bg-sky-tint/40 rounded-2xl -z-10 transform translate-x-4 translate-y-4" />
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDVs4_KzjVQwbaJkyVkK8_VJk9nKeUX7YpExdTqI4-2C6ZwWxhcoxR8wq-RRR-OfDqMxQKBVZJdY-H9yOkBzUqXiclZcZ5kyd5x6laPDWNhJxPeDWDsgOm3WeXKpvBplzfZh7BgyAYHeWBCS6R_NqCLfZha7oyMTDpeJTxHdDSbO0SGP0uIA6M0hNYYM45KlTHxy5pNggPPcHv-cq1DXhDhovrL8JMrQ703w4DQW9GmfeR__NAYwcm27rVxP7bCasFgDRM3xK9ecy1"
                    alt="Hillside Baguio City view under fog"
                    className="w-full h-auto rounded-2xl shadow-md object-cover aspect-[4/3]"
                  />
                </div>
              </div>
            </section>

            {/* THREE CORE FAVORITE LANDSCAPES */}
            <section className="bg-surface-container-low py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10">
                  <div className="text-left">
                    <span className="font-mono text-[11px] text-sky-blue font-bold uppercase tracking-wider block">
                      Curated Highlands
                    </span>
                    <h2 className="font-headline font-bold text-2xl sm:text-3xl text-pine-deep">
                      Iconic Landscapes
                    </h2>
                    <p className="font-sans text-xs text-outline mt-1 max-w-sm">
                      Check out the foundational sights framing the mountain capital.
                    </p>
                  </div>
                  <button
                    onClick={() => setTab('landmarks')}
                    className="inline-flex items-center space-x-1.5 text-pine-deep hover:text-pine-light transition-colors text-xs font-mono uppercase tracking-wider font-bold mt-4 sm:mt-0"
                  >
                    <span>View all landmarks ({LANDMARKS.length})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {LANDMARKS.slice(0, 3).map((landmark) => (
                    <article
                      key={landmark.id}
                      className="bg-white rounded-xl overflow-hidden border border-outline-variant/30 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col group"
                    >
                      <div className="relative h-56 overflow-hidden shrink-0">
                        <img
                          src={landmark.image}
                          alt={landmark.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full border border-outline-variant/20 shadow-sm text-[10px] font-mono text-pine-deep uppercase tracking-wider font-bold">
                          {landmark.category}
                        </div>
                      </div>

                      <div className="p-5 flex-grow flex flex-col justify-between text-left">
                        <div className="space-y-2">
                          <h3 className="font-headline font-bold text-base text-charcoal leading-snug group-hover:text-pine-deep transition-colors">
                            {landmark.name}
                          </h3>
                          <p className="font-sans text-xs text-outline leading-relaxed line-clamp-3">
                            {landmark.description}
                          </p>
                        </div>

                        <div className="pt-4 flex items-center justify-between border-t border-outline-variant/20 mt-4 text-[11px] text-outline">
                          <button
                            onClick={() => openDetailCard(landmark.id, 'landmark')}
                            className="inline-flex items-center font-mono font-bold text-pine-deep hover:underline focus:outline-none"
                          >
                            <span>Learn More &amp; Tips</span>
                            <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </button>
                          <button
                            onClick={() => handleToggleBookmark(landmark.id)}
                            className="p-1.5 rounded-full hover:bg-sky-tint/50 text-outline hover:text-red-500 focus:outline-none transition-colors"
                            title="Save"
                          >
                            <Heart className={`w-4 h-4 ${isBookmarked(landmark.id) ? 'fill-red-500 text-red-500' : ''}`} />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* CALL TO ACTION RETREATS BOX */}
            <section className="max-w-4xl mx-auto px-4 text-center">
              <div className="bg-white rounded-2xl border border-outline-variant/30 p-8 sm:p-12 ambient-shadow space-y-6">
                <Compass className="w-10 h-10 text-pine-deep mx-auto animate-spin" />
                <h3 className="font-headline font-bold text-2xl sm:text-3xl text-charcoal tracking-tight">
                  Ready for the Mountain Chill?
                </h3>
                <p className="font-sans text-sm text-outline max-w-xl mx-auto leading-relaxed">
                  Plan your customized itinerary walk folders, reserve pine log cabins, check off packing tips, and enjoy an unforgettable vacation escape above the fog lines.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
                  <button
                    onClick={() => {
                      setTab('plan');
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className="bg-pine-deep text-mist-white hover:bg-pine-light px-8 py-3 rounded-full text-xs font-headline font-bold tracking-wider uppercase transition-all shadow-md transform hover:-translate-y-0.5"
                  >
                    Design Custom escape Itinerary
                  </button>
                  <button
                    onClick={() => setBookingOpen(true)}
                    className="border border-outline-variant hover:border-pine-deep text-charcoal px-6 py-3 rounded-full text-xs font-headline font-semibold uppercase tracking-wider transition-colors"
                  >
                    Book Pine Cabins
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: LANDMARKS BENTO PORTAL                             */}
        {/* ========================================================= */}
        {currentTab === 'landmarks' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            
            {/* Introductory information panel */}
            <div className="text-center sm:text-left space-y-3">
              <h1 className="font-headline font-bold text-3xl sm:text-4xl text-pine-deep">
                Iconic Landmarks
              </h1>
              <p className="font-sans text-sm text-outline max-w-2xl leading-relaxed">
                Discover the breathtaking locations framing the Summer Capital. From historic Presidential estates to dense high-altitude strawberry fields, customize your saved travel bucket list below.
              </p>

              {/* Interactive Category Tabs filter */}
              <div className="flex flex-wrap gap-2 pt-2 justify-center sm:justify-start">
                {['All', 'Scenic', 'Recreation', 'Heritage', 'Agri-Tourism', 'Nature'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setLandmarkFilter(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-headline font-semibold tracking-tight transition-all border ${
                      landmarkFilter === cat
                        ? 'bg-pine-deep border-pine-deep text-mist-white font-bold shadow-sm'
                        : 'border-outline-variant bg-white text-outline hover:border-outline hover:text-charcoal'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Landmarks grid elements */}
            {filteredLandmarks.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-dashed border-outline-variant p-6 space-y-3">
                <p className="text-sm text-outline">No locations match your filters.</p>
                <button
                  onClick={() => {
                    setLandmarkFilter('All');
                    setSearchTerm('');
                  }}
                  className="bg-pine-deep text-white px-4 py-1.5 rounded-full text-xs font-semibold"
                >
                  Reset Active Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[auto]">
                {filteredLandmarks.map((landmark, idx) => {
                  // Asymmetric size assignments based on index
                  const isLarge = idx === 0 && landmarkFilter === 'All';
                  const gridSpan = isLarge ? 'lg:col-span-8' : 'lg:col-span-4';
                  
                  return (
                    <div
                      key={landmark.id}
                      className={`bg-white rounded-2xl overflow-hidden border border-outline-variant/30 shadow-sm flex flex-col ${gridSpan} hover:shadow-md transition-shadow group`}
                    >
                      <div className={`relative ${isLarge ? 'h-64 sm:h-80' : 'h-48'} overflow-hidden shrink-0`}>
                        <img
                          src={landmark.image}
                          alt={landmark.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 bg-sky-tint/90 backdrop-blur-sm px-3 py-1 rounded-full border border-outline-variant/20 shadow text-[10px] font-mono text-pine-deep uppercase tracking-wider font-bold">
                          {landmark.category}
                        </div>
                      </div>

                      <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between text-left">
                        <div className="space-y-3">
                          <h2 className="font-headline font-bold text-lg sm:text-xl text-charcoal leading-snug group-hover:text-pine-deep transition-colors">
                            {landmark.name}
                          </h2>
                          <p className="font-sans text-xs leading-relaxed text-outline">
                            {landmark.description}
                          </p>
                        </div>

                        <div className="pt-6 flex items-center justify-between border-t border-outline-variant/20 mt-6 text-xs text-outline">
                          <button
                            onClick={() => openDetailCard(landmark.id, 'landmark')}
                            className="bg-pine-deep text-mist-white hover:bg-pine-light px-5 py-2 rounded-lg text-xs font-headline font-semibold flex items-center space-x-1"
                          >
                            <span>Learn More &amp; Tips</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                          
                          <button
                            onClick={() => handleToggleBookmark(landmark.id)}
                            className={`p-2 rounded-full border transition-all ${
                              isBookmarked(landmark.id)
                                ? 'border-red-300 bg-red-50 text-red-500'
                                : 'border-outline-variant/40 text-outline hover:text-red-500 hover:bg-red-50'
                            }`}
                            title="Save"
                          >
                            <Heart className={`w-4 h-4 ${isBookmarked(landmark.id) ? 'fill-red-500' : ''}`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: CULTURE & HERITAGE VIEWS                           */}
        {/* ========================================================= */}
        {currentTab === 'culture' && (
          <div className="space-y-16 pb-20">
            {/* Split header overlap */}
            <section className="relative h-[55vh] min-h-[400px] bg-pine-deep overflow-hidden">
              <div className="absolute inset-0">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1JZlAHT0vn9miH67xJjXteyMU9XOtk-8xNzdZoTduQM_rsEJe8x1VHY-6b0Y96OqMpXJSUxRhc5r-V9tYpBNknD-0UvxCM60PyGkNymzkT5xc4ra3vLVx1J18TUTS51Jkp_IxBafBiKC3KPggA8jDIk2pm60Y8EhCjocxR8M2d-TAuUqs9rqXFgVQWNpei_DlnkHFzHMSx4jMjoWvztMswhH1pK7nOb0vJMPqspgFuOeCqN1Bf10oJxEOJD1GqLKiTUjP60Jv8jqm"
                  alt="Vibrant parade of dancers playing gongs"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pine-deep/80 via-pine-deep/10 to-transparent" />
              </div>
              <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-12 sm:pb-16 text-left">
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-md border border-outline-variant/30 relative z-10 transition-transform hover:scale-[1.01]">
                  <span className="font-mono text-xs text-sky-blue tracking-widest uppercase block mb-2 font-bold">
                    Heritage &amp; Celebrations
                  </span>
                  <h1 className="font-headline font-bold text-2xl sm:text-3xl text-charcoal mb-3">
                    The Heartbeat of the Highlands
                  </h1>
                  <p className="font-sans text-xs text-outline leading-relaxed">
                    Cordilleran and Ilocano ancestry runs deep. Discover the exquisite backstrap hand weaving, detailed silverworks, and the dynamic seasonal floral floats that define Baguio.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTIONS BENTO SIGHTS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              
              {/* PANAGBENGA FESTIVAL EXPANDER */}
              <div className="space-y-8">
                <div className="text-center md:text-left space-y-2">
                  <h2 className="font-headline font-bold text-2xl sm:text-3xl text-pine-deep">
                    Panagbenga: A Season of Blooming
                  </h2>
                  <p className="font-sans text-sm text-outline max-w-2xl leading-relaxed">
                    Celebrated every February, this flower festival represents Baguio resurrection and abundance. Explore our local floral parade float features below.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Huge Card */}
                  <div className="md:col-span-8 bg-white rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm relative group">
                    <div className="h-64 sm:h-96 relative overflow-hidden">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuArq0q5odagqTmMxzenhh_2wf2_RiyEjavZ43TXzy0y1DQ_QWYiBXrvbRGr56zby9L1ROo_SSMaMv4FwhbvqwqOGtuTgTppvNNrappS-x44I41LWggHzpsZ-goRzOAdk_POQfzhYprKW-H7fyEgvOMC7cZ_CnTDU5SwA6EUpSqL_TYYFwkioAaM0NjTgAINQK_qzSPnZwGHdiRVp-ADwgtNbOxmdcIxqbmORjgc-LYrh66pvwoIStR9VlMFiulQUHqRxpbw1BeYvX0U"
                        alt="Massive floral parade float eagle"
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent z-10" />
                      <div className="absolute bottom-6 left-6 right-6 text-white text-left z-20">
                        <span className="font-mono text-[10px] text-pine-accent uppercase block">ANNUAL MASTERPIECE</span>
                        <h4 className="font-headline font-bold text-lg sm:text-xl">Grand Floral parade Floats</h4>
                        <p className="text-xs text-mist-white/90 leading-relaxed max-w-sm">
                          Entirely crafted using thousands of organic fresh flowerbuds representing upland Cordilleran folklore.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Smaller Card */}
                  <div className="md:col-span-4 flex flex-col justify-between space-y-6">
                    <div className="bg-white rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm flex-grow group relative h-48 sm:h-auto">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIm1mmbWXT8LiizYfE8n6m0NVpLbGCQvGrYqoy__bBhSqlE9FOWU45YexQwisKNuDWZvpBAtGOktoAOFCpjxp91gHaDtzNXQ3sylUPz9o6WRVetx3uCdE4DqZyVLOK5WyyhpdfVRVprQIGde7fzhnzTxwNGkiXlEoliZZH7LmYf0DL7Xcn12Sgtt_ovwyA-nf65x_SIPAFrczQ0eaazDXfzbV_hvHfOLbm9OiV4dKscSWkBlvemblvlGhmwecnqCt9ASb1zje8KkWU"
                        alt="Cordilleran traditional street dancer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-pine-deep/40" />
                      <div className="absolute bottom-4 left-4 text-white text-left">
                        <span className="px-2.5 py-1 bg-pine-accent/90 text-charcoal font-mono text-[9px] font-bold rounded-full uppercase">
                          Street Gong Performance
                        </span>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm text-left">
                      <Compass className="w-6 h-6 text-pine-deep mb-3" />
                      <h4 className="font-headline font-bold text-sm text-charcoal">Session Road in Bloom</h4>
                      <p className="text-xs text-outline leading-relaxed mt-1">
                        Baguio prime avenue shifts to entirely car-free for one full week, showcasing native flower exhibition booths, acoustic guitar sets, and local food.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ASYMMETRIC WEAVING SECTION */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
                <div className="lg:col-span-5 space-y-6 text-left">
                  <span className="font-mono text-xs text-sky-blue tracking-widest uppercase block font-bold">Deep Roots</span>
                  <h3 className="font-headline font-bold text-2xl sm:text-3xl text-pine-deep">Woven Through Generations</h3>
                  <p className="font-sans text-sm text-outline leading-relaxed font-sans">
                    Before modern hotels dotted the ridges, Baguio represented a quiet sanctuary for native Ibaloi clans and Ilocano settlers. Modern-world hand weaving has retained all its mathematical geometric patterns and tribal alignments across generations.
                  </p>
                  <p className="font-sans text-xs text-outline leading-relaxed font-sans">
                    Each design layout maps lineage, geomorphology alignments, and respects local mountain ecosystems deeply.
                  </p>
                </div>

                <div className="lg:col-span-7 relative">
                  <div className="absolute -inset-4 bg-sky-tint/40 rounded-2xl transform rotate-2" />
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz-L2oHgXOQwBUJUnsDp1fKlWE6uZX9Tna7jXXtlgZOPw4aZ5OOcjcHtnvI4eR0A3KD6oOknQc5NWfxAjOYwghBy7xfmL24xvfMjpwmMZOl4KMZ1AKQvDLBPKErLjBCEetpOc3IJVQaqtL0qCIeGn2aI5oM4QaY7wHC3Z9Ldr-NXi7ywPP_na2JaqlRKvjVPatCsLtMAWGOQ5IjjJFyS-ewUjXMRBXWDROYLdpMpN-XkhRcb0eZ4rZZ9L1Wt0aJ080qSp5SHUtD4xS"
                    alt="Elderly artisan backstrap weaving"
                    className="relative rounded-2xl shadow-sm w-full object-cover h-96 sm:h-[450px]"
                  />
                </div>
              </div>

              {/* LOCAL SILVERWORKS AND WOODCARVINGS */}
              <div className="space-y-6 pt-12">
                <div className="text-center sm:text-left">
                  <h3 className="font-headline font-bold text-xl sm:text-2xl text-charcoal">Artisanal Masterclass Workshops</h3>
                  <p className="text-xs text-outline font-sans">Visit direct local cooperatives situated around Asin Road of Baguio.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Silvermaking */}
                  <div className="bg-white border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm flex flex-col sm:flex-row text-left group">
                    <div className="sm:w-1/2 h-56 sm:h-auto overflow-hidden">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqsIaamji5j3gRq1IdYEC9LljiuxO6TGtf999vLp3L_TNCzJUbiw_pT3LqUz-NdGZfIN_H-ZuOU_cyQ-N7V8KSKr9_Fv5OV1yDFgOHU1xzZcXPDSpZL-YM5u1kct2XFsoHamAGucOwzmV9fdLzKAe3wqKoTuVuNWjt_Mbl2AbyqQK44E-hh8-KSL-i_eeCVTshaLWpCLxtNqqSVpOBI2T1FO2hr-qwpXQUb9UKLofH3GU1HEB7LbpLEqwucv-chxcXPs7T3Au3nCbR"
                        alt="Fine silversmithing wire"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 sm:w-1/2 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="font-mono text-[9px] uppercase tracking-wide text-sky-blue block">BENEGUET METALCRAFT</span>
                        <h4 className="font-headline font-bold text-base text-charcoal">Baguio Silverworks</h4>
                        <p className="text-xs text-outline leading-relaxed font-sans">
                          A local trademark skill of twisted fine silver wires arranged into micro floral filigree motifs. Extremely famous for longevity.
                        </p>
                      </div>
                      <button
                        onClick={() => openDetailCard('mines-view', 'landmark')}
                        className="text-pine-deep hover:underline text-xs font-mono font-bold mt-4 focus:outline-none text-left"
                      >
                        Explore local workshop tags &gt;
                      </button>
                    </div>
                  </div>

                  {/* Woodcarving */}
                  <div className="bg-white border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm flex flex-col sm:flex-row text-left group">
                    <div className="sm:w-1/2 h-56 sm:h-auto overflow-hidden sm:order-last">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0Ys2WveUKPiujTYtKWSGeQ0D40s5MkYEf095Nxu5KTCD85rqMls_cXTMo_x_4k2duNLjnQj9YZ6FFivQnMQKGNadIg_nGOPVOrpRd8UQRkS9-twaFDsj-NKhg4hLOaJcC8vsSryRs6mAwHDu8AXOC1-8RPsNIAuain1EBf18TtVXRXka-6CdJdeQcslhYBr5JbJV1hcLovfBIkXNsOuTiihiHTlF18-NMeASb5KXZ7j28XlUJFIaJP7hnsBdjH47P5DWj2eCXmzLK"
                        alt="Intricate wood carvings displayed"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 sm:w-1/2 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="font-mono text-[9px] uppercase tracking-wide text-earth-brown block">ASIN ROAD SCULPTORS</span>
                        <h4 className="font-headline font-bold text-base text-charcoal">Ifugao Woodcarvings</h4>
                        <p className="text-xs text-outline leading-relaxed font-sans">
                          Sustainably sourced mahogany tree trunk sculptures representing historical Bulul guardians, eagles, and Cordillera community symbols.
                        </p>
                      </div>
                      <button
                        onClick={() => openDetailCard('the-mansion', 'landmark')}
                        className="text-pine-deep hover:underline text-xs font-mono font-bold mt-4 focus:outline-none text-left"
                      >
                        View woodcarving trails &gt;
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </section>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: PLAN (TRAVEL PREPARATIONS)                         */}
        {/* ========================================================= */}
        {currentTab === 'plan' && (
          <div className="space-y-16 pb-20">
            {/* Header banner cover styling */}
            <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center bg-pine-deep">
              <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD3oBKodssnTkOhx6flOibbfffFVWtgNSLS_3L4agnYxyehTye61Xce5iTcTpG3teVTZv5l0lzBQceBtq2vZ_eMEs9cYgWPg_XYNZwToju3SPWIl26FbMkDcJN4IUrmlKzs_cfMkzHaSwCsmC6nCYb-Pop3EB0qR5RKhWS3eFVsdMSZi7FiyDIuF1nbVjojtqIr1WWRCinGfwoMOgWUgiUBFdMUUnEb5xQfgjOESwyv6Y8GWsSN9lXE7ERZ3WxY_QrIzrBzxBBml4DN')` }}>
                <div className="absolute inset-0 bg-gradient-to-b from-pine-deep/40 via-pine-deep/10 to-background-primary" />
              </div>
              <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-4">
                <span className="font-mono text-xs text-pine-accent bg-pine-deep/60 px-3 py-1 rounded-full uppercase tracking-widest font-bold">
                  Highlands Preparation Vibe
                </span>
                <h1 className="font-headline font-semibold text-3xl sm:text-[54px] sm:leading-tight text-white drop-shadow-md">
                  Plan Your Baguio Escape
                </h1>
                <p className="font-sans text-xs sm:text-sm text-mist-white max-w-xl mx-auto leading-relaxed opacity-95">
                  Everything required to establish an absolute visual retreat. Navigate the seasons, filter tip checklists, and let our custom planner plan your weekend walk paths!
                </p>
              </div>
            </section>

            {/* Preparation lists */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              
              {/* When of Visit Seasons lists */}
              <div className="space-y-8 text-center sm:text-left">
                <div className="space-y-1">
                  <h2 className="font-headline font-bold text-2xl sm:text-3xl text-pine-deep">
                    When to Visit
                  </h2>
                  <p className="font-sans text-xs text-outline font-sans">
                    Our city enjoys cooling drafts throughout the year, but select your target atmosphere carefully.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* December - February */}
                  <div className="bg-white rounded-xl p-6 border border-outline-variant/30 text-left space-y-4 flex flex-col justify-between shadow-sm">
                    <div className="space-y-3">
                      <div className="w-10 h-10 bg-sky-tint text-sky-blue rounded-full flex items-center justify-center font-bold font-mono">
                        10°
                      </div>
                      <h4 className="font-headline font-bold text-base text-charcoal">The Cool Months</h4>
                      <p className="font-mono text-[10px] text-sky-blue tracking-wider uppercase font-bold">DECEMBER - FEBRUARY</p>
                      <p className="text-xs text-outline leading-relaxed font-sans">
                        Temperatures regularly drop to their absolute lowest, creating gorgeous thick sheets of morning mist. Perfect for hot taho and heavy coats.
                      </p>
                    </div>
                    <div className="pt-2 flex flex-wrap gap-1">
                      <span className="bg-slate-100 text-[9px] text-outline px-2 py-0.5 font-mono">PEAK SEASON</span>
                      <span className="bg-slate-100 text-[9px] text-outline px-2 py-0.5 font-mono">PANAGBENGA FESTIVAL</span>
                    </div>
                  </div>

                  {/* March - May */}
                  <div className="bg-pine-deep rounded-xl p-6 text-mist-white text-left space-y-4 flex flex-col justify-between shadow-md">
                    <div className="space-y-3">
                      <div className="w-10 h-10 bg-white/10 text-pine-accent rounded-full flex items-center justify-center font-bold font-mono">
                        19°
                      </div>
                      <h4 className="font-headline font-bold text-base text-white">The Summer Escape</h4>
                      <p className="font-mono text-[10px] text-pine-accent tracking-wider uppercase font-bold">MARCH - MAY</p>
                      <p className="text-xs text-mist-white/80 leading-relaxed font-sans">
                        Escape the searing tropical humidity of the coastal lowlands. Bright skies provide direct visibility of high Cordilleran ranges. Great for picking fresh strawberries.
                      </p>
                    </div>
                    <div className="pt-2 flex flex-wrap gap-1">
                      <span className="bg-white/10 text-[9px] text-pine-accent px-2 py-0.5 font-mono">POPULAR RETREAT</span>
                    </div>
                  </div>

                  {/* June - November */}
                  <div className="bg-white rounded-xl p-6 border border-outline-variant/30 text-left space-y-4 flex flex-col justify-between shadow-sm">
                    <div className="space-y-3">
                      <div className="w-10 h-10 bg-sky-tint text-sky-blue rounded-full flex items-center justify-center font-bold font-mono">
                        15°
                      </div>
                      <h4 className="font-headline font-bold text-base text-charcoal">The Misty Season</h4>
                      <p className="font-mono text-[10px] text-sky-blue tracking-wider uppercase font-bold">JUNE - NOVEMBER</p>
                      <p className="text-xs text-outline leading-relaxed font-sans">
                        Heavy mountain monsoons roll inside the pine valleys. Best suited for writers, artists, and families wanting a cozy, fireplace wood fire, with fewer crowds.
                      </p>
                    </div>
                    <div className="pt-2 flex flex-wrap gap-1">
                      <span className="bg-slate-100 text-[9px] text-outline px-2 py-0.5 font-mono">OFF-PEAK</span>
                      <span className="bg-slate-100 text-[9px] text-outline px-2 py-0.5 font-mono">BRING COATS & APPARATUS</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* INTEGRATED TRAVEL ENGINE WIDGET */}
              <div className="max-w-4xl mx-auto">
                <ItineraryEngine
                  onToggleBookmark={handleToggleBookmark}
                  isBookmarked={isBookmarked}
                  onOpenDetails={(landmarkId) => openDetailCard(landmarkId, 'landmark')}
                />
              </div>

            </section>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: CITY RULES & ORDINANCES                            */}
        {/* ========================================================= */}
        {currentTab === 'ordinances' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
            
            {/* Header banner and cover page representation */}
            <header className="relative rounded-2xl overflow-hidden min-h-[400px] flex items-end pb-12 px-8 bg-surface-container-high shrink-0 text-left">
              <div className="absolute inset-0 z-0">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNh4xnMSXvC8Quq2-v9mStLSJtnLrrPL_Dkb-R8XFkSSIxqIQzeyEn2I6UcDtg81VbquLdFo2rU_rBaqZwPi859i6fAYgJavpzbV0ydlwfT4nvfVZHe2I6Z7_sFaPNOO8Hs4CdYuok6PJNoONW3DRFQPZPLQm5TAEf-F2t6NHNkbT7pzAB4xq4ppakbCZIkzs--yF1mgc1PyVUdWkiFrlYLqNmREegyP60PkX68GHG-3YmQouJtvHcV_pp6d2w6AqJKZvHQvEsJToG"
                  alt="Historic colonial Baguio municipal hall"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pine-deep/90 via-pine-deep/45 to-transparent shadow-t-xl" />
              </div>

              <div className="relative z-10 text-mist-white max-w-3xl space-y-4">
                <span className="font-mono text-xs text-sky-tint bg-white/20 border border-white/20 px-3.5 py-1 rounded-sm uppercase tracking-widest font-semibold inline-block">
                  CIVIC TRAVELER GUIDE
                </span>
                <h1 className="font-headline font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                  City Rules &amp; Ordinances
                </h1>
                <p className="font-sans text-xs sm:text-sm text-mist-white/90 leading-relaxed max-w-2xl font-sans">
                  Welcome to the Summer Capital. To safeguard the unique botanical ecosystems and natural tranquility of our mountain city, we kindly ask all travelers to coordinate with these essential local regulations.
                </p>
              </div>
            </header>

            {/* Split rules grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Laws detail grid list */}
              <div className="lg:col-span-8 space-y-12">
                
                {/* 1. Essential Health Rules */}
                <section className="space-y-4">
                  <div className="flex items-center space-x-2 text-pine-deep text-left">
                    <ShieldCheck className="w-5 h-5 text-pine-deep" />
                    <h2 className="font-headline font-bold text-lg sm:text-xl text-pine-deep">Essential Civic Rules</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredOrdinances.map((law) => (
                      <div
                        key={law.id}
                        className="bg-white rounded-xl p-5 border border-outline-variant/30 shadow-none hover:shadow-sm transition-all text-left flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            law.category === 'Health' ? 'bg-red-50 text-red-500' : law.category === 'Environmental' ? 'bg-emerald-50 text-emerald-600' : 'bg-sky-tint text-sky-blue'
                          }`}>
                            <AlertTriangle className="w-5 h-5" />
                          </div>
                          
                          <h3 className="font-headline font-bold text-sm text-charcoal">
                            {law.name}
                          </h3>
                          <p className="text-xs text-outline leading-relaxed font-sans line-clamp-4">
                            {law.description}
                          </p>
                        </div>

                        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-outline font-semibold">
                          <button
                            onClick={() => openDetailCard(law.id, 'ordinance')}
                            className="text-pine-deep hover:underline focus:outline-none"
                          >
                            Read Full Penalties
                          </button>
                          <span className="text-red-600 font-mono">Fine up to ₱5,000</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 2. Environmental Stewardship visual feature */}
                <section className="space-y-4 text-left">
                  <div className="flex items-center space-x-2 text-pine-deep">
                    <CheckCircle2 className="w-5 h-5 text-pine-deep" />
                    <h2 className="font-headline font-bold text-lg sm:text-xl text-pine-deep">Environmental Integrity</h2>
                  </div>

                  <div className="bg-sky-tint/20 rounded-2xl border border-sky-tint/60 overflow-hidden shadow-sm grid grid-cols-1 sm:grid-cols-5 h-auto">
                    <div className="sm:col-span-2 h-44 sm:h-auto overflow-hidden relative">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_sjGlNVi055DFP6YM-4_ZwuymRBQnGTH5WFB2qZkZ7Qb0uzVeBp8RrLALuERH6o9zdCv4lcYVffWDU_wjQlGnWDWRIEURtHtQeUGgxmkC2jZKpSSthTx3trirlxEqEWmGGh2ngVxOb2zNDtTi30XkR0_-q92ry9MYRZDB2bhWB9hT2gHyzcXIjpcgQzd_pqP1tBVxmClVeKlrxvtbE7C5bjf4GYxY3hEVBqAzdFD96yegIKl_xDGHNpX57As3R3el8ivAw3EAKUb_"
                        alt="Highland pines canopy letting in early streams of light"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 sm:p-8 sm:col-span-3 flex flex-col justify-center space-y-4">
                      <h4 className="font-headline font-bold text-base text-charcoal">Anti-Plastic Ordinance Ban</h4>
                      <p className="text-xs text-outline leading-relaxed font-sans">
                        Baguio maintains strict garbage classification laws and zero-tolerance single-use plastic carrier bags. Grocery shoppers are strictly required to carry eco bags or canvas packs. Keep the trails clean!
                      </p>
                      <ul className="space-y-1.5 text-xs text-outline font-sans">
                        <li className="flex items-center space-x-2">
                          <span className="text-pine-deep font-bold">✔</span>
                          <span>Carry reusable canvas bags during Session Road shopping loops</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="text-pine-deep font-bold">✔</span>
                          <span>Throw plastics directly into designated red recycling bins</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>

              {/* Sidebar: Interactive Police reporting form and filters */}
              <div className="lg:col-span-4 sticky top-28 space-y-6 text-left">
                
                {/* Report violation form */}
                <div className="bg-white rounded-2xl p-6 border border-outline-variant/30 shadow-md space-y-4">
                  <div className="flex items-center space-x-2 text-red-600 mb-1">
                    <AlertTriangle className="w-5 h-5" />
                    <h3 className="font-headline font-bold text-sm text-charcoal">
                      Report Rules Violation
                    </h3>
                  </div>
                  
                  <p className="text-[11px] text-outline leading-snug">
                    Observe a violation of anti-plastic, smoking, or night karaoke laws? Submit a direct tip to the tourist response center.
                  </p>

                  {reportSuccess ? (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs space-y-2 animate-fade-in font-sans">
                      <p className="font-semibold flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" />
                        Report Lodged Successfully!
                      </p>
                      <p className="text-[10px] text-emerald-700 font-mono">
                        Reference Hash ID: <span className="font-bold underline">{reportSuccess}</span>
                      </p>
                      <p className="text-[10px] text-outline leading-tight">
                        The mobile response team has been notified at the specified coordinates.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleReportSubmit} className="space-y-4">
                      {/* select rule */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-outline block uppercase tracking-wider font-bold">Select Active rule broken</span>
                        <select
                          value={reportOrdinance}
                          onChange={(e) => setReportOrdinance(e.target.value)}
                          className="w-full bg-mist-white border border-outline-variant/40 rounded-lg p-2 text-xs outline-none focus:border-red-500 font-sans"
                        >
                          <option value="smoke-free">Smoke-Free Public Park Walkways</option>
                          <option value="anti-plastic">Single-use Styrofoam inside shop</option>
                          <option value="silent-night">Karaoke Sound bleeding after 10 PM</option>
                          <option value="pet-ownership">Dog Droppings let untouched on lawn</option>
                        </select>
                      </div>

                      {/* incident location */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-outline block uppercase tracking-wider font-bold">Specific Location / Landmark</span>
                        <input
                          type="text"
                          required
                          value={reportLocation}
                          onChange={(e) => setReportLocation(e.target.value)}
                          placeholder="e.g. Burnham Rose Garden row of swings"
                          className="w-full bg-slate-50 border border-outline-variant/40 rounded-lg p-2 text-xs outline-none focus:border-red-500 font-sans"
                        />
                      </div>

                      {/* alert intensity */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-outline block uppercase tracking-wider font-bold">Severity Alert Level</span>
                        <div className="flex space-x-2">
                          {['low', 'medium', 'high'].map((lvl) => (
                            <button
                              key={lvl}
                              type="button"
                              onClick={() => setReportAlertLevel(lvl)}
                              className={`flex-1 py-1 text-[10px] font-mono uppercase tracking-widest rounded border transition-all ${
                                reportAlertLevel === lvl
                                  ? 'bg-red-500 text-white border-red-500 font-bold shadow-sm'
                                  : 'border-outline-variant/50 text-outline hover:bg-slate-50'
                              }`}
                            >
                              {lvl}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* descriptions details */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-outline block uppercase tracking-wider font-bold">Describe what you observe</span>
                        <textarea
                          required
                          rows={2}
                          value={reportDescription}
                          onChange={(e) => setReportDescription(e.target.value)}
                          placeholder="Please provide details..."
                          className="w-full bg-slate-50 border border-outline-variant/40 rounded-lg p-2 text-xs outline-none focus:border-red-500 font-sans"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg text-xs font-headline font-bold uppercase tracking-wider transition-all shadow"
                      >
                        Send Report
                      </button>
                    </form>
                  )}
                </div>

                {/* Local contacts dispatch directory */}
                <div className="bg-pine-deep text-white rounded-2xl p-6 border border-pine-light/30 shadow space-y-4">
                  <div className="p-2 bg-white/10 rounded-lg w-10 h-10 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-pine-accent" />
                  </div>
                  <h4 className="font-headline font-bold text-sm text-white leading-none">Emergency Hotline Hub: 911</h4>
                  <p className="text-[11px] text-mist-white/80 leading-relaxed font-sans">
                    Tourist response units circulate 24 hours around Burnham Parks and public viewing lookouts to secure guest protection.
                  </p>
                  <p className="font-mono text-[10px] text-pine-accent block pt-1">
                    Hotline Police Desk: +63 (74) 442-1212
                  </p>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: HIGHER EDUCATION PORTAL                            */}
        {/* ========================================================= */}
        {currentTab === 'education' && (
          <div className="space-y-16 pb-20">
            {/* Main theme cover section */}
            <section className="relative h-[65vh] min-h-[455px] flex items-center justify-center bg-pine-deep overflow-hidden shrink-0">
              <div className="absolute inset-0 z-0">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgegj2JwxJxwqix0-J9AvtbQ3_QhQ010UT5evbNz9VutVZjw76l7b74M0ajzdwbxP_ncSzLeB1fgI2DlRRL47ZzQtFNL_LQ9cGhRRRyEe4CWqHcV0c12LlkG-yz5RsjBJwCBOUMIdyI3oRVwj6HmwEV72tzQqfGVx53lFM89IYJ8f6ZK_MuFHew58lduqgZmfHKfqaeg9s3lYXikjH5C7_5pzyH1XAnJfPCQPozGz1IgTztpUM6kOVdv-JWXgCiCP82hl-i1HLABnz"
                  alt="High campus of University in Baguio"
                  className="w-full h-full object-cover opacity-75 object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-pine-deep/30 via-pine-deep/40 to-background-primary z-10" />
              </div>

              <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-4">
                <span className="inline-block bg-pine-accent/95 text-pine-deep px-3.5 py-1 rounded-full font-mono text-xs uppercase tracking-widest font-bold shadow">
                  ACADEMIC EDUCATION DIRECTORY
                </span>
                <h1 className="font-headline font-bold text-4xl sm:text-[60px] sm:leading-tight text-white drop-shadow">
                  The Center for Education
                </h1>
                <p className="font-sans text-xs sm:text-sm text-mist-white max-w-xl mx-auto leading-relaxed opacity-95">
                  Nurturing progressive scientific minds amidst pristine mountain forests. Baguio City stands proudly as Northern Philippines leading University Hub, where the cooling mountain air sparks deep intellectual curiosity.
                </p>
              </div>
            </section>

            {/* School cards and detailed lists */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              
              <div className="space-y-2 text-center sm:text-left">
                <h2 className="font-headline font-bold text-2xl sm:text-3xl text-pine-deep">Premier Universities</h2>
                <p className="text-xs text-outline font-sans">Click View Details below to analyze structural key missions, active student count, and campus details.</p>
              </div>

              {/* Bento grid layout containing universities */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* 1. SLU Main featured card layout */}
                <article className="lg:col-span-8 bg-white rounded-2xl overflow-hidden border border-outline-variant/30 shadow-none hover:shadow-md transition-shadow flex flex-col justify-between text-left group">
                  <div className="relative h-64 sm:h-80 overflow-hidden shrink-0">
                    <img
                      src={INSTITUTIONS[0].image}
                      alt={INSTITUTIONS[0].name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-pine-deep text-white px-3 py-1 text-[10px] font-mono uppercase tracking-widest rounded shadow-sm">
                      EST. {INSTITUTIONS[0].established}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                    <div className="space-y-3">
                      <h3 className="font-headline font-bold text-lg sm:text-xl text-charcoal">
                        {INSTITUTIONS[0].name}
                      </h3>
                      <p className="text-xs text-outline leading-relaxed font-sans">
                        {INSTITUTIONS[0].description}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between text-xs text-outline">
                      <button
                        onClick={() => openDetailCard(INSTITUTIONS[0].id, 'institution')}
                        className="bg-pine-deep text-white hover:bg-pine-light px-5 py-2.5 rounded-lg text-xs font-headline font-semibold flex items-center space-x-1.5"
                      >
                        <span>Explore SLU Campus details</span>
                         <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono text-pine-deep font-bold">{INSTITUTIONS[0].studentCountText}</span>
                    </div>
                  </div>
                </article>

                {/* 2. Secondary schools cards (UP Baguio, UB, UC, Teachers Camp) */}
                <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
                  {INSTITUTIONS.slice(1, 3).map((school) => (
                    <div
                      key={school.id}
                      className="bg-white border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow text-left flex flex-col h-[280px] justify-between group"
                    >
                      <div className="h-28 overflow-hidden shrink-0 relative">
                        <img
                          src={school.image}
                          alt={school.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 left-2 bg-pine-deep text-white text-[9px] font-mono px-2 py-0.5 rounded">
                          EST. {school.established}
                        </div>
                      </div>

                      <div className="p-4 flex-grow flex flex-col justify-between">
                        <div className="space-y-1">
                          <h4 className="font-headline font-bold text-sm text-charcoal truncate">{school.name}</h4>
                          <p className="text-[11px] text-outline leading-relaxed font-sans line-clamp-2">
                            {school.description}
                          </p>
                        </div>
                        <button
                          onClick={() => openDetailCard(school.id, 'institution')}
                          className="text-pine-deep hover:underline text-xs font-mono font-bold mt-2 focus:outline-none text-left"
                        >
                          VIEW ENTRY GUIDELINES &gt;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* Spreading school indicators (UC and Teachers Camp remaining) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                {INSTITUTIONS.slice(3).map((school) => (
                  <div
                    key={school.id}
                    className="bg-white border border-outline-variant/30 rounded-xl overflow-hidden p-5 shadow-sm text-left flex flex-col justify-between h-[250px] group"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-[10px] font-mono text-outline">
                        <span>EST. {school.established}</span>
                        <span className="bg-sky-tint text-sky-blue px-2 py-0.5 rounded">{school.category}</span>
                      </div>
                      <h4 className="font-headline font-bold text-sm text-charcoal group-hover:text-pine-deep transition-colors">
                        {school.name}
                      </h4>
                      <p className="text-xs text-outline leading-relaxed line-clamp-4">
                        {school.description}
                      </p>
                    </div>

                    <button
                      onClick={() => openDetailCard(school.id, 'institution')}
                      className="text-pine-deep hover:underline text-xs font-mono font-bold pt-2 border-t border-slate-100 uppercase tracking-wider text-left focus:outline-none"
                    >
                      READ MISSION HISTORIES
                    </button>
                  </div>
                ))}

                {/* Narrative stat counter block */}
                <div className="bg-pine-deep text-white rounded-xl p-5 shadow border border-pine-light/30 flex flex-col justify-between h-[250px] text-left">
                  <div className="space-y-2">
                    <GraduationCap className="w-8 h-8 text-pine-accent" />
                    <h4 className="font-headline font-bold text-sm">Upland Scholar Population</h4>
                    <span className="text-[10px] text-pine-accent block uppercase font-mono tracking-widest">Active seasonal index</span>
                  </div>
                  <div>
                    <span className="text-3xl sm:text-4xl font-headline font-bold block leading-none text-pine-accent">
                      150k+
                    </span>
                    <span className="text-[11px] text-mist-white/80 block mt-1 leading-snug">
                      University scholars bring massive cultural density and economic synergy to Baguio City during school calendar weeks.
                    </span>
                  </div>
                </div>
              </div>

              {/* Historical narrative focus: Teachers camp */}
              <div className="bg-white rounded-2xl p-6 sm:p-10 border border-outline-variant/30 shadow grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
                <div className="lg:col-span-5 h-64 sm:h-80 overflow-hidden rounded-xl relative">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4cz21QJbFtojGFxqc51FLPlQ2jHIWsZPhyaouo4wWiZZgu4PqRJBOvOsI62LD60VzNwK9OUJxmNS7wL5wdlgl3trSNh5tV3DRLQZHiP4-rlSPT7wNOLXx4oIt9rGISFtra8O0puoo3dFu3Z6ZTBX5cTgUtsizCOf6EBKgtIa3c77g5EjTprPKOlqlSjjhR42MRlebd4nA29SuUn0NWBzXEIkml19KXKLz5KhqKw5fwtnQTP0Pa8tNablTXlTwqdiBfM14_5XjvFjf"
                    alt="Vintage-style historic pine compound of Teachers Camp"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
                </div>
                
                <div className="lg:col-span-7 space-y-4">
                  <span className="inline-flex items-center space-x-1.5 bg-sky-tint text-sky-blue px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold">
                    <span>Historic Origins</span>
                  </span>
                  <h3 className="font-headline font-bold text-xl sm:text-2xl text-charcoal">
                    Teachers Camp: Where It Began
                  </h3>
                  <p className="text-xs text-outline leading-relaxed font-sans">
                    Before Baguio was officially chartered in 1909 as a city, American educators envisioned establishing a high-elevation rest resort for public school workers. Constructed in 1908, Teachers Camp served as a serene training center for American Thomasite teachers who pioneered public school systems across the islands.
                  </p>
                  <p className="text-xs text-outline leading-relaxed font-sans">
                    Today, its sprawling wooden pine campus hosts prestigious civil seminars, athlete coaching, and national academic webinars.
                  </p>
                  <button
                    onClick={() => openDetailCard('teachers-camp', 'institution')}
                    className="inline-flex items-center space-x-1 border-2 border-sky-blue text-sky-blue text-xs font-headline font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg hover:bg-sky-blue hover:text-white transition-colors focus:outline-none"
                  >
                    <span>Analyze camp archival summary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </section>
          </div>
        )}

      </main>

      {/* 3. BOOKMARK DRAPER SIDEBAR OVERLAY */}
      {bookmarksOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-outline-variant/30 flex flex-col justify-between font-sans animate-slide-left">
          {/* Header block */}
          <div className="p-6 bg-mist-white border-b border-outline-variant/20 flex justify-between items-center">
            <div>
              <h3 className="font-headline font-bold text-base text-charcoal flex items-center">
                <Heart className="w-4.5 h-4.5 text-red-500 fill-red-500 mr-2" />
                My Saved Places Itinerary
              </h3>
              <p className="text-[10px] font-mono text-outline uppercase tracking-wider block">
                Your checklist planner
              </p>
            </div>
            <button
              onClick={() => setBookmarksOpen(false)}
              className="p-1.5 text-outline hover:text-charcoal hover:bg-outline-variant/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cards folder lists */}
          <div className="p-6 flex-grow overflow-y-auto space-y-4">
            {bookmarks.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <p className="text-sm text-outline font-sans">No saved places yet!</p>
                <p className="text-[11px] text-outline leading-relaxed font-sans">
                  Click the heart icon on any landmark, local rule, or university to build your customized checklist itinerary here. Let&apos;s travel!
                </p>
                <button
                  onClick={() => {
                    setBookmarksOpen(false);
                    setTab('landmarks');
                  }}
                  className="bg-pine-deep text-white px-5 py-2 rounded-full text-xs font-semibold"
                >
                  Browse Sights Folder
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-[11px] font-mono text-outline uppercase tracking-wide">
                  Saved Items checklist ({bookmarks.length}):
                </p>

                <div className="space-y-3">
                  {bookmarks.map((bId) => {
                    const place = LANDMARKS.find((l) => l.id === bId) ||
                                  ORDINANCES.find((o) => o.id === bId) ||
                                  INSTITUTIONS.find((s) => s.id === bId);
                    
                    if (!place) return null;
                    const isChecked = !!checklist[bId];

                    return (
                      <div
                        key={bId}
                        className={`p-3 rounded-xl border flex items-start justify-between transition-all text-left ${
                          isChecked ? 'bg-slate-50 opacity-65 border-outline-variant/40' : 'bg-white border-outline-variant/30 shadow-sm'
                        }`}
                      >
                        <div className="flex items-start space-x-3 flex-1 min-w-0">
                          {/* Toggle Checkbox */}
                          <button
                            type="button"
                            onClick={() => toggleChecklistItem(bId)}
                            className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center transition-colors shrink-0 ${
                              isChecked ? 'bg-pine-deep border-pine-deep text-white' : 'border-outline hover:border-pine-deep bg-white'
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5" />}
                          </button>

                          <div className="min-w-0 flex-1">
                            <h4 className={`text-xs font-headline font-bold leading-tight truncate ${isChecked ? 'line-through text-outline' : 'text-charcoal'}`}>
                              {place.name}
                            </h4>
                            <span className="text-[10px] font-mono text-outline block mt-0.5 uppercase tracking-wider">
                              Category: {('category' in place) ? place.category : 'Heritage'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0">
                          <button
                            onClick={() => {
                              const placeType = LANDMARKS.findIndex(l => l.id === bId) !== -1 ? 'landmark' : ORDINANCES.findIndex(o => o.id === bId) !== -1 ? 'ordinance' : 'institution';
                              openDetailCard(bId, placeType);
                            }}
                            className="p-1 text-slate-400 hover:text-pine-deep transition-colors"
                            title="Inspect Details"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleToggleBookmark(bId)}
                            className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Action folder footer */}
          <div className="p-6 bg-slate-50 border-t border-outline-variant/20 space-y-3">
            <div className="text-xs font-sans text-outline leading-tight">
              Enjoying this planner? Print the checklist or proceed to lodging booking to confirm accommodation dates.
            </div>
            
            {bookmarks.length > 0 && (
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => alert(`Your travel checklist containing ${bookmarks.length} places has been prepared for printing!`)}
                  className="flex-1 bg-white border border-outline-variant hover:border-black text-xs font-bold font-headline py-2.5 rounded-lg text-charcoal shadow-sm transition-all focus:outline-none"
                >
                  Download Print PDF
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBookmarksOpen(false);
                    setBookingOpen(true);
                  }}
                  className="flex-1 bg-pine-deep hover:bg-pine-light text-white text-xs font-bold font-headline py-2.5 rounded-lg shadow-sm transition-all focus:outline-none uppercase tracking-wider"
                >
                  Book Log Cabin Room
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. BOOKING PORTAL MODAL */}
      <BookingPortal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />

      {/* 5. ITEM RICH DETAIL MODAL */}
      {detailModal && (
        <DetailModal
          id={detailModal.id}
          type={detailModal.type}
          data={detailModal.data}
          onClose={() => setDetailModal(null)}
          onToggleBookmark={() => handleToggleBookmark(detailModal.id)}
          isBookmarked={isBookmarked(detailModal.id)}
        />
      )}

      {/* 6. GENERAL SCREEN FOOTER */}
      <Footer
        setTab={setTab}
        onOpenBooking={() => setBookingOpen(true)}
      />

    </div>
  );
}
