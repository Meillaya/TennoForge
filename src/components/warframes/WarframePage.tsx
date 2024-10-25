import { useState } from 'react';
import { Search, Filter, Shield, Heart, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../ui/PageTransition';
import Breadcrumbs from '../ui/Breadcrumbs';

const MOCK_WARFRAMES = [
  {
    id: 'excalibur',
    name: 'Excalibur',
    image: 'https://images.unsplash.com/photo-1599693596422-3c3f82a75516?auto=format&fit=crop&q=80',
    description: 'A balanced warframe perfect for new players.',
    stats: {
      health: 100,
      shield: 100,
      armor: 225,
      energy: 100
    },
    type: 'base'
  },
  {
    id: 'excalibur-prime',
    name: 'Excalibur Prime',
    image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?auto=format&fit=crop&q=80',
    description: 'The prime variant of Excalibur with enhanced stats.',
    stats: {
      health: 125,
      shield: 125,
      armor: 275,
      energy: 125
    },
    type: 'prime'
  }
];

export default function WarframePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'prime' | 'base'>('all');

  const filteredWarframes = MOCK_WARFRAMES.filter(warframe => {
    const matchesSearch = warframe.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || warframe.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <PageTransition>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Warframes' }
          ]}
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search warframes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`btn-secondary ${selectedFilter === 'all' ? 'bg-wf-dark-600' : ''}`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedFilter('prime')}
              className={`btn-secondary ${selectedFilter === 'prime' ? 'bg-wf-dark-600' : ''}`}
            >
              Prime
            </button>
            <button
              onClick={() => setSelectedFilter('base')}
              className={`btn-secondary ${selectedFilter === 'base' ? 'bg-wf-dark-600' : ''}`}
            >
              Base
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWarframes.map((warframe) => (
            <Link
              key={warframe.id}
              to={`/warframes/${warframe.id}`}
              className="card group hover:border-wf-primary transition-colors"
            >
              <div className="relative aspect-video mb-4">
                <img
                  src={warframe.image}
                  alt={warframe.name}
                  className="rounded-lg object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                {warframe.type === 'prime' && (
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-wf-primary/90 rounded text-xs font-medium">
                      Prime
                    </span>
                  </div>
                )}
              </div>

              <h3 className="text-lg font-semibold mb-2 group-hover:text-wf-primary transition-colors">
                {warframe.name}
              </h3>
              <p className="text-sm text-gray-400 mb-4">{warframe.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-sm">{warframe.stats.health}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">{warframe.stats.shield}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">{warframe.stats.armor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">{warframe.stats.energy}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}