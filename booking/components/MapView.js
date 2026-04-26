"use client";

import { useState, useEffect, useRef } from "react";
import { resorts } from "@/data/resorts";
import { MapPin, Star, X, ChevronLeft, Search, List, Filter, Navigation } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

const MapView = ({ onBack }) => {
  const [selectedResort, setSelectedResort] = useState(resorts[0]);
  const [showList, setShowList] = useState(false);
  const scrollRef = useRef(null);

  // Sync scroll position when selection changes on mobile
  useEffect(() => {
    if (scrollRef.current && selectedResort) {
      const element = document.getElementById(`map-card-${selectedResort.id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [selectedResort]);

  // Construct Google Maps Embed URL
  const getMapUrl = (resort) => {
    const query = encodeURIComponent(`${resort.name}, Porac, Pampanga`);
    // Using the search query 'q=' with the resort name and coordinates
    return `https://www.google.com/maps?q=${query}&z=15&output=embed`;
  };

  const openDirections = (resort) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${resort.coordinates.lat},${resort.coordinates.lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="relative h-screen w-full bg-slate-100 flex flex-col lg:flex-row overflow-hidden">
      
      {/* Mobile Top Header (App Style) */}
      <div className="absolute top-0 left-0 right-0 z-50 p-4 flex items-center gap-3 lg:hidden">
        <button 
          onClick={onBack}
          className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex-grow bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white flex items-center gap-3">
          <Search size={18} className="text-text-secondary" />
          <span className="text-sm font-bold text-text-primary">Porac, Pampanga</span>
        </div>
        <button className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white">
          <Filter size={20} />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col w-[400px] h-full bg-white border-r border-slate-200 z-30 shadow-2xl">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors">
            <ChevronLeft size={20} />
            <span className="font-bold">Back to Grid</span>
          </button>
          <div className="bg-slate-100 p-2 rounded-xl text-text-secondary">
            <List size={20} />
          </div>
        </div>

        <div className="flex-grow overflow-y-auto no-scrollbar p-6">
          <h2 className="text-2xl font-black mb-6">Porac Stays</h2>
          <div className="space-y-4">
            {resorts.map((resort) => (
              <div 
                key={resort.id}
                onClick={() => setSelectedResort(resort)}
                className={`flex gap-4 p-4 rounded-3xl border transition-all cursor-pointer group ${
                  selectedResort?.id === resort.id 
                    ? "border-primary bg-primary/5 ring-1 ring-primary" 
                    : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                  <Image 
                    src={resort.images[0]} 
                    alt={resort.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-text-primary text-sm">{resort.name}</h3>
                    <div className="flex items-center gap-1 text-[10px] text-text-secondary mt-0.5">
                      <MapPin size={10} />
                      <span>{resort.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-primary text-sm">{formatPrice(resort.price)}</span>
                      <div className="flex items-center gap-0.5">
                        <Star size={10} className="text-amber-500 fill-amber-500" />
                        <span className="text-[10px] font-bold">{resort.rating}</span>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        openDirections(resort);
                      }}
                      className="p-2 bg-slate-100 hover:bg-primary hover:text-white rounded-lg transition-all text-text-secondary"
                      title="Get Directions"
                    >
                      <Navigation size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Map Content */}
      <div className="flex-grow relative h-full w-full bg-slate-200">
        <iframe
          src={getMapUrl(selectedResort)}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale-[0.2] contrast-[1.1]"
        ></iframe>

        {/* Mobile Carousel Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-40 lg:hidden pb-8">
          <div 
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto px-4 py-4 no-scrollbar snap-x snap-mandatory"
          >
            {resorts.map((resort) => (
              <div 
                id={`map-card-${resort.id}`}
                key={resort.id}
                onClick={() => setSelectedResort(resort)}
                className={`snap-center shrink-0 w-[85vw] max-w-[320px] bg-white rounded-3xl overflow-hidden shadow-2xl border-2 transition-all ${
                  selectedResort?.id === resort.id ? "border-primary scale-100" : "border-transparent scale-[0.98] opacity-90"
                }`}
              >
                <div className="relative h-32 w-full">
                  <Image 
                    src={resort.images[0]} 
                    alt={resort.name} 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-black shadow-sm">
                    {formatPrice(resort.price)}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-black text-text-primary text-sm">{resort.name}</h3>
                    <div className="flex items-center gap-0.5">
                      <Star size={12} className="text-amber-500 fill-amber-500" />
                      <span className="text-xs font-bold">{resort.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-text-secondary mb-3">
                    <MapPin size={10} className="text-primary" />
                    <span>{resort.location}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link 
                      href={`/resorts/${resort.id}`}
                      className="flex-grow bg-slate-900 text-white text-center py-2.5 rounded-xl text-xs font-bold"
                    >
                      View Resort
                    </Link>
                    <button 
                      onClick={() => openDirections(resort)}
                      className="w-12 bg-primary text-white flex items-center justify-center rounded-xl"
                    >
                      <Navigation size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
