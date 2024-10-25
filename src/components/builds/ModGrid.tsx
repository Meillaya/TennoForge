import React from 'react';
import { Plus } from 'lucide-react';
import { Build, Mod } from '../../types/build';
import ModSlot from './ModSlot';

interface ModGridProps {
  build: Build;
  editable?: boolean;
}

export default function ModGrid({ build, editable = false }: ModGridProps) {
  const handleModSelect = (slot: number) => {
    if (!editable) return;
    // Will implement mod selection modal
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-6">Mod Configuration</h2>
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ModSlot
            key={index}
            mod={build.mods[index]}
            onClick={() => handleModSelect(index)}
            editable={editable}
          />
        ))}
      </div>
    </div>
  );
}