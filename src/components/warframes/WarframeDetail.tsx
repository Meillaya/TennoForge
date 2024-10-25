import { useParams } from 'react-router-dom';
import { Shield, Heart, Zap, Target, Clock, MapPin } from 'lucide-react';
import Breadcrumbs from '../ui/Breadcrumbs';
import PageTransition from '../ui/PageTransition';
import ModGrid from '../builds/ModGrid';

const MOCK_WARFRAME = {
  id: '1',
  name: 'Excalibur Prime',
  description: 'The original Warframe, perfect for new and veteran players alike.',
  image: 'https://images.unsplash.com/photo-1599693596422-3c3f82a75516?auto=format&fit=crop&q=80',
  lore: 'A noble warrior of the Orokin era, Excalibur Prime represents the pinnacle of Warframe engineering.',
  stats: {
    health: 450,
    shield: 300,
    armor: 225,
    energy: 150,
    sprintSpeed: 1.0
  },
  abilities: [
    {
      name: 'Slash Dash',
      description: 'Excalibur charges forward and cuts down enemies in his path.',
      image: 'https://images.unsplash.com/photo-1589223557946-1a938c9d1559?auto=format&fit=crop&q=80'
    },
    {
      name: 'Radial Blind',
      description: 'Emits a bright flash of light, blinding all enemies who witness it.',
      image: 'https://images.unsplash.com/photo-1589223557946-1a938c9d1559?auto=format&fit=crop&q=80'
    }
  ],
  polarities: ['madurai', 'vazarin', 'naramon'],
  drops: [
    {
      location: 'Void Relics - Lith E1',
      chance: '15%',
      type: 'Blueprint'
    },
    {
      location: 'Void Relics - Meso E2',
      chance: '10%',
      type: 'Systems'
    }
  ]
};

export default function WarframeDetail() {
  const { id } = useParams();
  const warframe = MOCK_WARFRAME; // Replace with API call using id

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Warframes', href: '/warframes' },
            { label: warframe.name }
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card">
              <div className="aspect-square rounded-lg overflow-hidden mb-4">
                <img
                  src={warframe.image}
                  alt={warframe.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h1 className="text-2xl font-bold mb-4">{warframe.name}</h1>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    <span className="text-gray-400">Health</span>
                  </div>
                  <span className="font-medium">{warframe.stats.health}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-400">Shield</span>
                  </div>
                  <span className="font-medium">{warframe.stats.shield}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-yellow-500" />
                    <span className="text-gray-400">Armor</span>
                  </div>
                  <span className="font-medium">{warframe.stats.armor}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-purple-500" />
                    <span className="text-gray-400">Energy</span>
                  </div>
                  <span className="font-medium">{warframe.stats.energy}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-green-500" />
                    <span className="text-gray-400">Sprint Speed</span>
                  </div>
                  <span className="font-medium">{warframe.stats.sprintSpeed}</span>
                </div>
              </div>
            </div>

            {/* Farming Locations */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Farming Locations</h2>
              <div className="space-y-4">
                {warframe.drops.map((drop, index) => (
                  <div key={index} className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="h-4 w-4 text-wf-primary" />
                        <span className="font-medium">{drop.location}</span>
                      </div>
                      <span className="text-sm text-gray-400">{drop.type}</span>
                    </div>
                    <span className="text-wf-primary font-medium">{drop.chance}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description & Lore */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Overview</h2>
              <p className="text-gray-300 mb-6">{warframe.description}</p>
              <h3 className="text-lg font-semibold mb-2">Lore</h3>
              <p className="text-gray-300">{warframe.lore}</p>
            </div>

            {/* Abilities */}
            <div className="card">
              <h2 className="text-xl font-bold mb-6">Abilities</h2>
              <div className="grid gap-6">
                {warframe.abilities.map((ability, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={ability.image}
                        alt={ability.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{ability.name}</h3>
                      <p className="text-gray-300">{ability.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mod Compatibility */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Mod Compatibility</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {warframe.polarities.map((polarity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-wf-dark-700 flex items-center justify-center">
                      {/* Replace with actual polarity icons */}
                      <span className="text-wf-primary">{polarity[0].toUpperCase()}</span>
                    </div>
                    <span className="capitalize">{polarity}</span>
                  </div>
                ))}
              </div>
              <ModGrid build={{ ...warframe, mods: [] }} />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}