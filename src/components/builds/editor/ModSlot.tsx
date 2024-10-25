import { useState } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { X, Plus, ChevronDown } from 'lucide-react';
import { Mod, Polarity } from '../../../types/build';

interface ModSlotProps {
  index: number;
  mod: Mod | null;
  polarity: Polarity | null;
  onModRemove: () => void;
  onPolarityChange: (polarity: Polarity | null) => void;
}

const POLARITIES: Polarity[] = [
  'madurai',
  'vazarin',
  'naramon',
  'zenurik',
  'unairu',
  'penjaga',
  'umbra'
];

export default function ModSlot({
  index,
  mod,
  polarity,
  onModRemove,
  onPolarityChange
}: ModSlotProps) {
  const [showPolarityMenu, setShowPolarityMenu] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'mod',
    item: { mod, sourceIndex: index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'mod',
    drop: (item: { mod: Mod; sourceIndex: number | null }) => {
      if (item.sourceIndex === index) {
        return;
      }
      // Handle mod swap logic here
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }));

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`
        relative aspect-square rounded-lg border-2 cursor-pointer
        ${mod ? 'border-wf-primary bg-wf-dark-700' : 'border-wf-dark-600 bg-wf-dark-800'}
        ${isOver ? 'border-wf-primary/50' : ''}
        ${isDragging ? 'opacity-50' : ''}
        transition-all
      `}
    >
      {mod ? (
        <>
          <img
            src={mod.image}
            alt={mod.name}
            className="w-full h-full object-cover rounded-lg"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onModRemove();
            }}
            className="absolute top-1 right-1 p-1 rounded-full bg-wf-dark-900/80 hover:bg-red-500/80 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-1 right-1 bg-wf-dark-900/80 px-1 rounded text-xs">
            {mod.rank}/{mod.maxRank}
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <Plus className="h-6 w-6 text-gray-500" />
        </div>
      )}

      <div className="absolute top-1 left-1">
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowPolarityMenu(!showPolarityMenu);
            }}
            className="w-6 h-6 rounded bg-wf-dark-900/80 flex items-center justify-center group"
          >
            {polarity ? (
              <span className="text-wf-primary text-xs group-hover:opacity-75">
                {polarity[0].toUpperCase()}
              </span>
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-white" />
            )}
          </button>

          {showPolarityMenu && (
            <div className="absolute top-full left-0 mt-1 w-32 bg-wf-dark-800 rounded-lg border border-wf-dark-600 shadow-lg z-50">
              <div className="p-1">
                {POLARITIES.map((p) => (
                  <button
                    key={p}
                    onClick={(e) => {
                      e.stopPropagation();
                      onPolarityChange(p);
                      setShowPolarityMenu(false);
                    }}
                    className="w-full px-2 py-1 text-left text-sm rounded hover:bg-wf-dark-700 flex items-center space-x-2"
                  >
                    <span className="w-4 h-4 rounded bg-wf-dark-700 flex items-center justify-center">
                      <span className="text-wf-primary text-xs">{p[0].toUpperCase()}</span>
                    </span>
                    <span className="capitalize">{p}</span>
                  </button>
                ))}
                <div className="border-t border-wf-dark-600 my-1" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPolarityChange(null);
                    setShowPolarityMenu(false);
                  }}
                  className="w-full px-2 py-1 text-left text-sm rounded hover:bg-wf-dark-700 text-gray-400"
                >
                  Remove Polarity
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}