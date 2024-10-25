import { useDrop } from 'react-dnd';
import { Mod, Polarity } from '../../../types/build';
import ModSlot from './ModSlot';

interface ModGridProps {
  mods: (Mod | null)[];
  polarities: (Polarity | null)[];
  capacity: {
    current: number;
    max: number;
  };
  onModsChange: (mods: (Mod | null)[]) => void;
  onPolaritiesChange: (polarities: (Polarity | null)[]) => void;
}

export default function ModGrid({
  mods,
  polarities,
  capacity,
  onModsChange,
  onPolaritiesChange
}: ModGridProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'mod',
    drop: (item: { mod: Mod; sourceIndex: number | null }, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }

      // Find the first empty slot
      const emptyIndex = mods.findIndex(mod => mod === null);
      if (emptyIndex === -1) {
        return;
      }

      // If the mod is coming from another slot, remove it from there
      if (item.sourceIndex !== null) {
        const newMods = [...mods];
        newMods[item.sourceIndex] = null;
        newMods[emptyIndex] = item.mod;
        onModsChange(newMods);
      } else {
        // If the mod is coming from the library, just add it
        const newMods = [...mods];
        newMods[emptyIndex] = item.mod;
        onModsChange(newMods);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true })
    })
  }));

  const handleModRemove = (index: number) => {
    const newMods = [...mods];
    newMods[index] = null;
    onModsChange(newMods);
  };

  const handlePolarityChange = (index: number, polarity: Polarity | null) => {
    const newPolarities = [...polarities];
    newPolarities[index] = polarity;
    onPolaritiesChange(newPolarities);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Mod Configuration</h3>
        <div className="text-sm">
          <span className={capacity.current > capacity.max ? 'text-red-500' : 'text-wf-primary'}>
            {capacity.current}
          </span>
          <span className="text-gray-400">/{capacity.max} Capacity</span>
        </div>
      </div>

      <div
        ref={drop}
        className={`grid grid-cols-4 gap-4 p-4 rounded-lg border-2 border-dashed
          ${isOver ? 'border-wf-primary/50 bg-wf-dark-700/50' : 'border-wf-dark-600'}
          transition-colors
        `}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <ModSlot
            key={index}
            index={index}
            mod={mods[index]}
            polarity={polarities[index]}
            onModRemove={() => handleModRemove(index)}
            onPolarityChange={(polarity) => handlePolarityChange(index, polarity)}
          />
        ))}
      </div>
    </div>
  );
}