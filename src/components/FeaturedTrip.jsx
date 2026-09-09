import React from 'react';
import { Check, Play } from 'lucide-react';

export default function FeaturedTrip() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-stone-100/60 rounded-3xl p-8 lg:p-12">
        <div className="relative rounded-2xl overflow-hidden h-96 group">
          <img src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80" alt="Amalfi Coast" className="w-full h-full object-cover" />
          <button className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 text-xs font-semibold text-gray-800 shadow-md hover:bg-white transition">
            <Play className="w-3.5 h-3.5 fill-emerald-900 text-emerald-900" /> Watch the journey
          </button>
        </div>

        <div className="space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">Featured Trip</span>
          <h2 className="text-4xl  font-bold text-gray-900">A different way to experience the world.</h2>
          
          <div className="flex gap-4 text-xs font-semibold text-gray-600">
            <span className="bg-white px-3 py-1.5 rounded-full border border-gray-200">⏱ 7 Days</span>
            <span className="bg-white px-3 py-1.5 rounded-full border border-gray-200">📍 Amalfi Coast, Italy</span>
          </div>

          <div className="space-y-2 pt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Your journey includes</p>
            {['Guided city tours in Positano & Amalfi', 'Boat trip along the coastline', 'Local food & wine experiences', 'Handpicked boutique hotels'].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 text-emerald-700" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div>
              <span className="text-xs text-gray-400">From</span>
              <div className="text-2xl font-bold text-emerald-900">$1,799 <span className="text-xs font-normal text-gray-500">per person</span></div>
            </div>
            <button className="bg-emerald-900 hover:bg-emerald-800 text-white font-medium text-sm px-6 py-3 rounded-full transition">
              View Journey →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}