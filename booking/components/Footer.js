import Link from "next/link";
import { Palmtree, Globe, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-primary p-2 rounded-xl text-white">
                <Palmtree size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-text-primary">
                Porac<span className="text-primary">Stays</span>
              </span>
            </Link>
            <p className="text-text-secondary leading-relaxed mb-6">
              Discover the most exclusive private resorts in Porac, Pampanga. Your perfect staycation is just a click away.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-slate-100 text-text-secondary hover:bg-primary hover:text-white transition-colors">
                <Globe size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-100 text-text-secondary hover:bg-primary hover:text-white transition-colors">
                <Mail size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-100 text-text-secondary hover:bg-primary hover:text-white transition-colors">
                <Phone size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-text-secondary hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/resorts" className="text-text-secondary hover:text-primary transition-colors">All Resorts</Link></li>
              <li><Link href="/#about" className="text-text-secondary hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/#faq" className="text-text-secondary hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-text-secondary hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="#" className="text-text-secondary hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-text-secondary hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-text-secondary hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contact Info</h4>
            <ul className="space-y-4 text-text-secondary">
              <li>Porac, Pampanga, Philippines</li>
              <li>+63 912 345 6789</li>
              <li>hello@poracstays.com</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 text-center text-text-secondary text-sm">
          <p>© {new Date().getFullYear()} PoracStays. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
