import { useState, useMemo } from 'react';
import { elements } from '@/data/gameData';
import { Sword, Shield, Ban } from 'lucide-react';

export default function TypeChart() {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const selectedEl = useMemo(() => elements.find((e) => e.id === selectedElement), [selectedElement]);
  const strongAgainst = useMemo(() => { if (!selectedEl) return []; return elements.filter((e) => selectedEl.strongAgainst.includes(e.id)); }, [selectedEl]);
  const weakAgainst = useMemo(() => { if (!selectedEl) return []; return elements.filter((e) => selectedEl.weakAgainst.includes(e.id)); }, [selectedEl]);
  const resistedBy = useMemo(() => { if (!selectedEl) return []; return elements.filter((e) => { const el = elements.find((x) => x.id === e.id); return el?.weakAgainst.includes(selectedEl.id); }); }, [selectedEl]);
  const superEffective = useMemo(() => { if (!selectedEl) return []; return elements.filter((e) => { const el = elements.find((x) => x.id === e.id); return el?.strongAgainst.includes(selectedEl.id); }); }, [selectedEl]);
  const immune = useMemo(() => { if (!selectedEl) return []; return elements.filter((e) => selectedEl.immuneTo?.includes(e.id)); }, [selectedEl]);
  const immuneTo = useMemo(() => { if (!selectedEl) return []; return elements.filter((e) => e.immuneTo?.includes(selectedEl.id)); }, [selectedEl]);

  return (
    <section id="type-chart-section" className="relative w-full py-20 md:py-28" style={{ background: '#0B0F1F' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-glow" style={{ fontFamily: "'Cinzel', serif", color: '#F59E0B' }}>Type Chart</h2>
          <p className="mt-2 text-[#94A3B8] text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>20 elements with Light type — master every matchup</p>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-8 max-w-3xl mx-auto">
          {elements.map((el) => (
            <button key={el.id} onClick={() => setSelectedElement(el.id === selectedElement ? null : el.id)}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all duration-300 ${selectedElement === el.id ? 'scale-110 ring-2' : 'hover:scale-105 opacity-70 hover:opacity-100'}`}
              style={{ background: selectedElement === el.id ? el.bgColor : 'rgba(255,255,255,0.03)', border: `1px solid ${selectedElement === el.id ? el.color + '80' : el.color + '20'}`, boxShadow: selectedElement === el.id ? `0 0 20px ${el.color}30` : 'none' }}>
              <span className="text-base">{el.icon}</span>
              <span className="text-[9px] font-medium" style={{ color: selectedElement === el.id ? el.color : '#94A3B8' }}>{el.name}</span>
            </button>
          ))}
        </div>
        {selectedEl && (
          <div className="glass-strong rounded-2xl p-5 md:p-6 max-w-4xl mx-auto" style={{ border: `1px solid ${selectedEl.color}30`, animation: 'cardSlideUp 0.4s ease-out' }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{selectedEl.icon}</span>
              <div>
                <h3 className="text-lg font-bold text-[#E2E8F0]" style={{ fontFamily: "'Cinzel', serif" }}>{selectedEl.name}</h3>
                <div className="flex items-center gap-2 mt-0.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: selectedEl.color }} /><span className="text-[10px] text-[#64748B] uppercase">{selectedEl.id}</span></div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <ChartCard title="Super Effective (2x)" items={strongAgainst} color="#EF4444" icon={<Sword className="w-3.5 h-3.5" />} />
              <ChartCard title="Not Very Effective (0.5x)" items={weakAgainst} color="#3B82F6" icon={<Shield className="w-3.5 h-3.5" />} />
              <ChartCard title="Immune (0x)" items={immune} color="#7C3AED" icon={<Ban className="w-3.5 h-3.5" />} emptyText="No immunities" />
              <ChartCard title="Weak To (Take 2x)" items={resistedBy} color="#F59E0B" icon={<Shield className="w-3.5 h-3.5" />} />
              <ChartCard title="Resists (Take 0.5x)" items={superEffective} color="#22C55E" icon={<Sword className="w-3.5 h-3.5" />} />
              <ChartCard title="Immune To (Take 0x)" items={immuneTo} color="#6B7280" icon={<Ban className="w-3.5 h-3.5" />} emptyText="No immunities" />
            </div>
          </div>
        )}
        {!selectedEl && <div className="text-center py-10 text-[#64748B] glass-panel rounded-2xl max-w-lg mx-auto"><span className="text-3xl mb-2 block">👆</span><p className="text-sm">Tap an element to view its matchups</p></div>}
      </div>
    </section>
  );
}

function ChartCard({ title, items, color, icon, emptyText = 'None' }: { title: string; items: typeof elements; color: string; icon: React.ReactNode; emptyText?: string }) {
  return (
    <div className="glass-panel rounded-xl p-3">
      <div className="flex items-center gap-2 mb-2" style={{ color }}>{icon}<h4 className="text-xs font-bold">{title}</h4></div>
      {items.length > 0 ? <div className="flex flex-wrap gap-1.5">{items.map((el) => <span key={el.id} className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: el.bgColor, color: el.color, border: `1px solid ${el.color}40` }}>{el.icon} {el.name}</span>)}</div> : <p className="text-[10px] text-[#64748B]">{emptyText}</p>}
    </div>
  );
}
