/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Calendar, Compass, MapPin, Sparkles, AlertCircle, Clock, BookOpen, Heart } from 'lucide-react';
import { LANDMARKS } from '../data.ts';

interface ItineraryEngineProps {
  onToggleBookmark: (landmarkId: string) => void;
  isBookmarked: (landmarkId: string) => boolean;
  onOpenDetails: (landmarkId: string) => void;
}

export default function ItineraryEngine({ onToggleBookmark, isBookmarked, onOpenDetails }: ItineraryEngineProps) {
  const [days, setDays] = useState(2);
  const [season, setSeason] = useState('cold'); // cold, summer, misty
  const [focus, setFocus] = useState('balanced'); // nature, culture, balanced
  const [generatedPlan, setGeneratedPlan] = useState<any[] | null>(null);

  const handleGenerate = () => {
    // Generate a day-by-day planner based on inputs
    const plan = [];

    // Day 1
    const day1Slots = [
      {
        time: '05:45 AM - 08:30 AM',
        activity: 'Sunrise Gazing at Mines View Park',
        description: 'Breathe in the morning fog, capture the epic light breaking through Benguet mines, and enjoy local Strawberry Taho.',
        tip: 'Dress in your thickest jacket, the wind chill triggers around 11°C here.',
        id: 'mines-view'
      },
      {
        time: '10:00 AM - 12:30 PM',
        activity: 'Leisurely Rowboat ride at Burnham Park',
        description: 'Explore the central man-made swan lake and stroll through the rose gardens under weeping willows.',
        tip: 'Renting a Swan boat costs approx ₱150, but it is highly relaxing.',
        id: 'burnham-park'
      }
    ];

    if (focus === 'nature' || focus === 'balanced') {
      day1Slots.push({
        time: '02:00 PM - 05:00 PM',
        activity: 'Yellow Trail Hiking at Camp John Hay',
        description: 'Walk through acres of preserved high-canopy pine forests. Bask in genuine pine aromatherapy.',
        tip: 'Grab local Hot Chocolate de Batirol right after finishing the hike.',
        id: 'camp-john-hay'
      });
    } else {
      day1Slots.push({
        time: '02:00 PM - 05:00 PM',
        activity: 'Traditional Weaving Demonstration',
        description: 'Observe native Ifugao and Benguet artisans working with manual heavy timber backstrap looms.',
        tip: 'Purchase woven scarves or rugs directly from details to help regional weavers.',
        id: 'mines-view' // maps to similar
      });
    }

    plan.push({
      day: 1,
      theme: focus === 'nature' ? 'High Altitude Ridges & Parks' : 'Central Heritage & Local Crafts',
      slots: day1Slots
    });

    // Day 2
    if (days >= 2) {
      const day2Slots = [
        {
          time: '08:30 AM - 11:30 AM',
          activity: 'Presidential Gates at The Mansion & Wright Park',
          description: 'Snap photographs in front of the Buckinham-style iron palace gates and stroll down the pine pool path.',
          tip: 'Walk right down to the horse trails if you wish to try horse riding.',
          id: 'the-mansion'
        }
      ];

      if (season === 'misty') {
        day2Slots.push({
          time: '01:30 PM - 04:30 PM',
          activity: 'Historic Teachers Camp Heritage walk',
          description: 'Explore the American Thomasite heritage compound, its wooden panels shrouded in deep mid-day mist.',
          tip: 'Amazing place for moody overcast photography.',
          id: 'camp-john-hay'
        });
      } else {
        day2Slots.push({
          time: '01:30 PM - 04:30 PM',
          activity: 'Strawberry Harvesting at La Trinidad Farm',
          description: 'Walk right inside Bengali plots and harvest sweet strawberries completely fresh from the bushes.',
          tip: 'Picking yourself costs premium per kilo, but it is worth the experience.',
          id: 'strawberry-farm'
        });
      }

      plan.push({
        day: 2,
        theme: season === 'misty' ? 'Thomasite Heritage & Forest Mists' : 'Agri-Tourism & Presidential Escapes',
        slots: day2Slots
      });
    }

    // Day 3
    if (days >= 3) {
      plan.push({
        day: 3,
        theme: 'Higher Education & Artisan Masterpieces',
        slots: [
          {
            time: '09:00 AM - 12:00 PM',
            activity: 'Museo Kordilyera Tour at UP Baguio',
            description: 'Inspect the first dedicated ethnographic institution displaying genuine artifacts and mountain relics.',
            tip: 'The exhibitions are closed on Mondays, plan accordingly.',
            id: 'slu' // map to slu or educ
          },
          {
            time: '02:00 PM - 05:00 PM',
            activity: 'Asin Road Woodcarving & Filigree Shops',
            description: 'Visit local family workshops carefully engineering fine silver filigree wires and mahogany wood guardians.',
            tip: 'A grand souvenir stop to support master local artisans.',
            id: 'mines-view'
          }
        ]
      });
    }

    setGeneratedPlan(plan);
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border border-outline-variant/30 ambient-shadow font-sans">
      <div className="flex items-center space-x-2 text-pine-deep mb-3">
        <Sparkles className="w-5 h-5 text-pine-deep animate-spin" />
        <h3 className="font-headline font-semibold text-lg text-charcoal">
          Dynamic Baguio Escape Designer
        </h3>
      </div>
      <p className="text-xs text-outline leading-relaxed mb-6">
        No generic guides here. Input your custom trip preferences below, and we will plan a beautiful, day-by-day itinerary complete with coordinate tips, recommended clothing weather packs, and landmark links!
      </p>

      {/* Inputs controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        
        {/* Days Count */}
        <div className="space-y-1">
          <label className="text-[10px] font-mono text-outline block uppercase tracking-wider font-bold">
            How Many Days?
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDays(d)}
                className={`flex-1 py-2 text-xs font-headline font-semibold rounded-lg border transition-all ${
                  days === d
                    ? 'border-pine-deep bg-pine-deep/5 text-pine-deep font-bold'
                    : 'border-outline-variant hover:bg-slate-50 text-outline'
                }`}
              >
                {d} {d === 1 ? 'Day' : 'Days'}
              </button>
            ))}
          </div>
        </div>

        {/* Weather Vibe Selector */}
        <div className="space-y-1">
          <label className="text-[10px] font-mono text-outline block uppercase tracking-wider font-bold">
            Select Weather Vibe
          </label>
          <select
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="w-full bg-mist-white border border-outline-variant/50 rounded-lg py-1.5 px-3 text-xs focus:border-pine-deep focus:ring-0 text-charcoal outline-none font-sans font-medium"
          >
            <option value="cold">Dec-Feb (Breathtaking Chills & Taho)</option>
            <option value="summer">Mar-May (Clear Blue Skies & Sun)</option>
            <option value="misty">Jun-Nov (Moody Fog & Fireplaces)</option>
          </select>
        </div>

        {/* Pace Pace Focus */}
        <div className="space-y-1">
          <label className="text-[10px] font-mono text-outline block uppercase tracking-wider font-bold">
            Primary Travel Focus
          </label>
          <select
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
            className="w-full bg-mist-white border border-outline-variant/50 rounded-lg py-1.5 px-3 text-xs focus:border-pine-deep focus:ring-0 text-charcoal outline-none font-sans font-medium"
          >
            <option value="balanced">Balanced Sightseeing (All)</option>
            <option value="nature">High Altitude Nature & Hikes</option>
            <option value="culture">Roots, Museums, & Handcrafts</option>
          </select>
        </div>

      </div>

      {/* Design Trigger */}
      <button
        onClick={handleGenerate}
        className="w-full bg-pine-deep hover:bg-pine-light text-mist-white py-3 rounded-xl text-xs font-headline font-bold tracking-wider uppercase transition-all shadow-md transform hover:-translate-y-0.5"
      >
        Compile Custom Travel Plan
      </button>

      {/* Generated Plan Output Display */}
      {generatedPlan && (
        <div className="mt-8 pt-8 border-t border-outline-variant/40 space-y-8 animate-fade-in">
          
          <div className="bg-sky-tint/20 rounded-xl p-4 border border-sky-tint/60 flex items-start space-x-3 text-xs">
            <AlertCircle className="w-5 h-5 text-sky-blue shrink-0 mt-0.5" />
            <div>
              <p className="font-headline font-bold text-sky-blue">Recommended Pack & Weather Advice:</p>
              <p className="text-outline leading-relaxed mt-1">
                {season === 'cold' && 'Expect deep morning chills (10-14°C). Pack thermal hoodies, thick scarves, and comfortable trainers. Sunrise decks are extremely busy on weekends.'}
                {season === 'summer' && 'Dry, sunny weather (19-24°C). Bring comfortable hats, UV protection glasses, and water canisters. Ideal for picking fresh strawberries at La Trinidad.'}
                {season === 'misty' && 'Dramatic fog layers drop by 2:00 PM. Carry dynamic rain coats or micro umbrellas, shoes with high rubber tread grip, and plan for cozy coffee spots.'}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {generatedPlan.map((p) => (
              <div key={p.day} className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center justify-center bg-pine-deep text-mist-white font-headline font-bold text-xs w-6 h-6 rounded-full">
                    {p.day}
                  </span>
                  <div>
                    <h4 className="font-headline font-bold text-sm text-charcoal">
                      Day {p.day}: {p.theme}
                    </h4>
                    <span className="text-[10px] text-outline font-mono uppercase tracking-widest block -mt-1">
                      Designed Route Activity
                    </span>
                  </div>
                </div>

                {/* Day Slots */}
                <div className="border-l-2 border-outline-variant ml-3 pl-6 space-y-6">
                  {p.slots.map((s: any, idx: number) => {
                    const lData = LANDMARKS.find((l) => l.id === s.id);
                    return (
                      <div key={idx} className="relative space-y-1">
                        {/* Dot indicator */}
                        <div className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-full bg-pine-light ring-4 ring-white" />
                        
                        <div className="flex items-center space-x-2 text-[10px] font-mono text-outline">
                          <Clock className="w-3 h-3 text-pine-light" />
                          <span>{s.time}</span>
                        </div>
                        
                        <h5 className="font-headline font-bold text-xs text-charcoal">
                          {s.activity}
                        </h5>
                        
                        <p className="text-xs text-outline leading-relaxed">
                          {s.description}
                        </p>

                        <div className="bg-slate-50 rounded-lg p-2.5 border border-outline-variant/30 text-[11px] text-outline italic">
                          <span className="font-semibold text-charcoal not-italic mr-1">Traveler Tip:</span> 
                          {s.tip}
                        </div>

                        {lData && (
                          <div className="flex items-center space-x-4 pt-1">
                            <button
                              onClick={() => onOpenDetails(s.id)}
                              className="inline-flex items-center font-mono text-[10px] text-pine-deep hover:underline focus:outline-none"
                            >
                              <BookOpen className="w-3 h-3 mr-1" />
                              View Entry Details
                            </button>
                            <button
                              onClick={() => onToggleBookmark(s.id)}
                              className="inline-flex items-center font-mono text-[10px] hover:text-red-500 text-outline focus:outline-none transition-colors"
                            >
                              <Heart className={`w-3 h-3 mr-1 ${isBookmarked(s.id) ? 'fill-red-500 text-red-500' : ''}`} />
                              {isBookmarked(s.id) ? 'Saved' : 'Save Slot'}
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2 font-mono text-[10px] text-outline">
            &mdash; High-Altitude custom travel plan ready. Enjoy your journey! &mdash;
          </div>

        </div>
      )}

    </div>
  );
}
