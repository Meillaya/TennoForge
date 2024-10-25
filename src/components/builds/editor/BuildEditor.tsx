import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Share2, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import BuildTypeSelector from './BuildTypeSelector';
import ModLibrary from './ModLibrary';
import ModGrid from './ModGrid';
import StatsPreview from './StatsPreview';
import DescriptionEditor from './DescriptionEditor';
import { BuildType, BuildData } from '../../../types/build';
import Breadcrumbs from '../../ui/Breadcrumbs';
import PageTransition from '../../ui/PageTransition';

export default function BuildEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [buildType, setBuildType] = useState<BuildType | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [buildData, setBuildData] = useState<BuildData>({
    title: '',
    description: '',
    mods: [],
    forma: 0,
    polarities: [],
    capacity: { current: 0, max: 60 }
  });

  const handleSave = async () => {
    try {
      // API implementation will go here
      console.log('Saving build:', buildData);
    } catch (error) {
      console.error('Failed to save build:', error);
    }
  };

  const handleShare = () => {
    // Implement sharing functionality
  };

  if (!buildType) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-6 space-y-6">
          <Breadcrumbs
            items={[
              { label: 'Builds', href: '/builds' },
              { label: 'New Build' }
            ]}
          />
          <BuildTypeSelector onSelect={setBuildType} />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: 'Builds', href: '/builds' },
              { label: 'New Build' }
            ]}
          />
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="btn-secondary"
            >
              {showPreview ? (
                <><EyeOff className="h-4 w-4 mr-2" /> Hide Preview</>
              ) : (
                <><Eye className="h-4 w-4 mr-2" /> Show Preview</>
              )}
            </button>
            <button
              onClick={handleShare}
              className="btn-secondary"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
            <button
              onClick={handleSave}
              className="btn-primary"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mod Library */}
          <div className="lg:col-span-1">
            <ModLibrary
              buildType={buildType}
              onModSelect={(mod) => {
                // Implement mod selection logic
              }}
            />
          </div>

          {/* Build Configuration */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <input
                type="text"
                value={buildData.title}
                onChange={(e) => setBuildData({ ...buildData, title: e.target.value })}
                placeholder="Build Title"
                className="input w-full text-xl font-bold mb-4"
              />

              <ModGrid
                mods={buildData.mods}
                polarities={buildData.polarities}
                capacity={buildData.capacity}
                onModsChange={(mods) => setBuildData({ ...buildData, mods })}
                onPolaritiesChange={(polarities) => setBuildData({ ...buildData, polarities })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StatsPreview buildData={buildData} />
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Forma Configuration</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setBuildData({ ...buildData, forma: Math.max(0, buildData.forma - 1) })}
                    className="btn-secondary p-2"
                  >
                    -
                  </button>
                  <span className="font-medium">{buildData.forma} Forma</span>
                  <button
                    onClick={() => setBuildData({ ...buildData, forma: buildData.forma + 1 })}
                    className="btn-secondary p-2"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <DescriptionEditor
              value={buildData.description}
              onChange={(description) => setBuildData({ ...buildData, description })}
              preview={showPreview}
            />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}