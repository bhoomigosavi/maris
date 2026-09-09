'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { OilSpill, Vessel, CoastalZone } from '@/types/maris';
import { SpillLayer } from './SpillLayer';
import { VesselLayer } from './VesselLayer';
import { TrajectoryLayer } from './TrajectoryLayer';
import { CoastalZoneLayer } from './CoastalZoneLayer';

interface MapInnerProps {
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

// Controller for programmatic panning/zooming & cursor telemetry
const MapController: React.FC<{
  onCursorMove: (lat: number, lng: number) => void;
  focusedCoordinates?: [number, number] | null;
}> = ({ onCursorMove, focusedCoordinates }) => {
  const map = useMap();

  useMapEvents({
    mousemove(e) {
      onCursorMove(e.latlng.lat, e.latlng.lng);
    },
  });

  useEffect(() => {
    if (focusedCoordinates) {
      map.flyTo(focusedCoordinates, Math.max(map.getZoom(), 8), {
        duration: 1.2,
      });
    }
  }, [focusedCoordinates, map]);

  return null;
};

export const MapInner: React.FC<MapInnerProps> = ({
  spills,
  vessels,
  selectedSpill,
  selectedVessel,
  onSelectZone,
  onSelectSpill,
  onSelectVessel,
  onCursorMove,
  showSlickPolygons,
  showVessels,
  showSARSwaths,
  showCoastalZones,
  simulationHour,
  focusedCoordinates,
}) => {
  // Center of Indian maritime territory (Arabian Sea, Bay of Bengal, Indian Ocean)
  const defaultCenter: [number, number] = [17.5, 78.0];
  const defaultZoom = 5;

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        minZoom={4}
        maxZoom={20}
        zoomControl={false}
        attributionControl={true}
        className="w-full h-full z-0"
      >
        {/* 
          Professional Black + Grey Geographic Atlas Basemap
          Crisp charcoal ocean, bright silver land, and clear geographic reference labels.
        */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          attribution="&copy; <a href=&quot;https://www.esri.com/&quot; target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot;>Esri</a> &mdash; Esri, DeLorme, NAVTEQ"
          maxZoom={16}
        />
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}"
          attribution="&copy; Esri, DeLorme, NAVTEQ"
          maxZoom={16}
        />

        <MapController
          onCursorMove={onCursorMove}
          focusedCoordinates={focusedCoordinates}
        />

        {/* Coastal Sensitive & Terminal Zones */}
        <CoastalZoneLayer visible={showCoastalZones} onSelectZone={onSelectZone} />

        {/* 48h Drift Trajectory Vectors */}
        <TrajectoryLayer spills={spills} simulationHour={simulationHour} />

        {/* Oil Spill Slicks & Pulse Markers */}
        <SpillLayer
          spills={spills}
          selectedSpill={selectedSpill}
          onSelectSpill={onSelectSpill}
          showSlickPolygons={showSlickPolygons}
        />

        {/* AIS Vessels & Coast Guard Ships */}
        {showVessels && (
          <VesselLayer
            vessels={vessels}
            selectedVessel={selectedVessel}
            onSelectVessel={onSelectVessel}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapInner;
