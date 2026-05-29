import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Pets', href: '#pokedex-section' },
  { label: 'Skills', href: '#skills-section' },
  { label: 'Types', href: '#type-chart-section' },
  { label: 'Guide', href: '#guide-section' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleClick = (href: string) => {
    setMobileOpen(false);
    if (href === '#hero') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
      <div className="glass rounded-full px-2 py-1.5 flex items-center gap-0.5">
        {navLinks.map((link) => (
          <button key={link.href} onClick={() => handleClick(link.href)} className="hidden md:block px-3 py-1.5 rounded-full text-[11px] font-medium text-[#94A3B8] hover:text-[#F59E0B] hover:bg-[rgba(245,158,11,0.1)] transition-all">{link.label}</button>
        ))}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-8 h-8 rounded-full flex items-center justify-center text-[#94A3B8]">{mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}</button>
      </div>
      {mobileOpen && (
        <div className="md:hidden mt-2 glass rounded-2xl p-2 flex flex-col gap-0.5">
          {navLinks.map((link) => (
            <button key={link.href} onClick={() => handleClick(link.href)} className="px-4 py-2 rounded-xl text-sm text-[#94A3B8] hover:text-[#F59E0B] hover:bg-[rgba(245,158,11,0.1)] transition-all text-left">{link.label}</button>
          ))}
        </div>
      )}
    </nav>
  );
}
