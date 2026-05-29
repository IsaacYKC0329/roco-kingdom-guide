import { useState } from 'react';
import { guideSections } from '@/data/gameData';
import { ChevronDown, BookOpen } from 'lucide-react';

export default function GuideSection() {
  const [activeSection, setActiveSection] = useState<string>('starter');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0]));
  const currentSection = guideSections.find((s) => s.id === activeSection);
  const toggleItem = (index: number) => { setExpandedItems((prev) => { const next = new Set(prev); next.has(index) ? next.delete(index) : next.add(index); return next; }); };

  return (
    <section id="guide-section" className="relative w-full py-20 md:py-28" style={{ background: 'linear-gradient(180deg, #0B0F1F 0%, #0D1320 50%, #0B0F1F 100%)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-glow" style={{ fontFamily: "'Cinzel', serif", color: '#F59E0B' }}>Game Guide</h2>
          <p className="mt-2 text-[#94A3B8] text-sm">Essential knowledge for your Roco Kingdom Mobile journey</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:w-56 flex-shrink-0">
            <div className="glass rounded-2xl p-2 sticky top-6">
              <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible scrollbar-hide">
                {guideSections.map((section) => (
                  <button key={section.id} onClick={() => { setActiveSection(section.id); setExpandedItems(new Set([0])); }}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all whitespace-nowrap ${activeSection === section.id ? 'bg-[rgba(245,158,11,0.15)] text-[#F59E0B]' : 'text-[#94A3B8] hover:text-[#E2E8F0] hover:bg-[rgba(255,255,255,0.03)]'}`}>
                    <span className="text-base">{section.icon}</span><span className="text-xs font-medium">{section.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1">
            {currentSection && (
              <div className="glass-strong rounded-2xl p-5 md:p-6" style={{ animation: 'cardSlideUp 0.3s ease-out' }}>
                <div className="flex items-center gap-2.5 mb-4"><BookOpen className="w-4 h-4 text-[#F59E0B]" /><h3 className="text-lg font-bold text-[#E2E8F0]" style={{ fontFamily: "'Cinzel', serif" }}>{currentSection.title}</h3></div>
                <div className="space-y-2">
                  {currentSection.content.map((item, index) => {
                    const isExpanded = expandedItems.has(index);
                    return (
                      <div key={index} className="glass-panel rounded-xl overflow-hidden">
                        <button onClick={() => toggleItem(index)} className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors hover:bg-[rgba(255,255,255,0.02)]">
                          <span className="text-xs font-bold text-[#E2E8F0]">{item.subtitle}</span>
                          <ChevronDown className={`w-3.5 h-3.5 text-[#64748B] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                          <div className="px-4 pb-3"><p className="text-xs text-[#94A3B8] leading-relaxed">{item.text}</p></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
