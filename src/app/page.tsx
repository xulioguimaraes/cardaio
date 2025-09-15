import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import PrivacyModal from '@/components/PrivacyModal';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <Footer />
      <PrivacyModal />
    </main>
  );
}
