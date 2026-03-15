import { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "Who is eligible for MarandaJames Agency services?",
    answer: "We serve women who are transitioning from crisis situations, including domestic violence, homelessness, or other hardships, seeking a safe place to start over and rebuild their lives."
  },
  {
    question: "How do I apply for housing or services?",
    answer: "You can reach out to us directly via our contact form, call our main office, or receive a referral from a local community partner, emergency shelter, or law enforcement agency."
  },
  {
    question: "What kind of support do you provide besides housing?",
    answer: "Beyond safe housing, we offer comprehensive case management, life skills training, employment assistance, financial literacy programs, and spiritual guidance to help you achieve long-term independence."
  },
  {
    question: "Is my information kept confidential?",
    answer: "Yes, absolutely. Your safety and privacy are our highest priorities. We maintain strict confidentiality protocols for all our residents and clients."
  },
  {
    question: "How long can someone stay in the transitional housing program?",
    answer: "Our program is designed to provide stability while you work towards independence. The length of stay varies based on individual needs, goals, and progress within the program."
  },
  {
    question: "How can the community support the MarandaJames Agency?",
    answer: "You can support our mission by making a financial donation, volunteering your time and skills, or donating essential items such as clothing, non-perishable food, and hygiene products."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.faq-header', {
      scrollTrigger: {
        trigger: '.faq-header',
        start: 'top 85%',
      },
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });

    gsap.from('.faq-item', {
      scrollTrigger: {
        trigger: '.faq-list',
        start: 'top 85%',
      },
      x: -20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
    });
  }, { scope: containerRef });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" ref={containerRef} className="py-20 bg-lavender-base/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="faq-header text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-amethyst-dark mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">Find answers to common questions about our agency, services, and how to get help.</p>
        </div>
        
        <div className="faq-list space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="faq-item bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-amethyst focus-visible:ring-inset"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-gray-900 pr-8">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-amethyst flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                  aria-hidden="true"
                />
              </button>
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                aria-hidden={openIndex !== index}
              >
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
