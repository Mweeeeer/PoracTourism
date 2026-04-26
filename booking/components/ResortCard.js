"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Users, Heart } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { motion } from "framer-motion";

const ResortCard = ({ resort }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={resort.images[0]}
          alt={resort.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {resort.featured && (
            <span className="bg-amber-400 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
              Featured
            </span>
          )}
        </div>
        
        <button className="absolute top-4 right-4 p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-rose-500 transition-all active:scale-90">
          <Heart size={20} />
        </button>

        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
          <Star size={16} className="text-amber-500 fill-amber-500" />
          <span className="text-sm font-bold text-text-primary">{resort.rating}</span>
          <span className="text-xs text-text-secondary">({resort.reviews})</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
            {resort.name}
          </h3>
        </div>

        <div className="flex items-center gap-1 text-text-secondary text-sm mb-4">
          <MapPin size={16} className="text-primary" />
          <span>{resort.location}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {resort.amenities.slice(0, 3).map((amenity) => (
            <span key={amenity} className="text-[11px] bg-slate-50 text-text-secondary px-2 py-1 rounded-md border border-slate-100">
              {amenity}
            </span>
          ))}
          {resort.amenities.length > 3 && (
            <span className="text-[11px] text-primary font-medium px-2 py-1">
              +{resort.amenities.length - 3} more
            </span>
          )}
        </div>

        <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-text-primary">{formatPrice(resort.price)}</span>
            <span className="text-sm text-text-secondary font-medium"> / night</span>
          </div>
          <Link
            href={`/resorts/${resort.id}`}
            className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:translate-x-1"
          >
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ResortCard;
