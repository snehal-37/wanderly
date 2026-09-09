import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DestinationCarousel from './components/Destinations';
import Experience from './components/Experience';
import FeaturedTrip from './components/FeaturedTrip';
import IndiaGallery from './components/IndiaGallery';
import TravelInspiration from './components/TravelInspiration';
import VibeBuilder from './components/VibeBuilder';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-ivory font-body text-ink selection:bg-clay selection:text-ivory">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <DestinationCarousel />
        <Experience />
        <FeaturedTrip />
        <IndiaGallery />
        <TravelInspiration />
        <VibeBuilder />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}