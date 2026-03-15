import { useState } from 'react';
import { ShieldCheck, ArrowRight, FileText, PhoneCall, Home, ArrowLeft } from 'lucide-react';

export default function Intake() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [safeContactMethod, setSafeContactMethod] = useState('call');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Immediate needs checkboxes
    const needs = ['housing', 'clothing', 'medical', 'food', 'legal'].filter(need => formData.get(`need_${need}`));
    data.immediateNeeds = needs;

    // The submission URL will be injected later via import.meta.env.VITE_SUPABASE_URL
    // to ensure the component remains 100% portable across any domain or host.
    console.log('Form Data Submitted:', data);

    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
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
            <div className="p-10 md:p-16 flex flex-col justify-center relative min-h-[600px]">
              {isSubmitted ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
                  <div className="w-16 h-16 bg-olive/10 text-olive rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck className="w-8 h-8" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-amethyst-dark mb-4">Application Received</h3>
                  <p className="text-gray-600 mb-8">
                    Thank you for reaching out. Your information has been securely received. A case manager will contact you shortly using your safe contact method.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setShowForm(false);
                    }}
                    className="bg-olive hover:bg-olive-dark text-white px-8 py-3 rounded-xl font-semibold transition-colors"
                  >
                    Return to Information
                  </button>
                </div>
              ) : showForm ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <button 
                    onClick={() => setShowForm(false)} 
                    className="mb-6 text-amethyst hover:text-amethyst-dark flex items-center gap-2 text-sm font-medium transition-colors"
                    aria-label="Back to information"
                  >
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back
                  </button>
                  <h3 className="text-2xl font-serif font-bold text-amethyst-dark mb-2">Secure Intake Form</h3>
                  <p className="text-gray-600 mb-8 text-sm">Please fill out this secure form. Your safety and privacy are our top priorities.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-900 mb-1">Full Name</label>
                      <input 
                        id="fullName" 
                        name="fullName" 
                        required 
                        type="text" 
                        className="w-full bg-lavender-base border border-amethyst/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amethyst focus:border-transparent transition-all" 
                        aria-required="true"
                      />
                    </div>

                    {/* Safe Contact Method */}
                    <div>
                      <fieldset>
                        <legend className="block text-sm font-medium text-gray-900 mb-1">Safe Contact Method</legend>
                        <p className="text-xs text-gray-500 mb-3">We will only use this method to protect your safety and privacy.</p>
                        <div className="flex flex-wrap gap-4">
                          {['Call', 'Text', 'Email'].map((method) => (
                            <label key={method} className="flex items-center gap-2 cursor-pointer">
                              <input 
                                type="radio" 
                                name="contactMethod" 
                                value={method.toLowerCase()} 
                                checked={safeContactMethod === method.toLowerCase()}
                                onChange={(e) => setSafeContactMethod(e.target.value)}
                                className="w-4 h-4 text-amethyst focus:ring-amethyst border-gray-300"
                              />
                              <span className="text-sm text-gray-700">{method}</span>
                            </label>
                          ))}
                        </div>
                      </fieldset>
                    </div>

                    {/* Contact Details */}
                    <div>
                      <label htmlFor="contactDetails" className="block text-sm font-medium text-gray-900 mb-1">
                        {safeContactMethod === 'email' ? 'Email Address' : 'Phone Number'}
                      </label>
                      <input 
                        id="contactDetails" 
                        name="contactDetails" 
                        required 
                        type={safeContactMethod === 'email' ? 'email' : 'tel'} 
                        className="w-full bg-lavender-base border border-amethyst/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amethyst focus:border-transparent transition-all" 
                        aria-required="true"
                      />
                    </div>

                    {/* Parole / Probation Status */}
                    <div>
                      <fieldset>
                        <legend className="block text-sm font-medium text-gray-900 mb-1">Parole / Probation Status</legend>
                        <p className="text-xs text-gray-500 mb-3">This is strictly to ensure appropriate house placement and resources.</p>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="probationStatus" value="yes" required className="w-4 h-4 text-amethyst focus:ring-amethyst border-gray-300" />
                            <span className="text-sm text-gray-700">Yes</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="probationStatus" value="no" required className="w-4 h-4 text-amethyst focus:ring-amethyst border-gray-300" />
                            <span className="text-sm text-gray-700">No</span>
                          </label>
                        </div>
                      </fieldset>
                    </div>

                    {/* Brief Incident Background */}
                    <div>
                      <label htmlFor="incidentBackground" className="block text-sm font-medium text-gray-900 mb-1">Brief Incident Background</label>
                      <p className="text-xs text-gray-500 mb-2">Briefly describe your current situation so we can prepare the right support.</p>
                      <textarea 
                        id="incidentBackground" 
                        name="incidentBackground" 
                        required 
                        rows={4} 
                        className="w-full bg-lavender-base border border-amethyst/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amethyst focus:border-transparent transition-all resize-none"
                        aria-required="true"
                      ></textarea>
                    </div>

                    {/* Immediate Needs */}
                    <div>
                      <fieldset>
                        <legend className="block text-sm font-medium text-gray-900 mb-2">Immediate Needs</legend>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {['Housing', 'Clothing', 'Medical', 'Food', 'Legal'].map((need) => (
                            <label key={need} className="flex items-center gap-2 cursor-pointer bg-lavender-base border border-amethyst/10 px-3 py-2 rounded-lg hover:bg-amethyst/5 transition-colors">
                              <input 
                                type="checkbox" 
                                name={`need_${need.toLowerCase()}`} 
                                className="w-4 h-4 text-olive focus:ring-olive border-gray-300 rounded" 
                              />
                              <span className="text-sm text-gray-700">{need}</span>
                            </label>
                          ))}
                        </div>
                      </fieldset>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 bg-amethyst hover:bg-amethyst-dark text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                        aria-busy={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                            Submit Securely
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                    onClick={() => setShowForm(true)}
                    className="flex items-center justify-center gap-2 bg-amethyst hover:bg-amethyst-dark text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl w-full sm:w-auto"
                  >
                    <FileText className="w-5 h-5" aria-hidden="true" />
                    Start Intake Form
                    <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
            
            <div className="bg-amethyst-dark p-10 md:p-16 text-white flex flex-col justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,100 L100,0 L100,100 Z" fill="currentColor" />
                </svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-serif font-bold mb-4">Need immediate assistance?</h3>
                <p className="text-white/90 mb-8">
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
    </section>
  );
}
