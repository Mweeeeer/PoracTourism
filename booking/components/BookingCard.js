"use client";

import { useState } from "react";
import { Star, ShieldCheck, Info } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import BookingModal from "./BookingModal";

const BookingCard = ({ resort }) => {
  const [showModal, setShowModal] = useState(false);
  const nights = 2;
  const serviceFee = 500;
  const total = (resort.price * nights) + serviceFee;

  return (
    <>
      <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200 border border-slate-100 sticky top-32">
        <div className="flex justify-between items-start mb-8">
          <div>
            <span className="text-3xl font-black text-text-primary">{formatPrice(resort.price)}</span>
            <span className="text-text-secondary font-medium"> / night</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            <Star size={16} className="text-amber-500 fill-amber-500" />
            <span className="font-bold text-sm">{resort.rating}</span>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="grid grid-cols-2 rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-r border-slate-200 bg-slate-50/50">
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Check In</label>
              <span className="font-semibold text-sm">Apr 28, 2024</span>
            </div>
            <div className="p-4 bg-slate-50/50">
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Check Out</label>
              <span className="font-semibold text-sm">Apr 30, 2024</span>
            </div>
            <div className="col-span-2 p-4 border-t border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer">
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Guests</label>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-sm">4 Guests</span>
                <Info size={14} className="text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setShowModal(true)}
          className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-primary/20 transition-all active:scale-[0.98] mb-6"
        >
          Reserve Now
        </button>

        <p className="text-center text-text-secondary text-sm mb-8">You won't be charged yet</p>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between text-text-secondary">
            <span>{formatPrice(resort.price)} x {nights} nights</span>
            <span>{formatPrice(resort.price * nights)}</span>
          </div>
          <div className="flex justify-between text-text-secondary">
            <span>Service fee</span>
            <span>{formatPrice(serviceFee)}</span>
          </div>
          <div className="pt-4 border-t border-slate-100 flex justify-between">
            <span className="text-lg font-bold text-text-primary">Total</span>
            <span className="text-xl font-black text-text-primary">{formatPrice(total)}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-700">
          <ShieldCheck size={20} className="shrink-0" />
          <span className="text-xs font-semibold leading-tight">Price Match Guarantee: We offer the best price for this resort.</span>
        </div>
      </div>

      <BookingModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        resort={resort}
      />
    </>
  );
};

export default BookingCard;
