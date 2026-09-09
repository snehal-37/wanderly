import { useState } from 'react';
import { motion } from 'framer-motion';
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
    <motion.div
      className="w-full bg-ivory/95 backdrop-blur-md rounded-2xl md:rounded-full shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)] p-2.5 flex flex-col md:flex-row items-stretch md:items-center gap-2 text-ink border border-ink/5"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-3 px-4 py-2.5 md:border-r border-ink/10 flex-1">
        <MapPin className="text-clay w-4 h-4 shrink-0" />
        <div className="flex flex-col text-left w-full">
          <label htmlFor="search-destination" className="text-[10px] font-medium text-ink/40">
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
          <span className="text-[10px] font-medium text-ink/40">Dates</span>
          <span className="text-sm font-medium">Any dates</span>
        </div>
      </div>

      <div className="flex items-center gap-3 px-4 py-2.5 flex-1">
        <Users className="text-clay w-4 h-4 shrink-0" />
        <div className="flex flex-col text-left">
          <label htmlFor="travelers-count" className="text-[10px] font-medium text-ink/40">
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
        className="bg-ink hover:bg-pine text-ivory rounded-xl md:rounded-full p-3.5 md:p-4 flex items-center justify-center gap-2 px-6 transition-all duration-300 w-full md:w-auto shrink-0 hover:scale-[1.02] active:scale-[0.98]"
        aria-label="Search destinations"
      >
        <span className="text-sm font-medium">Search</span>
        <ArrowUpRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
