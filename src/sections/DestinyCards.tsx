import { useRef, useEffect, useState } from 'react';
import { categoryCards } from '@/data/gameData';

export default function DestinyCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards((prev) => new Set(prev).add(idx));
            }, idx * 150);
          }
        });
      },
      { threshold: 0.3 }
    );

    const cards = sectionRef.current?.querySelectorAll('.flip-card-container');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const sectionMap: Record<string, string> = {
      pokedex: 'pokedex-section',
      skills: 'skills-section',
      types: 'type-chart-section',
      guide: 'guide-section',
    };
    const targetId = sectionMap[id];
    if (targetId) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="destiny-cards"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32"
      style={{ background: 'linear-gradient(180deg, #0B0F1F 0%, #0F1525 50%, #0B0F1F 100%)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold text-glow"
            style={{
              fontFamily: "'Cinzel', 'Noto Serif SC', serif",
              color: '#F59E0B',
            }}
          >
            Destiny Cards
          </h2>
          <p className="mt-3 text-[#94A3B8] text-base md:text-lg" style={{ fontFamily: "'Inter', sans-serif" }}>
            Choose your path of exploration
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-10">
          {categoryCards.map((card, index) => (
            <div
              key={card.id}
              className="flip-card-container cursor-pointer"
              data-index={index}
              onClick={() => scrollToSection(card.id)}
            >
              <div className={`flip-card-inner ${visibleCards.has(index) ? 'is-visible' : ''}`}>
                {/* Front */}
                <div
                  className="flip-card-front glass flex flex-col items-center justify-center"
                  style={{ borderColor: `${card.color}30` }}
                >
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${card.color}, transparent 70%)`,
                    }}
                  />
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-40 h-40 object-contain mb-4 drop-shadow-2xl"
                    style={{ filter: `drop-shadow(0 0 20px ${card.color}40)` }}
                  />
                  <span className="text-4xl mb-2">{card.icon}</span>
                </div>

                {/* Back */}
                <div
                  className="flip-card-back glass-strong flex flex-col items-center justify-center p-6 text-center"
                  style={{ borderColor: `${card.color}40` }}
                >
                  <div
                    className="absolute inset-0 opacity-5"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${card.color}, transparent 70%)`,
                    }}
                  />
                  <span className="text-3xl mb-3">{card.icon}</span>
                  <h3
                    className="text-xl font-bold mb-1"
                    style={{
                      fontFamily: "'Cinzel', 'Noto Serif SC', serif",
                      color: card.color,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8] mb-3 tracking-wider uppercase">
                    {card.subtitle}
                  </p>
                  <p
                    className="text-sm text-[#CBD5E1]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {card.description}
                  </p>
                  <div
                    className="mt-4 px-4 py-1.5 rounded-full text-xs font-medium"
                    style={{
                      background: `${card.color}20`,
                      color: card.color,
                      border: `1px solid ${card.color}40`,
                    }}
                  >
                    Enter
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
