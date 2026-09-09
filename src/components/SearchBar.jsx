import React from 'react';
import { MapPin, Calendar, Users, ArrowUpRight } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="w-full bg-ivory/95 backdrop-blur-md rounded-2xl md:rounded-full shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)] p-2.5 flex flex-col md:flex-row items-stretch md:items-center gap-2 text-ink border border-ink/5">
      <div className="flex items-center gap-3 px-4 py-2.5 md:border-r border-ink/10 flex-1">
        <MapPin className="text-clay w-4 h-4 shrink-0" />
        <div className="flex flex-col text-left w-full">
          <span className="text-[10px] font-medium text-ink/40">Where to</span>
          <input
            type="text"
            placeholder="Search destinations"
            className="bg-transparent text-sm font-medium focus:outline-none placeholder-ink/30 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 px-4 py-2.5 md:border-r border-ink/10 flex-1">
        <Calendar className="text-clay w-4 h-4 shrink-0" />
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-medium text-ink/40">Dates</span>
          <span className="text-sm font-medium cursor-pointer">Any dates</span>
        </div>
      </div>

      <div className="flex items-center gap-3 px-4 py-2.5 flex-1">
        <Users className="text-clay w-4 h-4 shrink-0" />
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-medium text-ink/40">Travelers</span>
          <span className="text-sm font-medium cursor-pointer">2 travelers</span>
        </div>
      </div>

      <button className="bg-ink hover:bg-pine text-ivory rounded-xl md:rounded-full p-3.5 md:p-4 flex items-center justify-center gap-2 px-6 transition w-full md:w-auto shrink-0">
        <span className="text-sm font-medium">Search</span>
        <ArrowUpRight className="w-4 h-4" />
      </button>
    </div>
  );
}