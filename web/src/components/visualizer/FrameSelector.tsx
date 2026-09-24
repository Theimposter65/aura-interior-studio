import React from 'react';
import { FrameOption, Product } from '../../types';
import { frameOptions } from '../../data/visualizerData';

interface FrameSelectorProps {
  selectedFrameId: string;
  onSelectFrame: (frameId: string) => void;
  scale: number;
  onScaleChange: (scale: number) => void;
  selectedArt: Product;
  onSelectArt: (artId: string) => void;
  wallArtList: Product[];
  selectedDimension: string;
  onSelectDimension: (dim: string) => void;
}

export const FrameSelector: React.FC<FrameSelectorProps> = ({
  selectedFrameId,
  onSelectFrame,
  scale,
  onScaleChange,
  selectedArt,
  onSelectArt,
  wallArtList,
  selectedDimension,
  onSelectDimension
}) => {
  const currentFrame = frameOptions.find(f => f.id === selectedFrameId) || frameOptions[0];

  return (
    <div className="space-y-6 bg-white p-6 rounded-sm border border-studio-200">
      {/* Artwork Switcher */}
      <div>
        <label className="text-xs uppercase tracking-widest font-semibold text-studio-900 block mb-3">
          3. Wall Art & Mural Piece
        </label>
        <div className="grid grid-cols-4 gap-2">
          {wallArtList.map(art => (
            <button
              key={art.id}
              onClick={() => onSelectArt(art.id)}
              className={`relative aspect-square rounded overflow-hidden border-2 transition-all ${
                selectedArt.id === art.id
                  ? 'border-studio-900 ring-2 ring-studio-900 scale-105 shadow-sm'
                  : 'border-transparent opacity-75 hover:opacity-100 hover:scale-102'
              }`}
              title={art.title}
            >
              <img src={art.image} alt={art.title} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
        <p className="font-serif text-sm text-studio-900 mt-2 font-medium">
          {selectedArt.title}
        </p>
      </div>

      {/* Frame Selection */}
      <div className="pt-4 border-t border-studio-100">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs uppercase tracking-widest font-semibold text-studio-900">
            4. Frame Profile
          </label>
          <span className="text-[11px] text-studio-500 font-mono">
            {currentFrame.name}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {frameOptions.map(frame => (
            <button
              key={frame.id}
              onClick={() => onSelectFrame(frame.id)}
              className={`text-left p-2.5 rounded border transition-all text-xs flex items-center space-x-2.5 ${
                selectedFrameId === frame.id
                  ? 'border-studio-900 bg-studio-50 font-medium'
                  : 'border-studio-200 hover:border-studio-400 bg-white text-studio-700'
              }`}
            >
              <span
                className="w-4 h-4 rounded-full border border-black/20 flex-shrink-0"
                style={{ backgroundColor: frame.finishColor }}
              />
              <span className="truncate">{frame.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Scale & Dimensions */}
      <div className="pt-4 border-t border-studio-100 space-y-4">
        {selectedArt.dimensions && selectedArt.dimensions.length > 0 && (
          <div>
            <label className="text-xs uppercase tracking-widest font-semibold text-studio-900 block mb-2">
              Dimensions
            </label>
            <div className="flex flex-wrap gap-2">
              {selectedArt.dimensions.map(dim => (
                <button
                  key={dim}
                  onClick={() => onSelectDimension(dim)}
                  className={`text-xs px-2.5 py-1 rounded border transition-all ${
                    selectedDimension === dim
                      ? 'bg-studio-900 text-white border-studio-900'
                      : 'bg-white text-studio-700 border-studio-200 hover:border-studio-400'
                  }`}
                >
                  {dim}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="flex justify-between items-center text-xs mb-2">
            <label className="uppercase tracking-widest font-semibold text-studio-900">
              Visual Scale:
            </label>
            <span className="font-mono text-studio-600">{Math.round(scale * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.75"
            max="1.25"
            step="0.05"
            value={scale}
            onChange={e => onScaleChange(parseFloat(e.target.value))}
            className="w-full accent-studio-900 cursor-pointer h-1.5 bg-studio-200 rounded-lg appearance-none"
          />
          <div className="flex justify-between text-[10px] text-studio-400 font-mono mt-1">
            <span>Subtle Accent (75%)</span>
            <span>Default (100%)</span>
            <span>Grand Statement (125%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
