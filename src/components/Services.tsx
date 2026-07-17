import { useEffect, useRef } from 'react';
import { Home, ClipboardList, BookOpen, Briefcase, PiggyBank, HeartHandshake } from 'lucide-react';
import { revealOnScroll } from '../lib/motion';

const services = [
  {
    title: 'Temporary Housing Stability',
    description: 'A secure, peaceful environment where women can rest, recover, and rebuild without the immediate stress of housing insecurity.',
    icon: Home,
  },
  {
    title: 'Intensive Case Management',
    description: 'Personalized support plans tailored to each individual\'s unique journey, addressing barriers and setting achievable goals.',
    icon: ClipboardList,
  },
  {
    title: 'Life Skills Training',
    description: 'Practical education in essential daily skills, empowering residents to navigate independent living with confidence.',
    icon: BookOpen,
  },
  {
    title: 'Employment Support',
    description: 'Resume building, interview preparation, and connections to local employers to foster financial independence.',
    icon: Briefcase,
  },
  {
    title: 'Financial Literacy',
    description: 'Budgeting workshops, credit repair assistance, and financial planning to ensure long-term stability.',
    icon: PiggyBank,
  },
  {
    title: 'Spiritual Guidance',
    description: 'Optional faith-based counseling and community worship, demonstrating the life-changing gospel of Jesus Christ in action.',
    icon: HeartHandshake,
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mm = revealOnScroll(cardsRef.current.filter(Boolean) as HTMLDivElement[], { stagger: 0.12 });
    return () => mm.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="kicker text-olive mb-3">Our Core Services</h2>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-amethyst-dark tracking-tight">
            Comprehensive support for your journey forward.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="bg-lavender-base rounded-2xl p-8 border border-amethyst/10 shadow-premium hover:shadow-premium-lg hover:-translate-y-1 transition-[transform,box-shadow] duration-300 ease-out group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-white to-amethyst/5 flex items-center justify-center shadow-sm mb-6 group-hover:from-amethyst group-hover:to-amethyst-dark group-hover:text-white transition-colors text-amethyst">
                  <Icon className="w-7 h-7" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h4>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
