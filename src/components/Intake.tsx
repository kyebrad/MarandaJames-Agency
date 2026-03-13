import { useState } from 'react';
import { ShieldCheck, ArrowRight, FileText, PhoneCall, Home, X } from 'lucide-react';

export default function Intake() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send data to a backend
    setIsSubmitted(true);
  };

  return (
    <section id="intake" className="py-24 bg-lavender-dark relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amethyst rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-olive rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 md:p-16 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amethyst/10 text-amethyst-dark font-semibold text-sm mb-6 w-fit">
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                Secure Intake Process
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-amethyst-dark mb-6">
                Seek Shelter / Intake Pipeline
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                To ensure the safety, privacy, and well-being of all our residents, admission to MarandaJames Agency is based on a secure and thorough intake process. We are here to help you take the first step toward stability.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-olive/10 flex items-center justify-center text-olive font-bold">1</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Submit Application</h4>
                    <p className="text-gray-600 text-sm mt-1">Complete our secure online form or call our intake line.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-olive/10 flex items-center justify-center text-olive font-bold">2</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Initial Assessment</h4>
                    <p className="text-gray-600 text-sm mt-1">Our case managers will review your application and contact you.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-olive/10 flex items-center justify-center text-olive font-bold">3</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Welcome Home</h4>
                    <p className="text-gray-600 text-sm mt-1">Upon approval, we will coordinate your safe arrival at the agency.</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-amethyst hover:bg-amethyst-dark text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                <FileText className="w-5 h-5" aria-hidden="true" />
                Start Intake Form
                <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
              </button>
            </div>
            
            <div className="bg-amethyst-dark p-10 md:p-16 text-white flex flex-col justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,100 L100,0 L100,100 Z" fill="currentColor" />
                </svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-serif font-bold mb-4">Need immediate assistance?</h3>
                <p className="text-amethyst-light mb-8">
                  If you are in immediate danger, please call 911. For 24/7 domestic violence support, contact the national hotline.
                </p>
                <div className="space-y-4">
                  <a href="tel:18007997233" className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-colors backdrop-blur-sm">
                    <PhoneCall className="w-6 h-6 text-gold" aria-hidden="true" />
                    <div>
                      <div className="text-sm text-amethyst-light">National DV Hotline</div>
                      <div className="font-bold text-xl">1-800-799-SAFE</div>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                    <Home className="w-6 h-6 text-gold" aria-hidden="true" />
                    <div>
                      <div className="text-sm text-amethyst-light">Location</div>
                      <div className="font-bold">Niagara Falls, NY</div>
                      <div className="text-xs text-amethyst-light mt-1">Exact address provided upon intake approval</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Intake Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div 
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 md:p-8 relative my-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="intake-modal-title"
          >
            <button
              onClick={() => { setIsModalOpen(false); setIsSubmitted(false); }}
              aria-label="Close"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
            <h3 id="intake-modal-title" className="text-2xl font-serif font-bold text-amethyst-dark mb-2">
              Intake Application
            </h3>
            <p className="text-gray-600 mb-6 text-sm">
              Please fill out this secure form. Our case managers will review your information and contact you as soon as possible.
            </p>
            
            {isSubmitted ? (
              <div className="bg-olive/10 border border-olive/20 rounded-xl p-6 text-center">
                <ShieldCheck className="w-12 h-12 text-olive mx-auto mb-4" aria-hidden="true" />
                <h4 className="text-xl font-bold text-gray-900 mb-2">Application Submitted</h4>
                <p className="text-gray-600">
                  Thank you for reaching out. Your information has been securely received. A case manager will contact you shortly.
                </p>
                <button
                  onClick={() => { setIsModalOpen(false); setIsSubmitted(false); }}
                  className="mt-6 bg-olive hover:bg-olive-dark text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="intake-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input id="intake-name" required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amethyst/50 focus:border-amethyst" />
                  </div>
                  <div>
                    <label htmlFor="intake-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input id="intake-phone" required type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amethyst/50 focus:border-amethyst" />
                  </div>
                </div>
                <div>
                  <label htmlFor="intake-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address (Optional)</label>
                  <input id="intake-email" type="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amethyst/50 focus:border-amethyst" />
                </div>
                <div>
                  <label htmlFor="intake-reason" className="block text-sm font-medium text-gray-700 mb-1">Reason for seeking shelter *</label>
                  <textarea id="intake-reason" required rows={3} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amethyst/50 focus:border-amethyst"></textarea>
                </div>
                <div>
                  <label htmlFor="intake-needs" className="block text-sm font-medium text-gray-700 mb-1">Immediate Needs (e.g., medical, food, clothing)</label>
                  <textarea id="intake-needs" rows={2} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amethyst/50 focus:border-amethyst"></textarea>
                </div>
                
                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-amethyst hover:bg-amethyst-dark text-white rounded-lg font-medium transition-colors"
                  >
                    Submit Securely
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
