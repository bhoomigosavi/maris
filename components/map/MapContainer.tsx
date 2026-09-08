'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { OilSpill, Vessel, CoastalZone } from '@/types/maris';
import { Loader2 } from 'lucide-react';

const DynamicMap = dynamic(() => import('./MapInner'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0b1626] text-primary gap-4">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-2 border-primary/20 animate-ping absolute" />
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
      <div className="text-xs font-mono tracking-widest uppercase text-on-surface-variant">
        Initializing MARIS Ocean Cartography...
      </div>
    </div>
  ),
});

interface InteractiveMapProps {
  spills: OilSpill[];
  vessels: Vessel[];
  selectedSpill: OilSpill | null;
  selectedVessel: Vessel | null;
  onSelectSpill: (spill: OilSpill) => void;
  onSelectVessel: (vessel: Vessel) => void;
  onSelectZone?: (zone: CoastalZone) => void;
  onCursorMove: (lat: number, lng: number) => void;
  showSlickPolygons: boolean;
  showVessels: boolean;
  showSARSwaths?: boolean;
  showCoastalZones: boolean;
  simulationHour: number;
  focusedCoordinates?: [number, number] | null;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = (props) => {
  return (
    <div className="fixed inset-0 w-screen h-screen z-0 overflow-hidden bg-[#0b1626]">
      {/* Dynamic Leaflet Map Component (Full Viewport 100vw x 100vh) */}
      <DynamicMap {...props} />

      {/* Layer 1: Soft Maritime Edge Vignette */}
      <div className="fixed inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(11,22,38,0.25)_80%,rgba(7,14,24,0.65)_100%)]" />
    </div>
  );
};

export default InteractiveMap;
