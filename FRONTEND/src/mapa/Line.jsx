import { Marker } from "react-leaflet";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";

const Line = ({ startPosition, endPosition, color = "blue", weight = 4 }) => {
  const map = useMap();
  const [lineStyle, setLineStyle] = useState({
    width: 4,
    height: 4,
    rotation: 0,
  });

  useEffect(() => {
    if (!map) return;

    // Convert LatLng to container pixels
    const startPoint = map.latLngToContainerPoint(startPosition);
    const endPoint = map.latLngToContainerPoint(endPosition);

    // Calculate dimensions and rotation
    const dx = endPoint.x - startPoint.x;
    const dy = endPoint.y - startPoint.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

    setLineStyle({
      width: length,
      height: weight,
      rotation: angle,
    });

    // Update on map events
    const updateLine = () => {
      const newStart = map.latLngToContainerPoint(startPosition);
      const newEnd = map.latLngToContainerPoint(endPosition);
      const newDx = newEnd.x - newStart.x;
      const newDy = newEnd.y - newStart.y;
      const newLength = Math.sqrt(newDx * newDx + newDy * newDy);
      const newAngle = (Math.atan2(newDy, newDx) * 180) / Math.PI;

      setLineStyle({
        width: newLength,
        height: weight,
        rotation: newAngle,
      });
    };

    map.on("move", updateLine);
    map.on("zoom", updateLine);

    return () => {
      map.off("move", updateLine);
      map.off("zoom", updateLine);
    };
  }, [map, startPosition, endPosition, weight]);

  // Calculate center position between start and end
  const centerPosition = [
    (startPosition[0] + endPosition[0]) / 2,
    (startPosition[1] + endPosition[1]) / 2,
  ];

  const icon = L.divIcon({
    className: "custom-line",
    html: `<div style="
      width: ${lineStyle.width}px;
      height: ${lineStyle.height}px;
      background-color: ${color};
      transform: rotate(${lineStyle.rotation}deg);
      transform-origin: center;
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -${lineStyle.height / 2}px;
    "></div>`,
    iconSize: [lineStyle.width, lineStyle.height],
    iconAnchor: [lineStyle.width / 2, lineStyle.height / 2],
  });

  return <Marker position={centerPosition} icon={icon} />;
};

export default Line;
