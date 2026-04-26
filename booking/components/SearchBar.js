"use client";

import { useState } from "react";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const SearchBar = ({ className }) => {
  const [location, setLocation] = useState("Porac, Pampanga");

  return (
    <div className={cn(
      "w-full max-w-5xl bg-white rounded-2xl md:rounded-full shadow-xl p-2 md:p-3 flex flex-col md:flex-row items-stretch md:items-center gap-2",
      className
    )}>
      {/* Location */}
      <div className="flex-1 px-4 py-2 border-b md:border-b-0 md:border-r border-slate-100 flex items-center gap-3">
        <MapPin className="text-primary shrink-0" size={20} />
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Location</span>
          <input 
            type="text" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)}
            className="bg-transparent border-none p-0 focus:ring-0 font-semibold text-text-primary placeholder:text-slate-300 w-full"
            placeholder="Where are you going?"
          />
        </div>
      </div>

      {/* Date */}
      <div className="flex-1 px-4 py-2 border-b md:border-b-0 md:border-r border-slate-100 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors rounded-xl md:rounded-none">
        <Calendar className="text-primary shrink-0" size={20} />
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Check In - Out</span>
          <span className="font-semibold text-text-primary">Apr 28 - May 2</span>
        </div>
      </div>

      {/* Guests */}
      <div className="flex-1 px-4 py-2 border-b md:border-b-0 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors rounded-xl md:rounded-none">
        <Users className="text-primary shrink-0" size={20} />
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Guests</span>
          <span className="font-semibold text-text-primary">4 Guests</span>
        </div>
      </div>

      {/* CTA */}
      <button className="bg-primary hover:bg-primary-dark text-white px-8 py-4 md:py-3.5 rounded-xl md:rounded-full font-bold flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-primary/30 group active:scale-95">
        <Search size={20} className="group-hover:scale-110 transition-transform" />
        <span>Search Resorts</span>
      </button>
    </div>
  );
};

export default SearchBar;
