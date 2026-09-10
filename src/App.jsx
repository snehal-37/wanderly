import { useState } from 'react';
import { Lenis } from 'lenis/react';
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
import BackToTop from './components/BackToTop';
import Loader from './components/Loader';
import ScrollProgress from './components/ScrollProgress';
import FilmGrain from './components/FilmGrain';
import ChapterMarker from './components/ChapterMarker';

// Sections that own horizontal scroll (Experience rail, etc.) must be left
// alone by Lenis — walk up from the hovered node looking for an overflow-x
// container and let native scrolling take over there.
const preventLenis = (node) => {
  if (!node || typeof node.closest !== 'function') return false;
  const el = node.closest('*');
  if (!el) return false;
  let cursor = el;
  while (cursor && cursor !== document.body) {
    const style = window.getComputedStyle(cursor);
    if (style.overflowX === 'auto' || style.overflowX === 'scroll') return true;
    cursor = cursor.parentElement;
  }
  return false;
};

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <Lenis
      root
      autoRaf
      options={{
        lerp: 0.09,
        smoothWheel: true,
        anchors: { offset: -96 },
        prevent: preventLenis,
      }}
    >
      <div className="min-h-screen bg-ivory font-body text-ink selection:bg-clay selection:text-ivory">
        <Loader onComplete={() => setReady(true)} />
        <ScrollProgress />
        <FilmGrain />

        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Navbar ready={ready} />

        <main id="main-content">
          <HeroSection ready={ready} />

          <ChapterMarker number="01" label="Destinations" tone="light" />
          <DestinationCarousel />

          <ChapterMarker number="02" label="Experiences" tone="light" />
          <Experience />

          <FeaturedTrip />
          <IndiaGallery />

          <ChapterMarker number="03" label="India" tone="light" />
          <TravelInspiration />

          <ChapterMarker number="04" label="Journeys" tone="dark" />
          <VibeBuilder />

          <ChapterMarker number="05" label="Stories" tone="light" />
          <Testimonials />

          <CallToAction />
        </main>

        <Footer />
        <BackToTop />
      </div>
    </Lenis>
  );
}