import React from 'react';

export default function CallToAction() {
  return (
    <section className="px-6 max-w-7xl mx-auto my-12">
      <div className="relative rounded-3xl overflow-hidden py-20 px-8 text-center text-white bg-cover bg-center"
        style={{ backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="max-w-xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">Your Next Adventure Awaits</span>
          <h2 className="text-4xl md:text-5xl  font-bold">The world is waiting.</h2>
          <p className="text-sm text-gray-200 font-light">Your next unforgettable journey starts here.</p>
          <div className="pt-4">
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-8 py-3 rounded-full transition shadow-lg">
              Start Exploring →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}