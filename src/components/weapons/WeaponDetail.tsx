import { useParams } from 'react-router-dom';
import { Target, Crosshair, Zap, Clock, MapPin } from 'lucide-react';
import Breadcrumbs from '../ui/Breadcrumbs';
import PageTransition from '../ui/PageTransition';
import ModGrid from '../builds/ModGrid';

const MOCK_WEAPON = {
  id: '1',
  name: 'Soma Prime',
  type: 'Primary',
  subtype: 'Rifle',
  description: 'A high-rate-of-fire assault rifle with exceptional critical stats.',
  image: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80',
  stats: {
    damage: {
      total: 12,
      impact: 3.6,
      puncture: 5.4,
      slash: 3.0
    },
    criticalChance: 30,
    criticalMultiplier: 3.0,
    status: 20,
    fireRate: 15.0,
    accuracy: 28.6,
    magazine: 200,
    reload: 2.4
  },
  polarities: ['madurai', 'naramon'],
  noise: 'Alarming',
  disposition: 3,
  drops: [
    {
      location: 'Void Relics - Neo S5',
      chance: '15%',
      type: 'Blueprint'
    },
    {
      location: 'Void Relics - Axi S3',
      chance: '10%',
      type: 'Barrel'
    }
  ]
};

export default function WeaponDetail() {
  const { id } = useParams();
  const weapon = MOCK_WEAPON; // Replace with API call using id

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Weapons', href: '/weapons' },
            { label: weapon.type, href: `/weapons?type=${weapon.type.toLowerCase()}` },
            { label: weapon.name }
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card">
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <img
                  src={weapon.image}
                  alt={weapon.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h1 className="text-2xl font-bold mb-2">{weapon.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-1 text-sm font-medium bg-wf-dark-700 text-wf-primary rounded">
                  {weapon.subtype}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-red-500" />
                    <span className="text-gray-400">Total Damage</span>
                  </div>
                  <span className="font-medium">{weapon.stats.damage.total}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Crosshair className="h-5 w-5 text-yellow-500" />
                    <span className="text-gray-400">Critical Chance</span>
                  </div>
                  <span className="font-medium">{weapon.stats.criticalChance}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-400">Status Chance</span>
                  </div>
                  <span className="font-medium">{weapon.stats.status}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-green-500" />
                    <span className="text-gray-400">Fire Rate</span>
                  </div>
                  <span className="font-medium">{weapon.stats.fireRate}</span>
                </div>
              </div>
            </div>

            {/* Farming Locations */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Farming Locations</h2>
              <div className="space-y-4">
                {weapon.drops.map((drop, index) => (
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
            {/* Description & Stats */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Overview</h2>
              <p className="text-gray-300 mb-6">{weapon.description}</p>

              <h3 className="text-lg font-semibold mb-4">Detailed Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-gray-400 block mb-1">Impact</span>
                  <span className="font-medium">{weapon.stats.damage.impact}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">Puncture</span>
                  <span className="font-medium">{weapon.stats.damage.puncture}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">Slash</span>
                  <span className="font-medium">{weapon.stats.damage.slash}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">Accuracy</span>
                  <span className="font-medium">{weapon.stats.accuracy}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">Magazine</span>
                  <span className="font-medium">{weapon.stats.magazine}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">Reload Time</span>
                  <span className="font-medium">{weapon.stats.reload}s</span>
                </div>
              </div>
            </div>

            {/* Mod Compatibility */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Mod Compatibility</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {weapon.polarities.map((polarity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-wf-dark-700 flex items-center justify-center">
                      <span className="text-wf-primary">{polarity[0].toUpperCase()}</span>
                    </div>
                    <span className="capitalize">{polarity}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div>
                  <span className="text-gray-400 block mb-1">Riven Disposition</span>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < weapon.disposition ? 'bg-wf-primary' : 'bg-wf-dark-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">Noise Level</span>
                  <span className="font-medium">{weapon.noise}</span>
                </div>
              </div>
              <ModGrid build={{ ...weapon, mods: [] }} />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}