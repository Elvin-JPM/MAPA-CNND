import React from "react";
import { Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-polylinedecorator";

const DemandStaticArrow = ({
  initialCoordinate,
  finalCoordinate,
  color = "black",
}) => {
  const map = useMap();

  React.useEffect(() => {
    if (!initialCoordinate || !finalCoordinate) return;

    const line = L.polyline([initialCoordinate, finalCoordinate], {
      color,
      weight: 2.3,
    }).addTo(map);

    // Add arrowhead

    L.polylineDecorator(line, {
      patterns: [
        {
          offset: "100%", // place at the end
          repeat: 0,
          symbol: L.Symbol.arrowHead({
            pixelSize: 12,
            polygon: true,
            pathOptions: { fillOpacity: 1, weight: 1, color },
          }),
        },
      ],
    }).addTo(map);

    return () => {
      map.removeLayer(line);
    };
  }, [map, initialCoordinate, finalCoordinate, color]);

  return null; // handled manually with Leaflet API
};

export default DemandStaticArrow;
