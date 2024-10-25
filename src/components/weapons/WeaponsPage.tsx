import { useState } from 'react';
import { Search, Filter, Sword, Target, Crosshair, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../ui/PageTransition';
import Breadcrumbs from '../ui/Breadcrumbs';

type WeaponType = 'primary' | 'secondary' | 'melee';

const MOCK_WEAPONS = [
  {
    id: 'soma-prime',
    name: 'Soma Prime',
    image: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80',
    description: 'High fire rate assault rifle with exceptional critical stats.',
    type: 'primary',
    stats: {
      damage: 12,
      criticalChance: 30,
      criticalMultiplier: 3.0,
      status: 20
    }
  },
  {
    id: 'lex-prime',
    name: 'Lex Prime',
    image: 'https://images.unsplash.com/photo-1584281722575-f5ab0e873054?auto=format&fit=crop&q=80',
    description: 'High damage semi-automatic pistol.',
    type: 'secondary',
    stats: {
      damage: 15,
      criticalChance: 25,
      criticalMultiplier: 2.0,
      status: 15
    }
  },
  {
    id: 'nikana-prime',
    name: 'Nikana Prime',
    image: 'https://images.unsplash.com/photo-1589225529399-8705282f98e5?auto=format&fit=crop&q=80',
    description: 'An elegant Prime katana with exceptional slash damage and critical potential.',
    type: 'melee',
    stats: {
      damage: 24,
      criticalChance: 28,
      criticalMultiplier: 2.8,
      status: 32
    }
  }
];

export default function WeaponsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<WeaponType>('primary');

  const filteredWeapons = MOCK_WEAPONS.filter(weapon => {
    const matchesSearch = weapon.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === weapon.type;
    return matchesSearch && matchesType;
  });

  return (
    <PageTransition>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Weapons' }
          ]}
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search weapons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedType('primary')}
              className={`btn-secondary flex items-center gap-2 ${
                selectedType === 'primary' ? 'bg-wf-dark-600' : ''
              }`}
            >
              <Target className="h-4 w-4" />
              Primary
            </button>
            <button
              onClick={() => setSelectedType('secondary')}
              className={`btn-secondary flex items-center gap-2 ${
                selectedType === 'secondary' ? 'bg-wf-dark-600' : ''
              }`}
            >
              <Crosshair className="h-4 w-4" />
              Secondary
            </button>
            <button
              onClick={() => setSelectedType('melee')}
              className={`btn-secondary flex items-center gap-2 ${
                selectedType === 'melee' ? 'bg-wf-dark-600' : ''
              }`}
            >
              <Sword className="h-4 w-4" />
              Melee
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWeapons.map((weapon) => (
            <Link
              key={weapon.id}
              to={`/weapons/${weapon.id}`}
              className="card group hover:border-wf-primary transition-colors"
            >
              <div className="relative aspect-video mb-4">
                <img
                  src={weapon.image}
                  alt={weapon.name}
                  className="rounded-lg object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
              </div>

              <h3 className="text-lg font-semibold mb-2 group-hover:text-wf-primary transition-colors">
                {weapon.name}
              </h3>
              <p className="text-sm text-gray-400 mb-4">{weapon.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-red-500" />
                  <span className="text-sm">{weapon.stats.damage} Damage</span>
                </div>
                <div className="flex items-center gap-2">
                  <Crosshair className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">{weapon.stats.criticalChance}% Crit</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">{weapon.stats.criticalMultiplier}x Multi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">{weapon.stats.status}% Status</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}