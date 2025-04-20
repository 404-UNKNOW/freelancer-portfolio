import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import PortfolioSection from './sections/PortfolioSection';
import FAQSection from './sections/FAQSection';
import ContactSection from './sections/ContactSection';

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
