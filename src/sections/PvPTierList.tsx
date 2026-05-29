import { pvpTiers } from '@/data/gameData';
import { Swords } from 'lucide-react';

export default function PvPTierList() {
  return (
    <section className="relative w-full py-20 md:py-28" style={{ background: 'linear-gradient(180deg, #0B0F1F 0%, #0D1320 50%, #0B0F1F 100%)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Swords className="w-6 h-6 text-[#EF4444]" />
            <h2 className="text-3xl md:text-4xl font-bold text-glow" style={{ fontFamily: "'Cinzel', serif", color: '#F59E0B' }}>PVP Tier List</h2>
          </div>
          <p className="text-[#94A3B8] text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>Current meta rankings for competitive battles</p>
        </div>

        {pvpTiers.map((tier) => (
          <div key={tier.tier} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold" style={{ background: tier.color + '20', color: tier.color, border: `1px solid ${tier.color}40` }}>
                {tier.tier}
              </div>
              <h3 className="text-lg font-bold text-[#E2E8F0]" style={{ fontFamily: "'Cinzel', serif" }}>{tier.tierName}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {tier.pets.map((pet) => (
                <div key={pet.name} className="glass-panel rounded-xl p-4 glow-border transition-all hover:scale-[1.02]">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-[#E2E8F0]">{pet.name}</h4>
                      <span className="text-[10px] text-[#64748B]">{pet.role}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: pet.elementColor + '20', color: pet.elementColor }}>
                      {pet.element}
                    </span>
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{pet.why}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-8 glass-panel rounded-xl p-5 border border-[#F59E0B]/20">
          <h3 className="text-sm font-bold text-[#F59E0B] mb-3">Popular Team Compositions</h3>
          <div className="space-y-3">
            {[
              { name: 'Sandstorm Martial', pets: 'Luoyin + Seal Captain + Chess Queen', strategy: 'Stack defense, counter-attack with HP Swap and reflection' },
              { name: 'Black Horse Spirit', pets: 'Demon Wolf + Shadow Fox + Dark Support', strategy: 'Sacrifice early pets, sweep with 100% boosted Demon Wolf' },
              { name: 'Light Pressure', pets: 'Saint Light Dream + Support Core', strategy: 'Pure Light-type pressure against Dark-heavy meta' },
              { name: 'Ice Lock', pets: 'Snow Fairy + Glacier Blade + Ice Support', strategy: 'Freeze opponents, set up with Absolute Zero' },
            ].map((team) => (
              <div key={team.name} className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 rounded-lg bg-[rgba(255,255,255,0.02)]">
                <div className="sm:w-40 flex-shrink-0">
                  <span className="text-xs font-bold text-[#E2E8F0]">{team.name}</span>
                </div>
                <div className="flex-1">
                  <span className="text-xs text-[#94A3B8]">{team.pets}</span>
                  <span className="text-[10px] text-[#64748B] block mt-0.5">{team.strategy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
