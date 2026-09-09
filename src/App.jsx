import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Destinations from './components/Destinations';
import Experience from './components/Experience';
import FeaturedTrip from './components/FeaturedTrip';
import TravelInspiration from './components/TravelInspiration';
import VibeBuilder from './components/VibeBuilder';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />
      <HeroSection />
      <Destinations />
      <Experience />
      <FeaturedTrip />
      <TravelInspiration />
      <VibeBuilder />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
}