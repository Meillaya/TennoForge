import { useState } from 'react';
import { Search, Filter, Plus, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import BuildCard from '../builds/BuildCard';
import { useAuthStore } from '../../stores/authStore';

const MOCK_BUILDS = [
  {
    id: '1',
    title: "Saryn Prime - Elite Sanctuary Build",
    author: "TennoMaster",
    votes: 1234,
    comments: 89,
    image: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?auto=format&fit=crop&q=80",
    tags: ["Endgame", "Solo"]
  },
  {
    id: '2',
    title: "Wisp - Support/DPS Hybrid",
    author: "VoidHunter",
    votes: 892,
    comments: 45,
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80",
    tags: ["Support", "Versatile"]
  }
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'featured' | 'trending' | 'recent'>('featured');
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-wf-dark-800 to-wf-dark-900 p-6 md:p-10">
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Discover the Best <span className="text-wf-primary">Warframe Builds</span>
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            Share, discover, and master the art of modding with the Warframe community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search builds..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 w-full"
              />
            </div>
            <Link to="/builds/new" className="btn-primary flex items-center gap-2 shrink-0">
              <Plus className="h-5 w-5" />
              Create Build
            </Link>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-wf-primary/10 to-transparent opacity-20" />
      </div>

      {/* Build Tabs */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between overflow-x-auto">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('featured')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'featured' ? 'bg-wf-dark-700 text-wf-primary' : 'text-gray-400 hover:text-white'
              }`}
            >
              Featured
            </button>
            <button
              onClick={() => setActiveTab('trending')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'trending' ? 'bg-wf-dark-700 text-wf-primary' : 'text-gray-400 hover:text-white'
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              Trending
            </button>
            <button
              onClick={() => setActiveTab('recent')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'recent' ? 'bg-wf-dark-700 text-wf-primary' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Clock className="h-4 w-4" />
              Recent
            </button>
          </div>
        </div>

        {/* Build Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_BUILDS.map((build) => (
            <BuildCard key={build.id} {...build} />
          ))}
        </div>
      </div>
    </div>
  );
}