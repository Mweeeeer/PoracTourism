import Image from "next/image";
import SearchBar from "./SearchBar";

const HeroSection = () => {
  return (
    <section className="relative h-[85vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury Resort Pool"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-slate-50/100" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight animate-fade-in">
          Find the Perfect Private Resort <br className="hidden md:block" /> 
          in <span className="text-primary">Porac, Pampanga</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto font-medium">
          Experience exclusivity and serenity in the finest private villas and resorts. 
          Perfect for family gatherings, weddings, or a quick weekend getaway.
        </p>

        <SearchBar className="mx-auto" />
      </div>

      {/* Decorative Blur */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
