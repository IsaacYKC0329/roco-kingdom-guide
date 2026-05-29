import { useState, useMemo } from 'react';
import { skills, elements } from '@/data/gameData';
import { Zap, Shield, Wind } from 'lucide-react';

const typeIcons: Record<string, React.ReactNode> = {
  'Physical': <Zap className="w-3.5 h-3.5" />,
  'Special': <Wind className="w-3.5 h-3.5" />,
  'Status': <Shield className="w-3.5 h-3.5" />,
};

export default function SkillDatabase() {
  const [selectedElement, setSelectedElement] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const filteredSkills = useMemo(() => skills.filter((skill) => {
    return (selectedElement === 'all' || skill.element === selectedElement) && (selectedType === 'all' || skill.type === selectedType);
  }), [selectedElement, selectedType]);

  return (
    <section id="skills-section" className="relative w-full py-20 md:py-28" style={{ background: 'linear-gradient(180deg, #0B0F1F 0%, #0D1320 50%, #0B0F1F 100%)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-glow" style={{ fontFamily: "'Cinzel', serif", color: '#F59E0B' }}>Skill Index</h2>
          <p className="mt-2 text-[#94A3B8] text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>Master every technique to dominate turn-based battles</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <button onClick={() => setSelectedType('all')} className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${selectedType === 'all' ? 'bg-[#F59E0B] text-[#0B0F1F]' : 'glass text-[#94A3B8] hover:text-white'}`}>All Types</button>
          {(['Physical', 'Special', 'Status'] as const).map((t) => (
            <button key={t} onClick={() => setSelectedType(t)} className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all flex items-center gap-1 ${selectedType === t ? 'bg-[#38BDF8] text-[#0B0F1F]' : 'glass text-[#94A3B8] hover:text-white'}`}>{typeIcons[t]}{t}</button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-1.5 mb-8">
          <button onClick={() => setSelectedElement('all')} className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${selectedElement === 'all' ? 'bg-[#F59E0B] text-[#0B0F1F]' : 'glass text-[#94A3B8] hover:text-white'}`}>All</button>
          {elements.slice(0, 10).map((el) => (
            <button key={el.id} onClick={() => setSelectedElement(el.id)} className={`px-2 py-1 rounded-full text-[11px] font-medium transition-all ${selectedElement === el.id ? 'text-white' : 'glass hover:text-white'}`} style={selectedElement === el.id ? { background: el.color } : { color: el.color, border: `1px solid ${el.color}30` }}>{el.name}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredSkills.map((skill) => (
            <div key={skill.id} className="glass-panel rounded-xl p-4 glow-border transition-all duration-300 hover:scale-[1.02] group">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-sm font-bold text-[#E2E8F0] group-hover:text-[#F59E0B] transition-colors" style={{ fontFamily: "'Cinzel', serif" }}>{skill.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: skill.elementColor + '20', color: skill.elementColor }}>{elements.find((e) => e.id === skill.element)?.name || skill.element}</span>
                    <span className="flex items-center gap-1 text-[10px] text-[#64748B]">{typeIcons[skill.type]}{skill.type}</span>
                  </div>
                </div>
                {skill.power > 0 && <div className="text-right"><div className="text-lg font-bold" style={{ color: skill.elementColor, fontFamily: "'Cinzel', serif" }}>{skill.power}</div><div className="text-[9px] text-[#64748B]">POW</div></div>}
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-2">{skill.description}</p>
              <div className="flex gap-4 pt-2 border-t border-[rgba(255,255,255,0.05)]">
                <div className="flex items-center gap-1"><span className="text-[9px] text-[#64748B]">PP</span><span className="text-[11px] font-bold text-[#E2E8F0]">{skill.pp}</span></div>
                <div className="flex items-center gap-1"><span className="text-[9px] text-[#64748B]">ACC</span><span className="text-[11px] font-bold text-[#E2E8F0]">{skill.accuracy}%</span></div>
              </div>
            </div>
          ))}
        </div>
        {filteredSkills.length === 0 && <div className="text-center py-16 text-[#64748B]"><p>No skills match your filters.</p></div>}
      </div>
    </section>
  );
}
