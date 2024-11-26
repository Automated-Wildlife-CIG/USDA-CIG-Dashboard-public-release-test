import React from "react";
import MapViewSelector from "./MapViewSelector";
import ZoomMapToSelectedMarker from "./ZoomMapToSelectedMarker";

export default function MapControls() {
  return (
    <div className="flex flex-wrap justify-between">
      <MapViewSelector className="mr-3 gap-2" />
      <ZoomMapToSelectedMarker />
    </div>
  );
}
