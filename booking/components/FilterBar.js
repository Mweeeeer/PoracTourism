"use client";

import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { resorts } from "@/data/resorts";

const FilterBar = () => {
  const filters = ["Price Range", "Guests", "Amenities", "Property Type"];

  return (
    <div className="bg-white border-b border-slate-200 sticky top-[72px] z-30 py-4">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex items-center gap-4 overflow-x-auto no-scrollbar">
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 font-bold text-sm text-text-primary hover:bg-slate-50 shrink-0">
          <SlidersHorizontal size={18} className="text-primary" />
          <span>All Filters</span>
        </button>

        <div className="h-6 w-px bg-slate-200 shrink-0 mx-2" />

        {filters.map((filter) => (
          <button 
            key={filter}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 font-medium text-sm text-text-secondary hover:border-primary hover:text-primary transition-all shrink-0"
          >
            <span>{filter}</span>
            <ChevronDown size={14} />
          </button>
        ))}

        <div className="ml-auto hidden md:flex items-center gap-2 text-sm">
          <span className="text-text-secondary">Showing {resorts.length} results in</span>
          <span className="font-bold text-text-primary">Porac, Pampanga</span>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
