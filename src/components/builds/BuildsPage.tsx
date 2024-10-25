import { useState } from 'react';
import { Search, Filter, Plus, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import BuildCard from './BuildCard';
import PageTransition from '../ui/PageTransition';
import Breadcrumbs from '../ui/Breadcrumbs';
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

export default function BuildsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'trending' | 'recent'>('trending');
  const { user } = useAuthStore();

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: 'Builds' }
            ]}
          />
          <Link to="/builds/new" className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            New Build
          </Link>
        </div>

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
          <button className="btn-secondary flex items-center gap-2 shrink-0">
            <Filter className="h-5 w-5" />
            Filters
          </button>
        </div>

        <div className="flex items-center gap-4 border-b border-wf-dark-600 overflow-x-auto">
          <button
            onClick={() => setActiveTab('trending')}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'trending'
                ? 'border-wf-primary text-wf-primary'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            Trending
          </button>
          <button
            onClick={() => setActiveTab('recent')}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'recent'
                ? 'border-wf-primary text-wf-primary'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Clock className="h-4 w-4" />
            Recent
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_BUILDS.map((build) => (
            <BuildCard key={build.id} {...build} />
          ))}
        </div>
      </div>
    </PageTransition>
  );
}