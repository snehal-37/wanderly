import { useState } from 'react';
import { MapPin, Calendar, Users, ArrowUpRight } from 'lucide-react';

export default function SearchBar() {
  const [destination, setDestination] = useState('');
  const [travelers, setTravelers] = useState(2);

  const handleSearch = () => {
    if (destination.trim()) {
      alert(`Searching for trips to "${destination}" for ${travelers} travelers`);
    }
  };

  return (
    <div className="w-full bg-ivory/92 backdrop-blur-md rounded-2xl border border-ivory/20 px-2.5 py-2.5 flex flex-col md:flex-row items-stretch md:items-center gap-1.5 text-ink shadow-[0_30px_80px_-32px_rgba(8,8,4,0.75)]">
      <div className="flex items-center gap-3 px-4 py-2.5 md:border-r border-ink/10 flex-1 focus-within:bg-ivory/60 rounded-lg transition-colors duration-300">
        <MapPin className="text-clay w-4 h-4 shrink-0" />
        <div className="flex flex-col text-left w-full">
          <label htmlFor="search-destination" className="text-[9px] font-medium text-ink/40 uppercase tracking-[0.2em]">
            Where to
          </label>
          <input
            id="search-destination"
            type="text"
            placeholder="Search destinations"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="bg-transparent text-sm font-medium focus:outline-none placeholder-ink/30 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 px-4 py-2.5 md:border-r border-ink/10 flex-1">
        <Calendar className="text-clay w-4 h-4 shrink-0" />
        <div className="flex flex-col text-left">
          <span className="text-[9px] font-medium text-ink/40 uppercase tracking-[0.2em]">Dates</span>
          <span className="text-sm font-medium">Any dates</span>
        </div>
      </div>

      <div className="flex items-center gap-3 px-4 py-2.5 flex-1">
        <Users className="text-clay w-4 h-4 shrink-0" />
        <div className="flex flex-col text-left">
          <label htmlFor="travelers-count" className="text-[9px] font-medium text-ink/40 uppercase tracking-[0.2em]">
            Travelers
          </label>
          <select
            id="travelers-count"
            value={travelers}
            onChange={(e) => setTravelers(Number(e.target.value))}
            className="bg-transparent text-sm font-medium focus:outline-none appearance-none cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? 'traveler' : 'travelers'}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleSearch}
        data-cursor="cta"
        className="group bg-clay hover:bg-clay-light text-ink rounded-xl px-5 md:px-6 py-3.5 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.97] shrink-0"
        aria-label="Search destinations"
      >
        <span className="text-sm font-medium">Search</span>
        <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
}