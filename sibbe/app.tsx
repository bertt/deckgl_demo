import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Map} from 'react-map-gl/maplibre';
import DeckGL from '@deck.gl/react';
import {Tile3DLayer} from '@deck.gl/geo-layers';
import {TerrainLayer, TerrainLayerProps} from '@deck.gl/geo-layers';

import type {MapViewState} from '@deck.gl/core';

// const maptilerkey = 'NEeAOMvTyhTAwYbN30uo';
const MAPBOX_TOKEN  = `pk.eyJ1IjoiYmVydHRlbW1lIiwiYSI6ImNtMXl5OWtqdDAxNXkya3Nkc2ZmNGd6N2kifQ.6LmbPHeqaga7KFwa8frfnA`;
const TILESET_URL = `https://geodan.github.io/pg2b3dm/sample_data/3dbag/sibbe/1.0/tileset.json`;
const INITIAL_VIEW_STATE: MapViewState = {
  latitude: 50.843332,
  longitude: 5.825286,
  pitch: 45,
  maxPitch: 60,
  bearing: 0,
  minZoom: 2,
  maxZoom: 30,
  zoom: 17
};

const TERRAIN_IMAGE = `https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.png?access_token=${MAPBOX_TOKEN}`;
const SURFACE_IMAGE = `https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.png?access_token=${MAPBOX_TOKEN}`;

const ELEVATION_DECODER: TerrainLayerProps['elevationDecoder'] = {
  rScaler: 6553.6,
  gScaler: 25.6,
  bScaler: 0.1,
  offset: -10000 + 44
};

export default function App({
  texture = SURFACE_IMAGE,
  wireframe = false,
  initialViewState = INITIAL_VIEW_STATE
}: {
  texture?: string;
  wireframe?: boolean;
  initialViewState?: MapViewState;
}) {
  const layer = new TerrainLayer({
    id: 'terrain',
    minZoom: 0,
    maxZoom: 23,
    strategy: 'no-overlap',
    elevationDecoder: ELEVATION_DECODER,
    elevationData: TERRAIN_IMAGE,
    texture,
    wireframe,
    color: [255, 255, 255]
  });

  const tile3DLayer = new Tile3DLayer({
    id: 'tile-3d-layer',
    pointSize: 2,
    data: TILESET_URL
  });

  return <DeckGL initialViewState={initialViewState} controller={true} layers={[tile3DLayer,layer]} />;
}

export function renderToDOM(container: HTMLDivElement) {
  createRoot(container).render(<App />);
}
