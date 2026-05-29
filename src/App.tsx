import Navbar from '@/sections/Navbar';
import HeroSection from '@/sections/HeroSection';
import DestinyCards from '@/sections/DestinyCards';
import PetPokedex from '@/sections/PetPokedex';
import SkillDatabase from '@/sections/SkillDatabase';
import TypeChart from '@/sections/TypeChart';
import PvPTierList from '@/sections/PvPTierList';
import GoogleAd from '@/sections/GoogleAd';
import GuideSection from '@/sections/GuideSection';
import Footer from '@/sections/Footer';

export default function App() {
  return (
    <div className="min-h-screen w-full" style={{ background: '#0B0F1F' }}>
      <Navbar />
      <div id="hero">
        <HeroSection />
      </div>
      <DestinyCards />
      <PetPokedex />
      <GoogleAd slot="AD_SLOT_1" format="horizontal" />
      <SkillDatabase />
      <TypeChart />
      <GoogleAd slot="AD_SLOT_2" format="rectangle" />
      <PvPTierList />
      <GoogleAd slot="AD_SLOT_3" format="horizontal" />
      <GuideSection />
      <Footer />
    </div>
  );
}
