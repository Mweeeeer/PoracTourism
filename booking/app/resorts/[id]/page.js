import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResortGallery from "@/components/ResortGallery";
import BookingCard from "@/components/BookingCard";
import { resorts } from "@/data/resorts";
import { Star, MapPin, Share2, Heart, ShieldCheck, Waves, Wifi, Utensils, Wind, Tv, Flame, Users, Navigation } from "lucide-react";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return resorts.map((resort) => ({
    id: resort.id.toString(),
  }));
}

export default async function ResortDetails({ params }) {
  const { id } = await params;
  const resort = resorts.find((r) => r.id.toString() === id);

  if (!resort) {
    notFound();
  }

  const amenityIcons = {
    "Infinity Pool": <Waves />,
    "Private Pool": <Waves />,
    "Spring Pool": <Waves />,
    "Free WiFi": <Wifi />,
    "High-speed WiFi": <Wifi />,
    "Kitchen": <Utensils />,
    "Full Kitchen": <Utensils />,
    "Air Conditioning": <Wind />,
    "Aircon": <Wind />,
    "Smart TV": <Tv />,
    "Outdoor Grill": <Flame />,
    "BBQ Area": <Flame />,
  };

  return (
    <main className="min-h-screen pt-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-black text-text-primary mb-4">{resort.name}</h1>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-1.5">
                <Star size={18} className="text-amber-500 fill-amber-500" />
                <span className="font-bold">{resort.rating}</span>
                <span className="text-text-secondary">({resort.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1.5 text-text-secondary font-medium underline underline-offset-4 cursor-pointer hover:text-primary transition-colors">
                <MapPin size={18} className="text-primary" />
                <span>{resort.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-sm font-bold hover:bg-slate-100 px-3 py-2 rounded-xl transition-colors">
                <Share2 size={18} />
                <span>Share</span>
              </button>
              <button className="flex items-center gap-2 text-sm font-bold hover:bg-slate-100 px-3 py-2 rounded-xl transition-colors">
                <Heart size={18} />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <ResortGallery images={resort.images} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between pb-8 border-b border-slate-100 mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-1">Private resort hosted by PoracStays</h2>
                <p className="text-text-secondary">15+ guests · 4 bedrooms · 6 beds · 3 baths</p>
              </div>
              <div className="h-14 w-14 rounded-full bg-slate-200 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-400">PS</div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-12">
              <h3 className="text-xl font-bold mb-6">About this space</h3>
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                {resort.description}
              </p>
              <p className="text-text-secondary text-lg leading-relaxed">
                This exclusive property offers the ultimate privacy and relaxation. Whether you're planning a corporate team building, a family reunion, or just a quiet escape from the city, this resort provides everything you need for a comfortable stay.
              </p>
            </div>

            {/* Amenities */}
            <div className="mb-12 py-12 border-t border-slate-100">
              <h3 className="text-xl font-bold mb-8">What this place offers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                {resort.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-4 text-text-primary">
                    <div className="text-slate-400">
                      {amenityIcons[amenity] || <ShieldCheck size={24} />}
                    </div>
                    <span className="text-lg">{amenity}</span>
                  </div>
                ))}
              </div>
              <button className="mt-10 px-8 py-3 border border-slate-900 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                Show all {resort.amenities.length} amenities
              </button>
            </div>

            {/* Interactive Map */}
            <div className="mb-12 py-12 border-t border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-2">Where you'll be</h3>
                  <p className="text-text-secondary">{resort.location}</p>
                </div>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${resort.coordinates.lat},${resort.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/25"
                >
                  <Navigation size={18} />
                  <span>Get Directions</span>
                </a>
              </div>
              
              <div className="bg-slate-200 rounded-[2rem] h-[450px] w-full relative overflow-hidden border-8 border-white shadow-2xl">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(resort.name + ", Porac, Pampanga")}&z=15&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale-[0.2] contrast-[1.1]"
                ></iframe>
              </div>
              <p className="mt-6 text-sm text-text-secondary text-center italic">
                Exact location and check-in instructions provided after booking confirmation.
              </p>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <BookingCard resort={resort} />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
