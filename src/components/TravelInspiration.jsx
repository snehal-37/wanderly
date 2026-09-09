import React from 'react';

const articles = [
  { tag: 'ASIA', title: '48 Hours in Kyoto', categories: 'Culture • Food • History', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80' },
  { tag: 'EUROPE', title: 'The Ultimate Amalfi Coast Road Trip', categories: 'Road Trips • Beaches • Food', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80' },
  { tag: 'ASIA', title: 'Hidden Gems of Southeast Asia', categories: 'Nature • Culture • Adventure', image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=600&q=80' },
  { tag: 'EUROPE', title: "A Beginner's Guide to the Swiss Alps", categories: 'Hiking • Adventure • Nature', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80' },
];

export default function TravelInspiration() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Travel Inspiration</span>
          <h2 className="text-3xl  font-bold text-gray-900 mt-1">Get inspired</h2>
        </div>
        <a href="#articles" className="text-sm font-semibold text-emerald-900 hover:underline">View all articles →</a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((art, idx) => (
          <div key={idx} className="group bg-neutral-50 rounded-2xl overflow-hidden border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="relative h-48 overflow-hidden">
                <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <span className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">{art.tag}</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-base text-gray-900 group-hover:text-emerald-800 transition">{art.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{art.categories}</p>
              </div>
            </div>
            <div className="p-4 pt-0">
              <a href="#read" className="text-xs font-bold text-emerald-900 hover:underline inline-flex items-center gap-1">Read more →</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}