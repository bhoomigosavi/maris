// MARIS Official Maritime Navy Basemap Style
// Authoritative, dignified hydrographic palette with zero neon colors

export const GOOGLE_MAPS_NAVY_STYLE: google.maps.MapTypeStyle[] = [
  {
    // Global fallback geometry
    elementType: 'geometry',
    stylers: [{ color: '#152238' }],
  },
  {
    // Global label styling - clean maritime slate with crisp navy stroke
    elementType: 'labels.text.fill',
    stylers: [{ color: '#8ea7cc' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#0b1626' }, { weight: 2 }],
  },
  {
    // Water bodies: deep, rich maritime navy
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#0b1626' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#4a6288' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#07101c' }, { weight: 2 }],
  },
  {
    // Landmass & topography: coastal navy-slate
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#152238' }],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [{ color: '#142036' }],
  },
  {
    // Coastlines & administrative boundaries: clean steel navy
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#2b3f5c' }],
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#3d567d' }, { weight: 1.2 }],
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#20314a' }],
  },
  {
    // Subdued, low-contrast roadways (non-distracting for nautical monitoring)
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ visibility: 'simplified' }, { color: '#1c2c47' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#596e8d' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#101c2e' }],
  },
  {
    // Eliminate all commercial POIs & transit clutter
    featureType: 'poi',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'transit',
    stylers: [{ visibility: 'off' }],
  },
];

// Alias for backwards compatibility
export const GOOGLE_MAPS_DARK_STYLE = GOOGLE_MAPS_NAVY_STYLE;
