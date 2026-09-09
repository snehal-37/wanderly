import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-gray-400 py-16 px-6 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-neutral-800">
        <div className="space-y-3">
          <div className="text-white text-xl font-bold tracking-tight flex items-center gap-1">
            <span className="text-emerald-400">▲</span> Wanderly
          </div>
          <p className="text-gray-400 leading-relaxed">Extraordinary places. Unforgettable stories.</p>
          <div className="flex gap-4 pt-2 text-gray-300">
            {/* Instagram SVG */}
            <svg className="w-4 h-4 cursor-pointer hover:text-white fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>

            {/* Facebook SVG */}
            <svg className="w-4 h-4 cursor-pointer hover:text-white fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>

            {/* Twitter/X SVG */}
            <svg className="w-4 h-4 cursor-pointer hover:text-white fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Discover</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition">Destinations</a></li>
            <li><a href="#" className="hover:text-white transition">Experiences</a></li>
            <li><a href="#" className="hover:text-white transition">Travel Guides</a></li>
            <li><a href="#" className="hover:text-white transition">About</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Company</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy</a></li>
            <li><a href="#" className="hover:text-white transition">Terms</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Join our newsletter</h4>
          <p className="text-gray-400 mb-3">Get travel inspiration, exclusive offers and more, straight to your inbox.</p>
          <div className="flex bg-neutral-800 rounded-full p-1 border border-neutral-700">
            <input type="email" placeholder="Your email address" className="bg-transparent px-3 text-xs w-full text-white focus:outline-none" />
            <button className="bg-emerald-700 hover:bg-emerald-600 text-white p-2 rounded-full transition">
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 flex flex-col md:flex-row justify-between items-center text-[11px] text-gray-500">
        <p>© 2026 Wanderly. All rights reserved.</p>
        <p>Made for curious travelers ♥</p>
      </div>
    </footer>
  );
}