"use client";

import { useState } from "react";
import { X, CircleCheck, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/lib/utils";

const BookingModal = ({ isOpen, onClose, resort }) => {
  const [step, setStep] = useState("form"); // form, loading, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep("loading");
    setTimeout(() => {
      setStep("success");
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors z-10"
          >
            <X size={20} />
          </button>

          {step === "form" && (
            <div className="p-8">
              <h2 className="text-2xl font-black mb-2">Book your stay</h2>
              <p className="text-text-secondary mb-8">Confirm your details to reserve {resort.name}.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-slate-400">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-slate-400">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="+63 9xx xxx xxxx"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-slate-400">Email Address</label>
                  <input 
                    required
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mt-6">
                  <div className="flex justify-between items-center text-sm font-bold text-text-primary">
                    <span>Final Amount</span>
                    <span>{formatPrice(resort.price * 2 + 500)}</span>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-primary/20 transition-all active:scale-[0.98] mt-4"
                >
                  Confirm Reservation
                </button>
              </form>
            </div>
          )}

          {step === "loading" && (
            <div className="p-20 flex flex-col items-center justify-center text-center">
              <Loader2 size={48} className="text-primary animate-spin mb-6" />
              <h2 className="text-2xl font-black mb-2">Processing...</h2>
              <p className="text-text-secondary">Securing your dates at {resort.name}</p>
            </div>
          )}

          {step === "success" && (
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                <CircleCheck size={40} />
              </div>
              <h2 className="text-3xl font-black mb-4">Booking Successful!</h2>
              <p className="text-text-secondary mb-8">
                Your reservation at {resort.name} is confirmed. A confirmation email has been sent to your inbox.
              </p>
              <button 
                onClick={onClose}
                className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingModal;
