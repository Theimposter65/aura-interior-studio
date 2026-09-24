import React, { useState, useMemo } from 'react';
import { Sparkles, ShoppingBag, Sun, Moon, RotateCcw, Check, Maximize2, Sliders } from 'lucide-react';
import { Product, RoomScene, WallColor, FrameOption } from '../../types';
import { products } from '../../data/products';
import { roomScenes, wallColors, frameOptions } from '../../data/visualizerData';
import { RoomSelector } from './RoomSelector';
import { FrameSelector } from './FrameSelector';
import { useCart } from '../../context/CartContext';

interface WallVisualizerProps {
  initialProductId?: string;
}

export const WallVisualizer: React.FC<WallVisualizerProps> = ({ initialProductId }) => {
  const { addToCart } = useCart();

  // Filter to wall designs
  const wallArtList = useMemo(() => products.filter(p => p.category === 'wall-designs'), []);
  const defaultArt = initialProductId
    ? wallArtList.find(p => p.id === initialProductId) || wallArtList[0]
    : wallArtList[0];

  const [selectedRoomId, setSelectedRoomId] = useState<string>(roomScenes[0].id);
  const [selectedColorId, setSelectedColorId] = useState<string>(wallColors[0].id);
  const [selectedFrameId, setSelectedFrameId] = useState<string>(frameOptions[0].id);
  const [selectedArtId, setSelectedArtId] = useState<string>(defaultArt.id);
  const [artScale, setArtScale] = useState<number>(1.0);
  const [lightingMode, setLightingMode] = useState<'daylight' | 'twilight'>('daylight');
  const [isAdded, setIsAdded] = useState(false);

  // Active object references
  const currentRoom = roomScenes.find(r => r.id === selectedRoomId) || roomScenes[0];
  const currentColor = wallColors.find(c => c.id === selectedColorId) || wallColors[0];
  const currentFrame = frameOptions.find(f => f.id === selectedFrameId) || frameOptions[0];
  const currentArt = wallArtList.find(a => a.id === selectedArtId) || wallArtList[0];

  const [selectedDimension, setSelectedDimension] = useState<string>(
    currentArt.dimensions?.[0] || '120x80 cm'
  );

  const handleAddConfiguredToCart = () => {
    addToCart(currentArt, {
      dimension: selectedDimension,
      frame: currentFrame.name,
      quantity: 1
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleReset = () => {
    setSelectedRoomId(roomScenes[0].id);
    setSelectedColorId(wallColors[0].id);
    setSelectedFrameId(frameOptions[0].id);
    setArtScale(1.0);
    setLightingMode('daylight');
  };

  return (
    <section id="visualizer" className="py-24 bg-studio-100/60 border-y border-studio-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center space-x-2">
              <span className="p-1 bg-studio-200 text-studio-900 rounded">
                <Sparkles className="w-3.5 h-3.5 text-studio-700" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-studio-500 font-semibold">
                Interactive Room Preview
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-studio-900 font-normal leading-tight">
              Room & Wall Art Visualizer
            </h2>
            <p className="text-xs sm:text-sm text-studio-600 leading-relaxed">
              Preview our hand-painted canvases and bespoke wall murals in realistic room settings, testing wall paint colors and frame mouldings before commissioning your artwork.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            {/* Lighting Toggle */}
            <button
              onClick={() => setLightingMode(lightingMode === 'daylight' ? 'twilight' : 'daylight')}
              className="px-3.5 py-2 bg-white border border-studio-200 rounded-full text-xs font-medium text-studio-700 hover:text-studio-950 flex items-center space-x-2 shadow-sm transition-colors"
            >
              {lightingMode === 'daylight' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Daylight Exposure</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Ambient Twilight</span>
                </>
              )}
            </button>

            {/* Reset Defaults */}
            <button
              onClick={handleReset}
              className="p-2 bg-white border border-studio-200 rounded-full text-studio-500 hover:text-studio-900 transition-colors shadow-sm"
              title="Reset Visualizer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Visualizer Workbench Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual Stage (Left / Center) */}
          <div className="lg:col-span-8 flex flex-col space-y-4">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/10] bg-studio-900 rounded-sm overflow-hidden shadow-2xl border border-studio-300">
              {/* Layer 1: Background Room Photograph */}
              <img
                src={currentRoom.backgroundUrl}
                alt={currentRoom.name}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  lightingMode === 'twilight' ? 'brightness-75 contrast-105' : 'brightness-100'
                }`}
              />

              {/* Layer 2: Wall Pigment Tint Overlay (Organic Multiplying Layer) */}
              <div
                className="absolute inset-0 pointer-events-none transition-colors duration-700 mix-blend-multiply"
                style={{
                  backgroundColor: currentColor.hex,
                  opacity: lightingMode === 'twilight' ? 0.35 : 0.25
                }}
              />

              {/* Layer 3: Twilight Ambience Shading */}
              {lightingMode === 'twilight' && (
                <div className="absolute inset-0 bg-indigo-950/20 mix-blend-overlay pointer-events-none transition-opacity duration-700" />
              )}

              {/* Layer 4: Mounted Framed Artwork Stage */}
              <div
                className="absolute transition-all duration-500 ease-out flex items-center justify-center pointer-events-none"
                style={{
                  top: currentRoom.artPlacement.top,
                  left: currentRoom.artPlacement.left,
                  width: currentRoom.artPlacement.maxWidth,
                  transform: `scale(${artScale})`,
                  transformOrigin: 'center center'
                }}
              >
                <div
                  className={`relative w-full overflow-hidden transition-all duration-300 pointer-events-auto shadow-2xl ${currentFrame.styleClass}`}
                  style={{
                    aspectRatio: currentArt.dimensions?.[0]?.includes('Panels') ? '16/9' : '4/3'
                  }}
                >
                  <img
                    src={currentArt.image}
                    alt={currentArt.title}
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                  {/* Subtle glass reflection highlight */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none opacity-60" />
                </div>
              </div>

              {/* Stage Architectural HUD Specs */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-[11px] bg-studio-950/70 backdrop-blur-md px-4 py-2.5 rounded border border-white/10 tracking-wider">
                <div className="flex items-center space-x-3 truncate">
                  <span className="font-semibold truncate">{currentRoom.name}</span>
                  <span className="opacity-40">•</span>
                  <span className="flex items-center space-x-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-white/30"
                      style={{ backgroundColor: currentColor.hex }}
                    />
                    <span>{currentColor.name}</span>
                  </span>
                  <span className="opacity-40">•</span>
                  <span className="hidden sm:inline text-studio-300">{currentFrame.name}</span>
                </div>

                <div className="text-right flex-shrink-0 font-mono text-studio-300">
                  {selectedDimension}
                </div>
              </div>
            </div>

            {/* Bottom Primary Action Bar */}
            <div className="bg-white p-5 rounded-sm border border-studio-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-studio-400 block font-semibold">
                  Selected Configuration
                </span>
                <h4 className="font-serif text-xl text-studio-900 font-normal">
                  {currentArt.title} <span className="text-studio-500 text-sm font-sans">with {currentFrame.name}</span>
                </h4>
                <p className="text-xs text-studio-500 mt-0.5">
                  Dimensions: {selectedDimension} • Handcrafted Archival Specification
                </p>
              </div>

              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <div className="text-right hidden sm:block">
                  <span className="text-[10px] uppercase tracking-wider text-studio-400 block">Acquisition</span>
                  <span className="font-serif text-2xl font-semibold text-studio-900">${currentArt.price} USD</span>
                </div>

                <button
                  onClick={handleAddConfiguredToCart}
                  className="w-full sm:w-auto py-3.5 px-8 bg-studio-900 hover:bg-studio-800 text-white text-xs uppercase tracking-widest font-semibold rounded-sm shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isAdded ? 'Composition Added ✓' : 'Add Composition to Bag'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Control Panels (2 Columns Stacked) */}
          <div className="lg:col-span-4 space-y-6">
            <RoomSelector
              selectedRoomId={selectedRoomId}
              onSelectRoom={setSelectedRoomId}
              selectedColorId={selectedColorId}
              onSelectColor={setSelectedColorId}
            />

            <FrameSelector
              selectedFrameId={selectedFrameId}
              onSelectFrame={setSelectedFrameId}
              scale={artScale}
              onScaleChange={setArtScale}
              selectedArt={currentArt}
              onSelectArt={setSelectedArtId}
              wallArtList={wallArtList}
              selectedDimension={selectedDimension}
              onSelectDimension={setSelectedDimension}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
