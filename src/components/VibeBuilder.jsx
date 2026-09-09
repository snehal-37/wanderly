import React, { useState } from 'react';
import { Sun, Compass, Landmark, Utensils, Trees, Sparkles } from 'lucide-react';

const vibes = [
  { name: 'Relaxation', icon: Sun },
  { name: 'Adventure', icon: Compass },
  { name: 'Culture', icon: Landmark },
  { name: 'Food', icon: Utensils },
  { name: 'Nature', icon: Trees },
  { name: 'Luxury', icon: Sparkles },
];

export default function VibeBuilder() {
  const [selected, setSelected] = useState(['Relaxation']);

  const toggleVibe = (name) => {
    setSelected(prev => prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]);
  };

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="bg-stone-100/80 rounded-3xl p-8 lg:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-md space-y-6">
          <h2 className="text-3xl  font-bold text-gray-900">Build your perfect trip</h2>
          <p className="text-sm text-gray-600">Tell us what you're in the mood for and we'll create a personalized journey just for you.</p>

          <div className="grid grid-cols-2 gap-3">
            {vibes.map((vibe) => {
              const Icon = vibe.icon;
              const active = selected.includes(vibe.name);
              return (
                <button
                  key={vibe.name}
                  onClick={() => toggleVibe(vibe.name)}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-xs font-semibold transition ${
                    active ? 'bg-emerald-900 text-white border-emerald-900' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {vibe.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white max-w-sm w-full text-center space-y-4">
          <h3 className=" font-bold text-xl text-gray-900">What kind of traveler are you?</h3>
          <p className="text-xs text-gray-500">Choose your vibe and let us craft the perfect journey for you.</p>
          <button className="w-full bg-emerald-900 hover:bg-emerald-800 text-white text-sm font-medium py-3 rounded-full transition">
            Create My Journey →
          </button>
        </div>
      </div>
    </section>
  );
}