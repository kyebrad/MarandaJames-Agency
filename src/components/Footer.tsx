import { Heart, Home } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-olive text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-2">
            <a href="#" aria-label="Home" className="mb-6 inline-block bg-white p-3 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <img 
                src="https://i.imgur.com/XRPl2IF.png" 
                alt="MarandaJames Agency Logo" 
                className="h-20 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </a>
            <p className="text-gray-200 text-sm max-w-md mb-8 leading-relaxed">
              A faith-based women's transitional shelter in Niagara Falls, NY, providing a supportive bridge to independent housing and demonstrating the life-changing gospel of Jesus Christ.
            </p>
            <div className="p-6 bg-olive-dark rounded-xl border border-white/5 relative overflow-hidden">
              <Heart className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5" aria-hidden="true" />
              <p className="font-serif text-lg italic text-white/90 relative z-10">
                "Trust in the Lord with all your heart and lean not on your own understanding."
              </p>
              <p className="text-gold text-sm font-semibold mt-2 relative z-10">— Proverbs 3:5</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-200">
              <li><a href="#hero" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Our Services</a></li>
              <li><a href="#intake" className="hover:text-white transition-colors">Intake Process</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Volunteer</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Donate</a></li>
              <li><a href="#resources" className="hover:text-white transition-colors">Community Resources</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Community Partners</h4>
            <ul className="space-y-4 text-sm text-gray-200">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-gold"></div>
                PATH (People Against Trafficking Humans)
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-gold"></div>
                Local Parole & Probation
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-gold"></div>
                BOCES Educational Services
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-gold"></div>
                Niagara Falls Community Services
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-200">
          <p>© {new Date().getFullYear()} MarandaJames Agency. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Confidentiality</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
