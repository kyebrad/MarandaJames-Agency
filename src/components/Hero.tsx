import { useState, useRef } from 'react';
import { Heart, Users, Package, X, CheckCircle2, HandHeart } from 'lucide-react';

const MagneticButton = ({ children, onClick, className, primary = false }: any) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    // Magnetic pull (max 10px)
    const centerX = width / 2;
    const centerY = height / 2;
    const pullX = ((x - centerX) / centerX) * 10;
    const pullY = ((y - centerY) / centerY) * 10;
    
    setPosition({ x: pullX, y: pullY });
    
    // Glow position (percentage)
    setGlowPos({
      x: (x / width) * 100,
      y: (y / height) * 100
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isHovered ? 'none' : 'transform 0.3s ease-out',
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: `radial-gradient(circle 60px at ${glowPos.x}% ${glowPos.y}%, ${primary ? 'rgba(255,255,255,0.25)' : 'rgba(139, 95, 135, 0.15)'}, transparent)`,
          }}
        />
      )}
      <div className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </div>
    </button>
  );
};

export default function Hero() {
  const [activeModal, setActiveModal] = useState<'donate' | 'volunteer' | 'items' | 'involved' | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleActionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const closeModal = () => {
    setActiveModal(null);
    setTimeout(() => setIsSubmitted(false), 300);
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-lavender-dark min-h-[600px] flex flex-col justify-center">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-full md:w-2/3 h-full bg-amethyst/10 transform -skew-x-12 translate-x-20 origin-top-right"></div>
        <div className="absolute bottom-0 left-0 w-full md:w-1/2 h-2/3 bg-amethyst/5 transform skew-x-12 -translate-x-20 origin-bottom-left"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-amethyst/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-amethyst-dark leading-tight mb-6">
            A safe place to <span className="text-amethyst">start over.</span>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed mb-10 max-w-2xl border-l-4 border-gold pl-6 bg-gradient-to-r from-amethyst-light via-gold to-amethyst-light bg-[length:200%_auto] animate-shimmer text-transparent bg-clip-text font-medium">
            Providing a supportive bridge to give individuals the tools, skills, and stability needed to transition into independent housing, while demonstrating the life-changing gospel of Jesus Christ.
          </p>
          
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center">
              <MagneticButton 
                onClick={() => setActiveModal('donate')}
                primary={true}
                className="bg-amethyst hover:bg-amethyst-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg hover:shadow-xl group w-full sm:w-auto"
              >
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                Make a Donation
              </MagneticButton>
              <MagneticButton 
                onClick={() => setActiveModal('volunteer')}
                className="bg-white border-2 border-olive text-olive hover:bg-olive hover:text-white px-6 py-3.5 rounded-xl font-semibold transition-colors shadow-sm hover:shadow-md group w-full sm:w-auto"
              >
                <Users className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                Volunteer With Us
              </MagneticButton>
              <button 
                onClick={() => setActiveModal('items')}
                className="flex items-center justify-center gap-2 bg-white border-2 border-olive text-olive hover:bg-olive hover:text-white px-6 py-3.5 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 group w-full sm:w-auto"
              >
                <Package className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                Donate Items
              </button>
            </div>
            <div className="flex items-center">
              <button 
                onClick={() => setActiveModal('involved')}
                className="flex items-center justify-center gap-2 bg-transparent border-2 border-amethyst text-amethyst hover:bg-amethyst hover:text-white px-6 py-3.5 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 group w-full sm:w-auto"
              >
                <HandHeart className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                Get Involved
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div 
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 md:p-8 relative my-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="action-modal-title"
          >
            <button
              onClick={closeModal}
              aria-label="Close"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-olive mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-2xl font-serif font-bold text-amethyst-dark mb-2">Thank You!</h3>
                <p className="text-gray-600 mb-6">
                  We have received your information. Our team will be in touch with you shortly.
                </p>
                <button
                  onClick={closeModal}
                  className="bg-olive hover:bg-olive-dark text-white px-8 py-3 rounded-xl font-semibold transition-colors w-full"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 id="action-modal-title" className="text-2xl font-serif font-bold text-amethyst-dark mb-2">
                  {activeModal === 'donate' && 'Make a Donation'}
                  {activeModal === 'volunteer' && 'Volunteer With Us'}
                  {activeModal === 'items' && 'Donate Items'}
                  {activeModal === 'involved' && 'Get Involved'}
                </h3>
                <p className="text-gray-600 mb-6 text-sm">
                  {activeModal === 'donate' && 'Your financial support helps us provide safe housing and essential services.'}
                  {activeModal === 'volunteer' && 'Join our community of volunteers making a difference every day.'}
                  {activeModal === 'items' && 'We accept clothing, non-perishable food, and hygiene products.'}
                  {activeModal === 'involved' && 'Discover the many ways you can partner with MarandaJames Agency to make a lasting impact in our community.'}
                </p>
                
                <form onSubmit={handleActionSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="hero-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input id="hero-name" required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive" />
                  </div>
                  <div>
                    <label htmlFor="hero-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input id="hero-email" required type="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive" />
                  </div>
                  
                  {activeModal === 'donate' && (
                    <div>
                      <label htmlFor="hero-amount" className="block text-sm font-medium text-gray-700 mb-1">Donation Amount</label>
                      <select id="hero-amount" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive">
                        <option>$25</option>
                        <option>$50</option>
                        <option>$100</option>
                        <option>Other</option>
                      </select>
                    </div>
                  )}
                  
                  {activeModal === 'items' && (
                    <div>
                      <label htmlFor="hero-items" className="block text-sm font-medium text-gray-700 mb-1">Items to Donate</label>
                      <textarea id="hero-items" required rows={2} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive" placeholder="Please describe the items..."></textarea>
                    </div>
                  )}

                  {activeModal === 'involved' && (
                    <div>
                      <label htmlFor="hero-involved" className="block text-sm font-medium text-gray-700 mb-1">How would you like to get involved?</label>
                      <textarea id="hero-involved" required rows={3} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive" placeholder="Tell us about your interests, skills, or ideas..."></textarea>
                    </div>
                  )}

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-olive hover:bg-olive-dark text-white px-8 py-3 rounded-xl font-semibold transition-colors"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
