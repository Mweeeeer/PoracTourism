"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilterBar from "@/components/FilterBar";
import ResortGrid from "@/components/ResortGrid";
import MapView from "@/components/MapView";
import { resorts } from "@/data/resorts";
import { MapPin, LayoutGrid, Map as MapIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResortListing() {
  const [view, setView] = useState("grid"); // 'grid' or 'map'

  return (
    <main className={`min-h-screen ${view === "map" ? "h-screen overflow-hidden" : "pt-20"} flex flex-col`}>
      {view === "grid" && <Navbar />}
      
      <AnimatePresence mode="wait">
        {view === "grid" ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="flex-grow flex flex-col"
          >
            {/* Header */}
            <div className="bg-white border-b border-slate-100 pt-12 pb-8">
              <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
                <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest mb-4">
                  <MapPin size={16} />
                  <span>Porac, Pampanga</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black mb-4">Explore All Private Resorts</h1>
                <p className="text-text-secondary text-lg max-w-2xl">
                  Discover {resorts.length} exclusive stays in Porac. From modern glass houses to rustic nature retreats.
                </p>
              </div>
            </div>

            {/* Filters */}
            <FilterBar />

            {/* Grid */}
            <div className="bg-slate-50 min-h-[600px] flex-grow">
              <ResortGrid resorts={resorts} />
            </div>

            <Footer />
          </motion.div>
        ) : (
          <motion.div 
            key="map"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-grow flex flex-col h-screen"
          >
            <MapView onBack={() => setView("grid")} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button - Only show in Grid view */}
      {view === "grid" && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
          <button 
            onClick={() => setView("map")}
            className="bg-slate-900 text-white px-6 py-3.5 rounded-full font-bold shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
          >
            <MapIcon size={18} />
            <span>Show Map</span>
          </button>
        </div>
      )}
    </main>
  );
}
