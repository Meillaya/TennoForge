import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { BuildType, Mod } from '../../../types/build';

interface ModLibraryProps {
  buildType: BuildType;
  onModSelect: (mod: Mod) => void;
}

export default function ModLibrary({ buildType, onModSelect }: ModLibraryProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('all');
  const [mods, setMods] = useState<Mod[]>([]);

  useEffect(() => {
    // Fetch mods based on buildType
    // This will be replaced with actual API call
  }, [buildType]);

  return (
    <div className="card space-y-4">
      <h2 className="text-xl font-bold">Mod Library</h2>
      
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search mods..."
            className="input pl-10 w-full"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
              filter === 'all'
                ? 'bg-wf-primary text-white'
                : 'bg-wf-dark-700 text-gray-400 hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('damage')}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
              filter === 'damage'
                ? 'bg-wf-primary text-white'
                : 'bg-wf-dark-700 text-gray-400 hover:text-white'
            }`}
          >
            Damage
          </button>
          {/* Add more filter buttons */}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 max-h-[600px] overflow-y-auto">
        {mods.map((mod) => (
          <button
            key={mod.id}
            onClick={() => onModSelect(mod)}
            className="p-2 rounded bg-wf-dark-700 hover:bg-wf-dark-600 transition-colors text-left"
          >
            <div className="aspect-square rounded overflow-hidden mb-2">
              <img
                src={mod.image}
                alt={mod.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-sm font-medium truncate">{mod.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}