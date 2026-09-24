import React from 'react';
import { RoomScene, WallColor } from '../../types';
import { roomScenes, wallColors } from '../../data/visualizerData';

interface RoomSelectorProps {
  selectedRoomId: string;
  onSelectRoom: (roomId: string) => void;
  selectedColorId: string;
  onSelectColor: (colorId: string) => void;
}

export const RoomSelector: React.FC<RoomSelectorProps> = ({
  selectedRoomId,
  onSelectRoom,
  selectedColorId,
  onSelectColor
}) => {
  const currentColor = wallColors.find(c => c.id === selectedColorId) || wallColors[0];

  return (
    <div className="space-y-6 bg-white p-6 rounded-sm border border-studio-200">
      {/* Room Environment Selection */}
      <div>
        <label className="text-xs uppercase tracking-widest font-semibold text-studio-900 block mb-3">
          1. Spatial Environment
        </label>
        <div className="grid grid-cols-2 gap-3">
          {roomScenes.map(room => (
            <button
              key={room.id}
              onClick={() => onSelectRoom(room.id)}
              className={`group text-left p-2 rounded border transition-all ${
                selectedRoomId === room.id
                  ? 'border-studio-900 bg-studio-50 shadow-sm ring-1 ring-studio-900'
                  : 'border-studio-200 hover:border-studio-400 bg-white'
              }`}
            >
              <div className="aspect-[16/10] w-full rounded overflow-hidden mb-2 bg-studio-200">
                <img
                  src={room.backgroundUrl}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-xs font-serif font-medium text-studio-900 truncate">
                {room.name}
              </p>
              <p className="text-[10px] text-studio-500 uppercase tracking-wider">
                {room.roomType}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Wall Pigment / Color Selection */}
      <div className="pt-4 border-t border-studio-100">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs uppercase tracking-widest font-semibold text-studio-900">
            2. Wall Mineral Pigment
          </label>
          <span className="text-[11px] font-mono text-studio-500 font-medium">
            {currentColor.name}
          </span>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {wallColors.map(color => (
            <button
              key={color.id}
              onClick={() => onSelectColor(color.id)}
              title={`${color.name} (${color.hex})`}
              className={`relative w-9 h-9 rounded-full transition-all flex items-center justify-center ${
                selectedColorId === color.id
                  ? 'ring-2 ring-offset-2 ring-studio-900 scale-110 shadow-sm'
                  : 'hover:scale-105 opacity-90 hover:opacity-100 border border-black/10'
              }`}
              style={{ backgroundColor: color.hex }}
            >
              {selectedColorId === color.id && (
                <span className={`w-1.5 h-1.5 rounded-full ${color.id === 'color-charcoal' ? 'bg-white' : 'bg-studio-900'}`} />
              )}
            </button>
          ))}
        </div>

        <p className="text-[11px] text-studio-500 mt-3 leading-relaxed bg-studio-50 p-2.5 rounded border border-studio-200/60">
          {currentColor.description}
        </p>
      </div>
    </div>
  );
};
