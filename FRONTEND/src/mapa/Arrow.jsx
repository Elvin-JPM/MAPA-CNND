import React, { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const ArrowMarker = ({
  position,
  direction = "right",
  color = "#FF0000", // Bright red for visibility
  size = 60,
}) => {
  const map = useMap();
  const markerRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    // Determine rotation based on direction
    const getRotation = () => {
      switch (direction) {
        case "right":
          return "0deg";
        case "oblique-right-down":
          return "45deg";
        case "down":
          return "90deg";
        case "oblique-left-down":
          return "135deg";
        case "left":
          return "180deg";
        case "oblique-left-up":
          return "225deg";
        case "oblique-right-up":
          return "315deg";
        case "up":
          return "270deg";
        default:
          return "0deg";
      }
    };

    // Create the arrow HTML - JUST THE ARROW, NO CIRCLE
    const arrowHtml = `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: ${size}px;
        height: ${size}px;
      ">
        <div style="
          width: ${size}px;
          height: ${size}px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: arrowPulse 1.5s ease-in-out infinite;
          transform: rotate(${getRotation()});
        ">
          <!-- Main arrow only -->
          <div style="
            width: 100%;
            height: 100%;
            background: ${color};
            clip-path: polygon(0% 40%, 60% 40%, 60% 0%, 100% 50%, 60% 100%, 60% 60%, 0% 60%);
          "></div>
        </div>
      </div>
      <style>
        @keyframes arrowPulse {
          0% { transform: rotate(${getRotation()}) scale(1); opacity: 0.7; }
          50% { transform: rotate(${getRotation()}) scale(1.1); opacity: 1; }
          100% { transform: rotate(${getRotation()}) scale(1); opacity: 0.7; }
        }
      </style>
    `;

    // Create custom icon for the arrow
    const icon = L.divIcon({
      className: "custom-arrow-icon",
      html: arrowHtml,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });

    // Create or update marker
    if (!markerRef.current) {
      markerRef.current = L.marker(position, {
        icon,
        zIndexOffset: 1000,
      }).addTo(map);
    } else {
      markerRef.current.setLatLng(position);
      markerRef.current.setIcon(icon);
    }

    // Cleanup on unmount
    return () => {
      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }
    };
  }, [map, position, direction, color, size]);

  return null;
};

export default ArrowMarker;
