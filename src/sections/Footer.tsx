import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative w-full py-10" style={{ background: '#080C18' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-base font-bold text-[#F59E0B] mb-0.5" style={{ fontFamily: "'Cinzel', serif" }}>Roco Kingdom Mobile Guide</h3>
            <p className="text-[11px] text-[#64748B]">The ultimate companion app for every Roco trainer</p>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-[#64748B]"><span>Made with</span><Heart className="w-3 h-3 text-[#EF4444] fill-[#EF4444]" /><span>by the community</span></div>
        </div>
        <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.05)] text-center">
          <p className="text-[10px] text-[#475569]">Roco Kingdom is developed by MoreFun Studios and published by Tencent. This is a fan-made unofficial guide.</p>
        </div>
      </div>
    </footer>
  );
}
