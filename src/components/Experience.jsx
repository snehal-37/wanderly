import React from 'react';
import { Star } from 'lucide-react';

const experiences = [
  { title: 'Northern Lights Adventure', location: 'Tromsø, Norway', rating: '4.9', reviews: '1.2k', price: '$1,299', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=600&q=80' },
  { title: 'Mediterranean Sailing', location: 'Santorini, Greece', rating: '4.8', reviews: '980', price: '$1,099', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80' },
  { title: 'Japanese Tea Ceremony', location: 'Kyoto, Japan', rating: '4.9', reviews: '760', price: '$199', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80' },
  { title: 'Desert Safari', location: 'Dubai, UAE', rating: '4.7', reviews: '2.1k', price: '$149', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80' },
  { title: 'Alpine Hiking', location: 'Zermatt, Switzerland', rating: '4.8', reviews: '850', price: '$249', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80' },
  { title: 'Tropical Island Escape', location: 'Maldives', rating: '4.9', reviews: '1.4k', price: '$1,599', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80' },
];

export default function Experience() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto bg-stone-50/50 rounded-3xl my-8">
      <div className="flex justify-between items-end mb-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Popular Experiences</span>
          <h2 className="text-3xl  font-bold text-gray-900 mt-1">Experiences worth traveling for</h2>
        </div>
        <a href="#all" className="text-sm font-semibold text-emerald-900 hover:underline">View all experiences →</a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {experiences.map((exp, idx) => (
          <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition p-2 border border-gray-100 flex flex-col justify-between">
            <img src={exp.image} alt={exp.title} className="w-full h-36 object-cover rounded-xl mb-3" />
            <div>
              <h3 className="font-bold text-sm text-gray-900 line-clamp-1">{exp.title}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{exp.location}</p>
              <div className="flex items-center gap-1 text-xs mt-2 text-gray-700">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold">{exp.rating}</span>
                <span className="text-gray-400">({exp.reviews})</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-100">
              <span className="text-xs text-gray-500">From <strong className="text-sm font-bold text-gray-900">{exp.price}</strong></span>
              <button className="text-xs font-semibold px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition">Explore</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}