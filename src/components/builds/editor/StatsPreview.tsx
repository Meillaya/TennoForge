import { Shield, Heart, Zap } from 'lucide-react';
import { BuildData } from '../../../types/build';

interface StatsPreviewProps {
  buildData: BuildData;
}

export default function StatsPreview({ buildData }: StatsPreviewProps) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Stats Preview</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            <span className="text-gray-400">Health</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">100</span>
            <span className="text-green-500">+150%</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-500" />
            <span className="text-gray-400">Shield</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">100</span>
            <span className="text-green-500">+120%</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            <span className="text-gray-400">Power Strength</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">100%</span>
            <span className="text-green-500">+45%</span>
          </div>
        </div>
      </div>
    </div>
  );
}