'use client';

import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import { GOOGLE_MAPS_NAVY_STYLE } from './googleMapStyles';

interface GoogleMutantLayerProps {
  type?: 'roadmap' | 'satellite' | 'hybrid' | 'terrain';
  onLoaded?: () => void;
}

export const GoogleMutantLayer: React.FC<GoogleMutantLayerProps> = ({
  type = 'roadmap',
  onLoaded,
}) => {
  const map = useMap();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let mutantLayer: any = null;

    const rawKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
    const apiKey = rawKey === 'your_google_maps_api_key_here' ? '' : rawKey;

    const initGoogleMutant = async () => {
      try {
        if (!apiKey) return;

        // Ensure global window.L and L.GridLayer exist for Leaflet plugins
        if (typeof window !== 'undefined') {
          (window as any).L = L;
          (window as any).L.GridLayer = (window as any).L.GridLayer || L.GridLayer;
        }

        // Dynamically import Leaflet.GoogleMutant class from ESM source
        // @ts-ignore
        const mutantModule = await import('leaflet.gridlayer.googlemutant/src/Leaflet.GoogleMutant.mjs');
        const GoogleMutantClass = mutantModule.default || mutantModule;

        // Register on L.GridLayer and L.gridLayer
        if (typeof window !== 'undefined' && (window as any).L) {
          (window as any).L.GridLayer = (window as any).L.GridLayer || {};
          (window as any).L.GridLayer.GoogleMutant = GoogleMutantClass;
          if ((window as any).L.gridLayer) {
            (window as any).L.gridLayer.googleMutant = (opts: any) => new GoogleMutantClass(opts);
          }
        }

        // Load Google Maps JavaScript API via @googlemaps/js-api-loader
        setOptions({
          key: apiKey,
          v: 'weekly',
        });

        // Guard with loader's promise to ensure window.google.maps exists first
        const mapsLib: any = await importLibrary('maps');

        if (typeof window !== 'undefined' && (window as any).google?.maps) {
          (window as any).google.maps.Map = (window as any).google.maps.Map || mapsLib.Map;
          Object.assign((window as any).google.maps, mapsLib);
        }

        if (!isMounted) return;

        // Initialize GoogleMutant only after Google Maps script has loaded
        if (typeof window !== 'undefined' && (window as any).google?.maps) {
          mutantLayer = new GoogleMutantClass({
            type,
            styles: GOOGLE_MAPS_NAVY_STYLE,
            maxZoom: 20,
          });

          mutantLayer.addTo(map);
          setIsLoaded(true);
          onLoaded?.();
        }
      } catch (err) {
        console.warn('Google Maps Mutant standby mode:', err);
      }
    };

    initGoogleMutant();

    return () => {
      isMounted = false;
      if (mutantLayer && map) {
        try {
          map.removeLayer(mutantLayer);
        } catch {
          // ignore layer removal error on teardown
        }
      }
    };
  }, [map, type, onLoaded]);

  return null;
};

export default GoogleMutantLayer;
