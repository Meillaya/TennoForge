import { Sword, Target, Shield, Rocket, Cpu } from 'lucide-react';
import { BuildType } from '../../../types/build';

interface BuildTypeSelectorProps {
  onSelect: (type: BuildType) => void;
}

const BUILD_TYPES = [
  {
    type: 'warframe',
    label: 'Warframe',
    icon: Shield,
    description: 'Create a Warframe build'
  },
  {
    type: 'primary',
    label: 'Primary Weapon',
    icon: Target,
    description: 'Create a primary weapon build'
  },
  {
    type: 'secondary',
    label: 'Secondary Weapon',
    icon: Target,
    description: 'Create a secondary weapon build'
  },
  {
    type: 'melee',
    label: 'Melee Weapon',
    icon: Sword,
    description: 'Create a melee weapon build'
  },
  {
    type: 'archwing',
    label: 'Archwing',
    icon: Rocket,
    description: 'Create an Archwing build'
  },
  {
    type: 'companion',
    label: 'Companion',
    icon: Cpu,
    description: 'Create a companion build'
  }
] as const;

export default function BuildTypeSelector({ onSelect }: BuildTypeSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {BUILD_TYPES.map(({ type, label, icon: Icon, description }) => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          className="card hover:border-wf-primary transition-all p-6 text-left"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-wf-dark-700">
              <Icon className="h-6 w-6 text-wf-primary" />
            </div>
            <h3 className="text-lg font-semibold">{label}</h3>
          </div>
          <p className="text-gray-400">{description}</p>
        </button>
      ))}
    </div>
  );
}