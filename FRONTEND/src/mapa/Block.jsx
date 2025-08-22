import { Marker } from "react-leaflet";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { useEffect, useState, useRef } from "react";

const Block = ({
  topLeftPosition,
  bottomRightPosition,
  color = "red",
  hoverColor = "darkred",
  text = "",
  textColor = "white",
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

  // Set up event handlers after the marker is added to the map
  useEffect(() => {
    if (markerRef.current) {
      const element = markerRef.current.getElement();
      if (element) {
        const blockDiv = element.querySelector(".custom-block");
        if (blockDiv) {
          // Mouse enter event
          blockDiv.onmouseenter = () => {
            setBlockStyle((prev) => ({
              ...prev,
              backgroundColor: hoverColor,
              boxShadow: "0 0 8px rgba(0,0,0,0.9)",
            }));
          };

          // Mouse leave event
          blockDiv.onmouseleave = () => {
            setBlockStyle((prev) => ({
              ...prev,
              backgroundColor: color,
              boxShadow: "0 2px 4px rgba(0,0,0,0.8)",
            }));
          };
        }
      }
    }
  }, [color, hoverColor]);

  // Calculate font size based on block size if not provided
  const calculatedFontSize =
    fontSize || `${Math.min(blockStyle.width, blockStyle.height) * 0.5}px`;

  const icon = L.divIcon({
    className: "custom-block-container",
    html: `<div class="custom-block" style="
      width: ${blockStyle.width}px; 
      height: ${blockStyle.height}px; 
      background-color: ${blockStyle.backgroundColor};
      border-radius: 2px;
      box-shadow: ${blockStyle.boxShadow || "0 2px 4px rgba(0,0,0,0.8)"};
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      transition: background-color 0.3s, box-shadow 0.3s;
      cursor: pointer;
    ">
      <span style="
        color: ${textColor};
        font-size: ${calculatedFontSize};
        font-weight: ${fontWeight};
        text-shadow: ${textShadow};
        padding: 2px;
        text-transform: uppercase;
        letter-spacing: 2px;
        text-align: center;
        line-height: 1;
        vertical-align: middle;
      ">${text}</span>
    </div>`,
    iconSize: [blockStyle.width, blockStyle.height],
    iconAnchor: [blockStyle.width / 2, blockStyle.height / 2],
  });

  return (
    <Marker
      position={centerPosition}
      icon={icon}
      ref={markerRef}
      eventHandlers={{
        // Alternative approach using Leaflet event handlers
        mouseover: (e) => {
          const container = e.target.getElement();
          if (container) {
            const block = container.querySelector(".custom-block");
            if (block) {
              block.style.backgroundColor = hoverColor;
              block.style.boxShadow = "0 0 8px rgba(0,0,0,0.9)";
            }
          }
        },
        mouseout: (e) => {
          const container = e.target.getElement();
          if (container) {
            const block = container.querySelector(".custom-block");
            if (block) {
              block.style.backgroundColor = color;
              block.style.boxShadow = "0 2px 4px rgba(0,0,0,0.8)";
            }
          }
        },
      }}
    />
  );
};

export default Block;
