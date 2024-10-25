import React from 'react';
import { Plus } from 'lucide-react';
import { Mod } from '../../types/build';

interface ModSlotProps {
  mod?: Mod;
  onClick: () => void;
  editable?: boolean;
}

export default function ModSlot({ mod, onClick, editable = false }: ModSlotProps) {
  return (
    <button
      onClick={onClick}
      disabled={!editable && !mod}
      className={`
        aspect-square rounded-lg border-2 p-2
        ${mod ? 'border-wf-primary bg-wf-dark-700' : 'border-wf-dark-600 bg-wf-dark-800'}
        ${editable ? 'hover:border-wf-primary/50 cursor-pointer' : 'cursor-default'}
        transition-all duration-200
      `}
    >
      {mod ? (
        <div className="w-full h-full relative">
          <img
            src={mod.image}
            alt={mod.name}
            className="w-full h-full object-cover rounded"
          />
          <div className="absolute bottom-0 right-0 bg-wf-dark-900/80 px-1 rounded text-xs">
            {mod.rank}/{mod.maxRank}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Plus className="h-6 w-6 text-gray-500" />
        </div>
      )}
    </button>
  );
}