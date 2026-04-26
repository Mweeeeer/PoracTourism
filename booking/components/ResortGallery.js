"use client";

import Image from "next/image";
import { Maximize } from "lucide-react";

const ResortGallery = ({ images }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[400px] md:h-[600px] rounded-3xl overflow-hidden mb-12">
      {/* Main Image */}
      <div className="md:col-span-2 md:row-span-2 relative group cursor-pointer">
        <Image
          src={images[0]}
          alt="Main Resort View"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
      </div>

      {/* Secondary Images */}
      <div className="relative group cursor-pointer hidden md:block">
        <Image
          src={images[1] || images[0]}
          alt="Resort Detail"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
      </div>

      <div className="relative group cursor-pointer hidden md:block">
        <Image
          src={images[2] || images[0]}
          alt="Resort Detail"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
      </div>

      <div className="md:col-span-2 relative group cursor-pointer hidden md:block">
        <Image
          src={images[0]}
          alt="Resort Panoramic"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        
        <button className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md text-text-primary px-4 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg group-hover:scale-105 transition-transform">
          <Maximize size={18} />
          Show all photos
        </button>
      </div>
    </div>
  );
};

export default ResortGallery;
