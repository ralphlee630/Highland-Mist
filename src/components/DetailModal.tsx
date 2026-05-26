/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, MapPin, Clock, Bookmark, Heart, Star, School, ShieldAlert, Award } from 'lucide-react';

interface DetailModalProps {
  id: string; // can be id of landmark, ordinance, or institution
  type: 'landmark' | 'ordinance' | 'institution';
  data: any; // complete object
  onClose: () => void;
  onToggleBookmark: () => void;
  isBookmarked: boolean;
}

export default function DetailModal({
  id,
  type,
  data,
  onClose,
  onToggleBookmark,
  isBookmarked
}: DetailModalProps) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-xl border border-outline-variant/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col relative animate-scale-up">
        
        {/* Banner image or graphic header */}
        <div className="relative h-64 w-full bg-slate-100 shrink-0">
          {data.image ? (
            <img
              src={data.image}
              alt={data.name}
              className="w-full h-full object-cover rounded-t-2xl"
            />
          ) : (
            <div className="w-full h-full bg-pine-deep flex flex-col items-center justify-center text-white p-6 text-center rounded-t-2xl">
              <ShieldAlert className="w-12 h-12 text-pine-accent mb-2" />
              <p className="font-headline font-bold text-lg">{data.name}</p>
            </div>
          )}

          {/* Close trigger tool */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-charcoal/70 hover:bg-charcoal text-white p-2 rounded-full transition-colors backdrop-blur-sm shadow-md"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Tag badge */}
          <div className="absolute bottom-4 left-4 inline-flex items-center space-x-1.5 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-mono text-pine-deep uppercase tracking-widest shadow font-bold">
            <span>{type === 'landmark' ? 'Iconic Landmark' : type === 'ordinance' ? 'City Ordinance' : 'Academic Institution'}</span>
          </div>
        </div>

        {/* Modal content body */}
        <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
          
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-headline font-bold text-xl md:text-2xl text-charcoal">
                {data.name}
              </h3>
              {data.locationDetails && (
                <div className="flex items-center text-xs text-outline font-mono mt-1">
                  <MapPin className="w-3.5 h-3.5 text-pine-light mr-1" />
                  <span>{data.locationDetails}</span>
                </div>
              )}
            </div>

            {/* Bookmark button */}
            <button
              onClick={onToggleBookmark}
              className={`p-2.5 rounded-full border transition-all flex items-center justify-center ${
                isBookmarked
                  ? 'border-red-500 bg-red-50 text-red-500 hover:bg-red-100'
                  : 'border-outline-variant bg-white text-outline hover:text-charcoal hover:bg-slate-50'
              }`}
              title={isBookmarked ? 'Remove saved attraction' : 'Bookmark attraction'}
            >
              <Heart className={`w-5 h-5 ${isBookmarked ? 'fill-red-500' : ''}`} />
            </button>
          </div>

          {/* Core metadata line descriptors */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {type === 'landmark' && (
              <>
                <div className="bg-slate-50 rounded-lg p-3 border border-outline-variant/30 text-xs text-outline space-y-1">
                  <span className="block font-mono text-[9px] uppercase tracking-wide">Category</span>
                  <span className="block font-sans font-bold text-charcoal text-xs">{data.category}</span>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-outline-variant/30 text-xs text-outline space-y-1">
                  <span className="block font-mono text-[9px] uppercase tracking-wide">Entrance Fee</span>
                  <span className="block font-sans font-bold text-charcoal text-xs">{data.entranceFee}</span>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-outline-variant/30 text-xs text-outline space-y-1">
                  <span className="block font-mono text-[9px] uppercase tracking-wide">Visiting Hours</span>
                  <span className="block font-sans font-semibold text-charcoal text-[11px] truncate">{data.hours}</span>
                </div>
              </>
            )}

            {type === 'ordinance' && (
              <>
                <div className="bg-red-50 rounded-lg p-3 border border-red-100 text-xs text-outline space-y-1">
                  <span className="block font-mono text-[9px] text-red-600 uppercase tracking-wide">Penalty fine</span>
                  <span className="block font-sans font-bold text-red-700 text-xs">{data.penalty}</span>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-outline-variant/30 text-xs text-outline space-y-1">
                  <span className="block font-mono text-[9px] uppercase tracking-wide">Category</span>
                  <span className="block font-sans font-bold text-charcoal text-xs">{data.category} Vibe</span>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-outline-variant/30 text-xs text-outline space-y-1">
                  <span className="block font-mono text-[9px] uppercase tracking-wide">Scope of Rule</span>
                  <span className="block font-sans font-semibold text-charcoal text-xs">CBD & Parks</span>
                </div>
              </>
            )}

            {type === 'institution' && (
              <>
                <div className="bg-slate-50 rounded-lg p-3 border border-outline-variant/30 text-xs text-outline space-y-1">
                  <span className="block font-mono text-[9px] uppercase tracking-wide">Established</span>
                  <span className="block font-sans font-bold text-charcoal text-xs">A.D. {data.established}</span>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-outline-variant/30 text-xs text-outline space-y-1">
                  <span className="block font-mono text-[9px] uppercase tracking-wide">Student Body Size</span>
                  <span className="block font-sans font-bold text-charcoal text-xs">{data.studentCountText}</span>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-outline-variant/30 text-xs text-outline space-y-1">
                  <span className="block font-mono text-[9px] uppercase tracking-wide">Classification</span>
                  <span className="block font-sans font-bold text-charcoal text-xs">{data.category}</span>
                </div>
              </>
            )}
          </div>

          {/* Description overview */}
          <div className="space-y-2">
            <h4 className="font-headline font-semibold text-sm text-charcoal">
              {type === 'landmark' ? 'Historical Context & Description' : type === 'ordinance' ? 'Scope & Intent of Regulation' : 'About the Institution'}
            </h4>
            <p className="text-xs text-outline leading-relaxed font-sans text-justify">
              {data.details || data.historyText || data.description}
            </p>
          </div>

          {/* Bullet points or key guidelines list */}
          {data.bulletPoints && (
            <div className="space-y-2 bg-slate-50 rounded-xl p-4 border border-outline-variant/30">
              <h4 className="font-headline font-bold text-xs text-charcoal uppercase tracking-wider flex items-center">
                <ShieldAlert className="w-4 h-4 text-pine-deep mr-1.5" />
                Key Legal Provisions:
              </h4>
              <ul className="space-y-2 text-xs text-outline font-sans">
                {data.bulletPoints.map((pt: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-pine-deep font-bold mr-2">•</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key mission lines for schools */}
          {data.keyMissions && (
            <div className="space-y-2 bg-slate-50 rounded-xl p-4 border border-outline-variant/30">
              <h4 className="font-headline font-bold text-xs text-charcoal uppercase tracking-wider flex items-center">
                <Award className="w-4 h-4 text-pine-deep mr-1.5" />
                Strategic Missions & Research focus:
              </h4>
              <ul className="space-y-2 text-xs text-outline font-sans">
                {data.keyMissions.map((pt: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-sky-blue font-bold mr-2">✔</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Custom Traveler Tips Card List for Landmarks */}
          {data.travelerTips && (
            <div className="space-y-3">
              <h4 className="font-headline font-semibold text-sm text-charcoal flex items-center">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-1.5" />
                Coordinates Field Traveler Tips
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.travelerTips.map((tip: string, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 bg-sky-tint/20 rounded-xl border border-sky-tint text-xs text-outline italic leading-snug"
                  >
                    &ldquo;{tip}&rdquo;
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rating visual footer card */}
          {type === 'landmark' && (
            <div className="flex justify-between items-center bg-mist-white rounded-xl p-4 border border-outline-variant/30 text-xs text-outline font-semibold">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-charcoal font-bold text-sm">{data.rating} / 5</span>
                <span>({data.reviewCount.toLocaleString()} user reviews)</span>
              </div>
              <span className="text-pine-deep text-[11px] font-mono tracking-wider uppercase font-bold">
                highly recommended stop
              </span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
