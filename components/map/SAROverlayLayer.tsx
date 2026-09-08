'use client';

import React from 'react';

interface SAROverlayLayerProps {
  visible?: boolean;
}

// SAR swath polygon overlays removed per user request (no dashed teal/cyan rectangles on basemap)
export const SAROverlayLayer: React.FC<SAROverlayLayerProps> = () => {
  return null;
};

export default SAROverlayLayer;
