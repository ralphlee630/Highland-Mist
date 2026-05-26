/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Calendar, Users, Hotel, CheckCircle, Calculator, Ticket, Flame, Landmark } from 'lucide-react';

interface BookingPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ROOM_OPTIONS = [
  {
    id: 'pine-homestay',
    name: 'Cozy Pine Homestay',
    price: 3200,
    description: 'Rustic timber interiors surrounded by tall pines. Ideal for young backpackers.',
    icon: Hotel
  },
  {
    id: 'heritage-lodge',
    name: 'Heritage Mansion Lodge',
    price: 5800,
    description: 'Spacious Spanish colonial design styled to match the historic Mansion residence.',
    icon: Landmark
  },
  {
    id: 'luxury-overlook',
    name: 'Misty Peak Lookout Cabin',
    price: 8500,
    description: 'Premium glass-walled luxury with private stone fireplace overlooking the valley.',
    icon: Flame
  }
];

export default function BookingPortal({ isOpen, onClose }: BookingPortalProps) {
  const [roomType, setRoomType] = useState('pine-homestay');
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const currentRoom = ROOM_OPTIONS.find((r) => r.id === roomType) || ROOM_OPTIONS[0];
  const subtotal = currentRoom.price * nights;
  const ecoTax = 150; // City Environmental Stewardship Tax
  const serviceCharge = Math.round(subtotal * 0.08);
  const totalCost = subtotal + ecoTax + serviceCharge;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    // Generate reference number
    const randNum = Math.floor(100000 + Math.random() * 900000);
    setBookingRef(`HM-${randNum}`);
    setConfirmed(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-xl border border-outline-variant/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col relative animate-scale-up">
        
        {/* Header toolbar */}
        <div className="flex justify-between items-center px-6 py-4 bg-mist-white border-b border-outline-variant/30 rounded-t-2xl">
          <div>
            <h2 className="font-headline font-bold text-lg text-charcoal flex items-center">
              <Ticket className="w-5 h-5 text-pine-deep mr-2" />
              Highland Mist Retreat booking
            </h2>
            <p className="text-[11px] font-mono text-outline uppercase tracking-wider">
              Escape to the summer capital
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-outline hover:text-charcoal hover:bg-outline-variant/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmed ? (
          /* CONFIRMED STATE RECEIPT */
          <div className="p-8 text-center flex-1 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-pine-accent/30 rounded-full flex items-center justify-center mb-6 border-2 border-pine-deep">
              <CheckCircle className="w-8 h-8 text-pine-deep animate-success" />
            </div>
            
            <h3 className="font-headline font-bold text-2xl text-charcoal mb-2">
              Retreat Booking Confirmed!
            </h3>
            
            <p className="font-sans text-sm text-outline max-w-md mx-auto mb-6">
              Congratulations <span className="font-semibold text-charcoal">{name}</span>! Your voucher was generated successfully and sent to <span className="font-semibold text-charcoal">{email}</span>. Show this invoice on arrival.
            </p>

            {/* VOUCHER DESIGN */}
            <div className="w-full bg-mist-white rounded-xl border border-dashed border-outline/50 p-6 max-w-md mx-auto text-left font-mono text-xs text-charcoal/85 relative overflow-hidden mb-8">
              <div className="absolute top-0 right-0 p-2 bg-pine-deep text-mist-white font-bold tracking-widest text-[9px]">
                OFFICIAL INVOICE
              </div>
              <p className="font-headline font-bold text-sm text-pine-deep mb-2">HIGHLAND MIST ESCAPE</p>
              <div className="border-b border-outline-variant/30 pb-2 mb-3">
                <span className="block text-[10px] text-outline text-left">Voucher ID Reference:</span>
                <span className="block text-sm text-charcoal font-bold tracking-wider">{bookingRef}</span>
              </div>

              <div className="space-y-1.5 mb-4">
                <div className="flex justify-between">
                  <span className="text-outline">Room/Lodge:</span>
                  <span className="font-bold">{currentRoom.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">Guest Capacity:</span>
                  <span className="font-semibold">{guests} Person(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">Nights Stayed:</span>
                  <span className="font-semibold">{nights} Nights</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">Status:</span>
                  <span className="text-green-700 font-bold uppercase">Paid / Vouchered</span>
                </div>
              </div>

              <div className="border-t border-outline-variant/50 pt-2 flex justify-between font-bold text-sm text-charcoal">
                <span>Total pricing:</span>
                <span className="text-pine-deep text-base">₱{totalCost.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleReset}
                className="bg-pine-deep text-mist-white hover:bg-pine-light px-6 py-2.5 rounded-full text-xs font-headline font-bold tracking-wider uppercase transition-all shadow-md transform hover:-translate-y-0.5"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* FORM SUBMISSION STATE */
          <form onSubmit={handleSubmit} className="p-6 flex-grow space-y-6">
            
            {/* 1. ROOM CATEGORY PICKER */}
            <div className="space-y-3">
              <label className="font-headline font-semibold text-sm text-charcoal block">
                Select Your Mountain Lodging Theme
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {ROOM_OPTIONS.map((room) => {
                  const SelectedIcon = room.icon;
                  const isSelected = roomType === room.id;
                  return (
                    <button
                      key={room.id}
                      type="button"
                      onClick={() => setRoomType(room.id)}
                      className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between h-[150px] relative hover:shadow-md ${
                        isSelected
                          ? 'border-pine-deep bg-pine-deep/5 ring-1 ring-pine-deep'
                          : 'border-outline-variant bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-pine-deep text-white' : 'bg-sky-tint text-slate-700'}`}>
                          <SelectedIcon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-mono font-bold text-pine-deep font-sans">
                          ₱{room.price}/nt
                        </span>
                      </div>
                      
                      <div className="mt-2">
                        <p className="font-headline font-bold text-xs text-charcoal leading-none mb-1">
                          {room.name}
                        </p>
                        <p className="text-[10px] text-outline leading-tight">
                          {room.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. DATES AND DURATION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-sans text-xs font-bold text-outline uppercase tracking-wider flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1" />
                  Nights Count
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={nights}
                  onChange={(e) => setNights(Number(e.target.value))}
                  className="w-full bg-mist-white border border-outline-variant/50 rounded-lg py-2 px-3 text-sm focus:border-pine-deep focus:ring-1 focus:ring-pine-deep font-mono"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-sans text-xs font-bold text-outline uppercase tracking-wider flex items-center">
                  <Users className="w-3.5 h-3.5 mr-1" />
                  Guests Counts
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-mist-white border border-outline-variant/50 rounded-lg py-2 px-3 text-sm focus:border-pine-deep focus:ring-1 focus:ring-pine-deep font-mono"
                  required
                />
              </div>
            </div>

            {/* 3. PROFILE DETAILS */}
            <div className="space-y-3 pt-2">
              <label className="font-headline font-semibold text-sm text-charcoal block">
                Primary Contact Information
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-outline block">FULL EXPLORER NAME</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ralph Lee"
                    className="w-full bg-white border-0 border-b-2 border-outline-variant focus:border-pine-deep focus:ring-0 text-sm font-sans py-1.5 outline-none transition-colors"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-outline block">EMAIL ADDRESS</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full bg-white border-0 border-b-2 border-outline-variant focus:border-pine-deep focus:ring-0 text-sm font-sans py-1.5 outline-none transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            {/* 4. REALTIME PRICING BREAKDOWN CARD */}
            <div className="bg-sky-tint/30 rounded-xl p-4 border border-sky-tint/50 space-y-2 text-xs font-sans text-charcoal">
              <div className="flex items-center text-sm font-headline font-semibold text-sky-blue mb-1">
                <Calculator className="w-4 h-4 mr-1.5 text-sky-blue" />
                Live Pricing Calculations
              </div>
              <div className="flex justify-between text-outline">
                <span>{currentRoom.name} ({nights} nights stay):</span>
                <span>₱{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-outline">
                <span>Baguio Environmental Protection Fee Tax:</span>
                <span>₱{ecoTax}</span>
              </div>
              <div className="flex justify-between text-outline">
                <span>Tourism Service Surcharge fee (8%):</span>
                <span>₱{serviceCharge.toLocaleString()}</span>
              </div>
              <div className="border-t border-outline-variant/40 pt-2 flex justify-between font-bold text-sm text-charcoal">
                <span>Estimated total investment:</span>
                <span className="text-pine-deep text-base">₱{totalCost.toLocaleString()}</span>
              </div>
            </div>

            {/* Submit button toolbar */}
            <div className="flex justify-end pt-2 border-t border-outline-variant/30">
              <button
                type="button"
                onClick={onClose}
                className="bg-transparent hover:bg-slate-100 text-outline px-5 py-2.5 rounded-full text-xs font-headline font-medium tracking-wider uppercase transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-pine-deep hover:bg-pine-light text-mist-white px-8 py-2.5 rounded-full text-xs font-headline font-bold tracking-wider uppercase transition-all shadow-md ml-3 transform hover:-translate-y-0.5"
              >
                Generate Voucher Invoice
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
