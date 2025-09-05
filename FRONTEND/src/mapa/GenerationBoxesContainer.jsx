import { Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState, useRef } from "react";
import ReactDOMServer from "react-dom/server";

const GenerationBoxesContainer = ({
  topLeftPosition,
  bottomRightPosition,
  color = "#FFFCFB",
  hoverColor = "#FAF6E9",
  gap = 5, // space between children
  children,
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

    const updateBlock = () => {
      const topLeftPoint = map.latLngToContainerPoint(topLeftPosition);
      const bottomRightPoint = map.latLngToContainerPoint(bottomRightPosition);

      const width = Math.abs(bottomRightPoint.x - topLeftPoint.x);
      const height = Math.abs(bottomRightPoint.y - topLeftPoint.y);

      setBlockStyle({
        width,
        height,
        backgroundColor: color,
      });
    };

    updateBlock();
    map.on("move zoom", updateBlock);
    return () => {
      map.off("move zoom", updateBlock);
    };
  }, [map, topLeftPosition, bottomRightPosition, color]);

  // Render children as HTML (Leaflet requires a string for divIcon)
  const childrenHTML = ReactDOMServer.renderToString(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: `${gap}px`,
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </div>
  );

  const icon = L.divIcon({
    className: "custom-block-container",
    html: `
      <div class="custom-block" style="
        width: ${blockStyle.width}px; 
        height: ${blockStyle.height}px; 
        background-color: ${blockStyle.backgroundColor};
        border-radius: 6px;
        // box-shadow: 0 2px 4px rgba(0,0,0,0.8);
        position: relative;
        transition: background-color 0.3s, box-shadow 0.3s;
        cursor: pointer;
        overflow: hidden;
      ">
        ${childrenHTML}
      </div>
    `,
    iconSize: [blockStyle.width, blockStyle.height],
    iconAnchor: [blockStyle.width / 2, blockStyle.height / 2],
  });

  return <Marker position={centerPosition} icon={icon} ref={markerRef} />;
};

export default GenerationBoxesContainer;
