import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  { name: 'Emma Wilson', location: 'United States', text: '"Wanderly made our dream trip to Italy so effortless. Every detail was perfect, from the hotels to the experiences!"', avatar: 'https://i.pravatar.cc/100?img=1' },
  { name: 'James Carter', location: 'United Kingdom', text: '"The Northern Lights experience was absolutely magical. Trip was hands down the best trip we\'ve ever taken!"', avatar: 'https://i.pravatar.cc/100?img=3' },
  { name: 'Priya Sharma', location: 'India', text: '"Beautifully curated experiences, seamless planning and amazing support. Couldn\'t have asked for more!"', avatar: 'https://i.pravatar.cc/100?img=5' },
];

export default function Testimonials() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="mb-10 text-center md:text-left">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Travelers' Stories</span>
        <h2 className="text-3xl  font-bold text-gray-900 mt-1">What our travelers say</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev, idx) => (
          <div key={idx} className="bg-stone-50 rounded-2xl p-6 border border-gray-100 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-gray-600 italic leading-relaxed">{rev.text}</p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
              <img src={rev.avatar} alt={rev.name} className="w-9 h-9 rounded-full object-cover" />
              <div>
                <h4 className="text-xs font-bold text-gray-900">{rev.name}</h4>
                <p className="text-[10px] text-gray-400">{rev.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}