import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ResortGrid from "@/components/ResortGrid";
import { resorts } from "@/data/resorts";
import { Shield, Clock, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const featuredResorts = resorts.filter(r => r.featured);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Stats/Trust Section */}
      <section className="py-12 bg-white relative z-20 -mt-10 mx-4 md:mx-16 rounded-3xl shadow-xl shadow-slate-200/50 flex flex-wrap justify-around items-center gap-8 border border-slate-100">
        <div className="flex items-center gap-4 px-8">
          <div className="bg-sky-100 p-3 rounded-2xl text-primary">
            <Shield size={24} />
          </div>
          <div>
            <h4 className="font-bold text-text-primary">Secure Booking</h4>
            <p className="text-xs text-text-secondary">Verified Private Resorts</p>
          </div>
        </div>
        <div className="w-px h-12 bg-slate-100 hidden lg:block" />
        <div className="flex items-center gap-4 px-8">
          <div className="bg-teal-100 p-3 rounded-2xl text-secondary">
            <Clock size={24} />
          </div>
          <div>
            <h4 className="font-bold text-text-primary">24/7 Support</h4>
            <p className="text-xs text-text-secondary">Dedicated Assistance</p>
          </div>
        </div>
        <div className="w-px h-12 bg-slate-100 hidden lg:block" />
        <div className="flex items-center gap-4 px-8">
          <div className="bg-amber-100 p-3 rounded-2xl text-accent">
            <Star size={24} />
          </div>
          <div>
            <h4 className="font-bold text-text-primary">4.8 Avg Rating</h4>
            <p className="text-xs text-text-secondary">Top Rated Stays</p>
          </div>
        </div>
      </section>

      {/* Featured Resorts */}
      <ResortGrid 
        resorts={featuredResorts} 
        title="Featured Private Resorts" 
        subtitle="Handpicked premium escapes for your next memorable gathering."
      />

      {/* Why Choose Us / About Section */}
      <section id="about" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl z-10">
                <Image 
                  src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1000" 
                  alt="About Porac" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 h-64 w-64 rounded-3xl overflow-hidden shadow-2xl z-20 border-4 border-white hidden md:block">
                <Image 
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600" 
                  alt="Porac Detail" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="absolute -top-10 -left-10 h-40 w-40 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -right-10 h-40 w-40 bg-secondary/10 rounded-full blur-3xl" />
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                Escape to the Heart of <br />
                <span className="text-primary">Pampanga's Hidden Paradise</span>
              </h2>
              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                Porac is known for its breathtaking landscapes and serene atmosphere. Our curated list of private resorts offers the perfect blend of modern luxury and natural beauty.
              </p>
              
              <ul className="space-y-6 mb-10">
                <li className="flex gap-4">
                  <div className="bg-primary/10 p-1 rounded-full text-primary shrink-0">
                    <div className="bg-primary w-2 h-2 rounded-full" />
                  </div>
                  <p className="font-medium text-text-primary">Exclusive access to the best private villas in Porac.</p>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary/10 p-1 rounded-full text-primary shrink-0">
                    <div className="bg-primary w-2 h-2 rounded-full" />
                  </div>
                  <p className="font-medium text-text-primary">Transparent pricing with no hidden booking fees.</p>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary/10 p-1 rounded-full text-primary shrink-0">
                    <div className="bg-primary w-2 h-2 rounded-full" />
                  </div>
                  <p className="font-medium text-text-primary">Curated amenities from infinity pools to private chefs.</p>
                </li>
              </ul>

              <Link 
                href="/resorts"
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all hover:shadow-xl hover:translate-y-[-2px]"
              >
                Browse All Resorts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-white/5 -skew-x-12 -translate-x-1/2" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready for your next adventure?</h2>
          <p className="text-xl text-white/80 mb-10">
            Book your dream private resort in Porac today and create unforgettable memories with your loved ones.
          </p>
          <Link 
            href="/resorts"
            className="bg-white text-primary px-10 py-5 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all shadow-2xl active:scale-95 inline-block"
          >
            Start Exploring
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
