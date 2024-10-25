import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ThumbsUp, MessageSquare, Share2, User, Calendar } from 'lucide-react';
import ModGrid from './ModGrid';
import CommentSection from './CommentSection';
import { Build } from '../../types/build';
import LoadingSpinner from '../ui/LoadingSpinner';

// Mock data store
const MOCK_BUILDS: Record<string, Build> = {
  '1': {
    id: '1',
    title: 'Saryn Prime - Elite Sanctuary Solo Build',
    description: 'Optimized for Elite Sanctuary Onslaught solo runs. Focus on spreading spores and maintaining high damage output.',
    author: {
      id: '1',
      username: 'TennoMaster',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80'
    },
    warframe: {
      id: 'saryn-prime',
      name: 'Saryn Prime',
      image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?auto=format&fit=crop&q=80',
      description: 'Master of toxins and decay',
      health: 300,
      shield: 300,
      armor: 300,
      energy: 300,
      abilities: []
    },
    mods: [],
    forma: 5,
    votes: 1234,
    comments: 89,
    createdAt: '2024-02-28T12:00:00Z',
    updatedAt: '2024-02-28T12:00:00Z',
    tags: ['Endgame', 'Solo', 'Elite'],
    status: 'published',
    views: 5000,
    favorites: 420
  },
  '2': {
    id: '2',
    title: 'Wisp - Support/DPS Hybrid',
    description: 'A versatile Wisp build that balances support capabilities with strong damage output.',
    author: {
      id: '2',
      username: 'VoidHunter',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80'
    },
    warframe: {
      id: 'wisp',
      name: 'Wisp',
      image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80',
      description: 'Ethereal manipulator of light and air',
      health: 300,
      shield: 300,
      armor: 300,
      energy: 300,
      abilities: []
    },
    mods: [],
    forma: 3,
    votes: 892,
    comments: 45,
    createdAt: '2024-02-27T15:30:00Z',
    updatedAt: '2024-02-27T15:30:00Z',
    tags: ['Support', 'Versatile'],
    status: 'published',
    views: 3000,
    favorites: 280
  }
};

export default function BuildDetail() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulate API call with mock data
  const build = id ? MOCK_BUILDS[id] : null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !build) {
    return (
      <div className="card text-center py-12">
        <h2 className="text-xl font-bold text-gray-300 mb-4">
          {error || 'Build not found'}
        </h2>
        <p className="text-gray-400">
          The build you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-100 mb-2">{build.title}</h1>
                <div className="flex flex-wrap gap-2">
                  {build.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs font-medium bg-wf-dark-700 text-wf-primary rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="btn-secondary flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
              </div>
            </div>

            <p className="text-gray-300 mb-6">{build.description}</p>

            <div className="flex items-center justify-between text-sm text-gray-400 border-t border-wf-dark-600 pt-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{build.author.username}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(build.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 hover:text-wf-primary transition-colors">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{build.votes}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-wf-primary transition-colors">
                  <MessageSquare className="h-4 w-4" />
                  <span>{build.comments}</span>
                </button>
              </div>
            </div>
          </div>

          <ModGrid build={build} />
          <CommentSection buildId={build.id} />
        </div>

        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <h2 className="text-xl font-bold mb-4">Build Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Forma Required</span>
                <span className="text-wf-primary font-semibold">{build.forma}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Capacity</span>
                <span className="text-wf-primary font-semibold">74/74</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Polarity Slots</span>
                <span className="text-wf-primary font-semibold">8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}