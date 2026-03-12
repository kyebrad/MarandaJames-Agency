import { useState } from 'react';
import { Heart, Users, Package, X, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  const [activeModal, setActiveModal] = useState<'donate' | 'volunteer' | 'items' | null>(null);
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
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10 max-w-2xl border-l-4 border-gold pl-6">
            Providing a supportive bridge to give individuals the tools, skills, and stability needed to transition into independent housing, while demonstrating the life-changing gospel of Jesus Christ.
          </p>
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <button 
              onClick={() => setActiveModal('donate')}
              className="flex items-center justify-center gap-2 bg-olive hover:bg-olive-dark text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 group"
            >
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Make a Donation
            </button>
            <button 
              onClick={() => setActiveModal('volunteer')}
              className="flex items-center justify-center gap-2 bg-white border-2 border-olive text-olive hover:bg-olive hover:text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-md group"
            >
              <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Volunteer With Us
            </button>
            <button 
              onClick={() => setActiveModal('items')}
              className="flex items-center justify-center gap-2 bg-white border-2 border-olive text-olive hover:bg-olive hover:text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-md group"
            >
              <Package className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Donate Items
            </button>
          </div>
        </div>
      </div>

      {/* Action Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 md:p-8 relative my-8">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-olive mx-auto mb-4" />
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
                <h3 className="text-2xl font-serif font-bold text-amethyst-dark mb-2">
                  {activeModal === 'donate' && 'Make a Donation'}
                  {activeModal === 'volunteer' && 'Volunteer With Us'}
                  {activeModal === 'items' && 'Donate Items'}
                </h3>
                <p className="text-gray-600 mb-6 text-sm">
                  {activeModal === 'donate' && 'Your financial support helps us provide safe housing and essential services.'}
                  {activeModal === 'volunteer' && 'Join our community of volunteers making a difference every day.'}
                  {activeModal === 'items' && 'We accept clothing, non-perishable food, and hygiene products.'}
                </p>
                
                <form onSubmit={handleActionSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input required type="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive" />
                  </div>
                  
                  {activeModal === 'donate' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Donation Amount</label>
                      <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive">
                        <option>$25</option>
                        <option>$50</option>
                        <option>$100</option>
                        <option>Other</option>
                      </select>
                    </div>
                  )}
                  
                  {activeModal === 'items' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Items to Donate</label>
                      <textarea required rows={2} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive" placeholder="Please describe the items..."></textarea>
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
