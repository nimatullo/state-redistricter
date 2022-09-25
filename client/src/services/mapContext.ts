import React from "react";

interface IMapContext {
    resetZoom: () => void;
}

const MapContext = React.createContext<IMapContext | null>(null);

export const MapProvider = MapContext.Provider;

export default MapContext;
