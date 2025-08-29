// Arrow.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Marker, useMap } from "react-leaflet";
import L from "leaflet";

const Arrow = ({
  direction = "right", // 'up', 'down', 'left', 'right'
  initialCoordinate,
  finalCoordinate,
  color = "#00F7FF",
  size = 18,
  speed = 1200,
  count = 6,
  strokeWidth = 5,
}) => {
  const map = useMap();
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const [phase, setPhase] = useState(0);
  const [paneReady, setPaneReady] = useState(false);

  // Determine horizontal or vertical
  const isHorizontal = useMemo(
    () => direction === "left" || direction === "right",
    [direction]
  );
  const isVertical = useMemo(
    () => direction === "up" || direction === "down",
    [direction]
  );

  // Compute positions based on direction
  const [startPos, endPos, rotationDeg] = useMemo(() => {
    if (!initialCoordinate || !finalCoordinate) return [null, null, 0];

    let start = [...initialCoordinate];
    let end = [...finalCoordinate];
    let rotation = 0;

    if (isHorizontal) {
      if (direction === "left") {
        start = [initialCoordinate[0], finalCoordinate[1]];
        end = [finalCoordinate[0], initialCoordinate[1]];
        rotation = 180;
      } else {
        // right
        rotation = 0;
      }
    } else if (isVertical) {
      if (direction === "up") {
        start = [finalCoordinate[0], initialCoordinate[1]];
        end = [initialCoordinate[0], finalCoordinate[1]];
        rotation = -90;
      } else {
        // down
        rotation = 90;
      }
    }

    return [start, end, rotation];
  }, [initialCoordinate, finalCoordinate, direction, isHorizontal, isVertical]);

  // Interpolation
  const interp = (t) => {
    if (!startPos || !endPos) return [0, 0];

    if (isHorizontal) {
      const lat = startPos[0];
      const lng = startPos[1] + (endPos[1] - startPos[1]) * t;
      return [lat, lng];
    } else {
      const lat = startPos[0] + (endPos[0] - startPos[0]) * t;
      const lng = startPos[1];
      return [lat, lng];
    }
  };

  // Create pane for arrows on top
  useEffect(() => {
    if (!map) return;
    if (!map.getPane("arrowPane")) {
      map.createPane("arrowPane");
      map.getPane("arrowPane").style.zIndex = 1000;
    }
    setPaneReady(true);
  }, [map]);

  // Animate
  useEffect(() => {
    startRef.current = null;
    const tick = (ts) => {
      if (startRef.current == null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const p = (elapsed % speed) / speed;
      setPhase(p);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speed, startPos, endPos, direction]);

  if (!startPos || !endPos || !paneReady) return null;

  // Create SVG icon
  const makeIcon = (opacity) => {
    const arrowSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 20 20" style="overflow: visible;">
        <line x1="0" y1="0" x2="10" y2="10" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
        <line x1="0" y1="20" x2="10" y2="10" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
      </svg>
    `;
    return L.divIcon({
      className: "electric-arrow-icon",
      html: `<div style="
        transform: rotate(${rotationDeg}deg);
        opacity:${opacity};
        transition: opacity 60ms linear;
        filter: drop-shadow(0 0 2px black);
      ">${arrowSvg}</div>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  const markers = Array.from({ length: Math.max(1, count) }, (_, i) => {
    const p = (phase + i / count) % 1;
    const pos = interp(p);
    const opacity = Math.max(0, Math.min(1, 1 - Math.abs(2 * p - 1)));
    return (
      <Marker
        key={i}
        position={pos}
        icon={makeIcon(opacity)}
        interactive={false}
        pane="arrowPane"
      />
    );
  });

  return <>{markers}</>;
};

export default Arrow;
