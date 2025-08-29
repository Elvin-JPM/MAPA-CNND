import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState, useRef } from "react";
import { LuUtilityPole } from "react-icons/lu";

const PowerFlowBox = ({
  topLeftPosition,
  bottomRightPosition,
  color = "#0F0E0E",
  text = "",
  textColor = "#00F7FF",
  fontSize = null,
  fontWeight = "bold",
  textShadow = "1px 1px 2px rgba(0,0,0,0.8)",
}) => {
  const map = useMap();
  const [blockStyle, setBlockStyle] = useState({
    width: 20,
    height: 20,
    backgroundColor: color,
  });
  const markerRef = useRef();

  // Calculate center position
  const centerPosition = [
    (topLeftPosition[0] + bottomRightPosition[0]) / 2,
    (topLeftPosition[1] + bottomRightPosition[1]) / 2,
  ];

  useEffect(() => {
    if (!map) return;

    // Convert LatLng to container pixels
    const topLeftPoint = map.latLngToContainerPoint(topLeftPosition);
    const bottomRightPoint = map.latLngToContainerPoint(bottomRightPosition);

    // Calculate dimensions
    const width = Math.abs(bottomRightPoint.x - topLeftPoint.x);
    const height = Math.abs(bottomRightPoint.y - topLeftPoint.y);

    setBlockStyle({
      width,
      height,
      backgroundColor: color,
    });

    // Update on map events
    const updateBlock = () => {
      const newTopLeft = map.latLngToContainerPoint(topLeftPosition);
      const newBottomRight = map.latLngToContainerPoint(bottomRightPosition);

      const newWidth = Math.abs(newBottomRight.x - newTopLeft.x);
      const newHeight = Math.abs(newBottomRight.y - newTopLeft.y);

      setBlockStyle((prev) => ({
        ...prev,
        width: newWidth,
        height: newHeight,
      }));
    };

    map.on("move", updateBlock);
    map.on("zoom", updateBlock);

    return () => {
      map.off("move", updateBlock);
      map.off("zoom", updateBlock);
    };
  }, [map, topLeftPosition, bottomRightPosition, color]);

  // Calculate font size based on block size if not provided
  const calculatedFontSize =
    fontSize || `${Math.min(blockStyle.width, blockStyle.height) * 0.49}px`;

  const icon = L.divIcon({
    className: "custom-block-container",
    html: `
    <div class="custom-block" style="
      width: ${blockStyle.width}px; 
      height: ${blockStyle.height}px; 
      background-color: ${blockStyle.backgroundColor};
      border-left: 2px solid ${textColor};
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: pointer;
      margin: 0;
      padding: 0;
      opacity: 0.98;
    ">
      <span class="pulsing-text" style="
        color: ${textColor};
        font-size: ${calculatedFontSize};
        font-weight: ${fontWeight};
        text-transform: uppercase;
        letter-spacing: 1px;
        text-align: center;
        animation: pulse 1.5s infinite;
      ">${text}</span>
    </div>

    <style>
      @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.005); opacity: 0.65; }
        100% { transform: scale(1); opacity: 1; }
      }
    </style>
  `,
    iconSize: [blockStyle.width, blockStyle.height],
    iconAnchor: [blockStyle.width / 2, blockStyle.height / 2],
  });

  return (
    <Marker
      position={centerPosition}
      icon={icon}
      ref={markerRef}
      // pane="blockPane" // ✅ force Block marker above arrows
    ></Marker>
  );
};

export default PowerFlowBox;
