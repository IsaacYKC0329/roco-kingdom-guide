import { useState, useRef, useEffect, useMemo } from 'react';
import { pets, elements } from '@/data/gameData';
import type { Pet } from '@/types';
import { Star, Search, X, GitBranch } from 'lucide-react';

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i < count ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-[#334155]'}`} />
      ))}
    </div>
  );
}

function PetCard({ pet, index, onClick }: { pet: Pet; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setTimeout(() => setVisible(true), index * 80); observer.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={ref} onClick={onClick}
      className={`glass-panel rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 group ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ '--hover-shadow': `0 0 30px ${pet.elementColor}30` } as React.CSSProperties}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `var(--hover-shadow)`; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = ''; }}>
      <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.3)]">
        <img src={pet.image} alt={pet.name} className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ background: pet.elementBg, color: pet.elementColor, border: `1px solid ${pet.elementColor}40` }}>
          {elements.find((e) => e.id === pet.element)?.name || pet.element}
        </div>
        {pet.evolution && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[rgba(139,92,246,0.2)] text-[#A78BFA] border border-[#A78BFA]/30 flex items-center gap-1">
            <GitBranch className="w-2.5 h-2.5" />Evo
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-bold text-[#E2E8F0]" style={{ fontFamily: "'Cinzel', serif" }}>{pet.name}</h3>
          <span className="text-[10px] text-[#64748B]">#{String(pet.id).padStart(3, '0')}</span>
        </div>
        <StarRating count={pet.rarity} />
        <div className="mt-2 grid grid-cols-3 gap-1">
          {[{label:'HP',v:pet.stats.hp},{label:'ATK',v:pet.stats.attack},{label:'DEF',v:pet.stats.defense}].map(s => (
            <div key={s.label} className="text-center py-1 rounded bg-[rgba(255,255,255,0.03)]">
              <div className="text-[9px] text-[#64748B]">{s.label}</div>
              <div className="text-[11px] font-bold text-[#E2E8F0]">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PetDetail({ pet, onClose }: { pet: Pet; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />
      <div className="relative w-full max-w-2xl glass-strong rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto scrollbar-hide"
        onClick={(e) => e.stopPropagation()} style={{ animation: 'cardSlideUp 0.4s ease-out', border: `1px solid ${pet.elementColor}30` }}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full glass flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors"><X className="w-4 h-4" /></button>
        <div className="relative h-56 md:h-72 flex items-center justify-center overflow-hidden" style={{ background: `radial-gradient(circle at 50% 50%, ${pet.elementColor}15, transparent 70%)` }}>
          <svg className="absolute w-[120%] h-[120%] -top-[10%] -left-[10%] opacity-20" viewBox="0 0 1000 1000">
            <defs><radialGradient id={`sg-${pet.id}`} cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#F59E0B" /><stop offset="100%" stopColor="#F59E0B" stopOpacity="0" /></radialGradient></defs>
            <polygon points="500,0 610,350 980,350 680,570 790,930 500,720 210,930 320,570 20,350 390,350" fill={`url(#sg-${pet.id})`} stroke="none">
              <animateTransform attributeName="transform" type="rotate" from="0 500 500" to="360 500 500" dur="120s" repeatCount="indefinite" />
            </polygon>
          </svg>
          <img src={pet.image} alt={pet.name} className="relative z-10 h-full object-contain p-6 drop-shadow-2xl" style={{ filter: `drop-shadow(0 0 30px ${pet.elementColor}50)` }} />
        </div>
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <h2 className="text-2xl md:text-3xl font-bold text-[#E2E8F0]" style={{ fontFamily: "'Cinzel', serif" }}>{pet.name}</h2>
            <div className="px-3 py-1 rounded-full text-sm font-bold" style={{ background: pet.elementBg, color: pet.elementColor, border: `1px solid ${pet.elementColor}40` }}>
              {elements.find((e) => e.id === pet.element)?.name || pet.element}
            </div>
            <StarRating count={pet.rarity} />
          </div>
          {pet.evolution && (
            <div className="flex items-center gap-2 mb-3 px-3 py-1.5 rounded-lg bg-[rgba(139,92,246,0.1)] border border-[#8B5CF6]/20 w-fit">
              <GitBranch className="w-3.5 h-3.5 text-[#A78BFA]" />
              <span className="text-xs text-[#A78BFA]" style={{ fontFamily: "'Inter', sans-serif" }}>{pet.evolution}</span>
            </div>
          )}
          <p className="text-[#94A3B8] text-sm leading-relaxed mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>{pet.description}</p>
          <div className="mb-5">
            <h3 className="text-xs font-bold text-[#F59E0B] mb-2 tracking-wider uppercase">Base Stats</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {[{label:'HP',v:pet.stats.hp,c:'#EF4444'},{label:'ATK',v:pet.stats.attack,c:'#F59E0B'},{label:'DEF',v:pet.stats.defense,c:'#3B82F6'},{label:'SPE',v:pet.stats.speed,c:'#22C55E'},{label:'SpA',v:pet.stats.magic,c:'#8B5CF6'},{label:'SpD',v:pet.stats.resist,c:'#67E8F9'}].map(s => (
                <div key={s.label} className="glass-panel rounded-xl p-2.5 text-center">
                  <div className="text-[10px] text-[#64748B] mb-0.5">{s.label}</div>
                  <div className="text-base font-bold" style={{ color: s.c, fontFamily: "'Cinzel', serif" }}>{s.v}</div>
                  <div className="mt-1 h-1 rounded-full bg-[rgba(255,255,255,0.05)] overflow-hidden"><div className="h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min((s.v/130)*100,100)}%`, background: `linear-gradient(90deg, ${s.c}80, ${s.c})` }} /></div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#F59E0B] mb-2 tracking-wider uppercase">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {pet.skills.map((skill) => (
                <span key={skill} className="px-3 py-1.5 rounded-full text-xs font-medium glass" style={{ color: pet.elementColor, border: `1px solid ${pet.elementColor}30` }}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PetPokedex() {
  const [selectedElement, setSelectedElement] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const filteredPets = useMemo(() => pets.filter((pet) => {
    const matchElement = selectedElement === 'all' || pet.element === selectedElement;
    const matchSearch = searchQuery === '' || pet.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchElement && matchSearch;
  }), [selectedElement, searchQuery]);

  return (
    <section id="pokedex-section" className="relative w-full py-20 md:py-28" style={{ background: '#0B0F1F' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-glow" style={{ fontFamily: "'Cinzel', serif", color: '#F59E0B' }}>Pet Index</h2>
          <p className="mt-2 text-[#94A3B8] text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>376+ creatures to discover and collect across the open world</p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-3 mb-8">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input type="text" placeholder="Search pets..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full glass text-sm text-[#E2E8F0] placeholder-[#64748B] focus:outline-none focus:ring-1 focus:ring-[#F59E0B]/50" />
          </div>
          <div className="flex flex-wrap justify-center gap-1.5">
            <button onClick={() => setSelectedElement('all')} className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${selectedElement === 'all' ? 'bg-[#F59E0B] text-[#0B0F1F]' : 'glass text-[#94A3B8] hover:text-white'}`}>All</button>
            {elements.slice(0, 9).map((el) => (
              <button key={el.id} onClick={() => setSelectedElement(el.id)} className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${selectedElement === el.id ? 'text-white' : 'glass hover:text-white'}`} style={selectedElement === el.id ? { background: el.color } : { color: el.color, border: `1px solid ${el.color}30` }}>{el.name}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {filteredPets.map((pet, index) => <PetCard key={pet.id} pet={pet} index={index} onClick={() => setSelectedPet(pet)} />)}
        </div>
        {filteredPets.length === 0 && <div className="text-center py-16 text-[#64748B]"><p>No pets found matching your search.</p></div>}
      </div>
      {selectedPet && <PetDetail pet={selectedPet} onClose={() => setSelectedPet(null)} />}
    </section>
  );
}
