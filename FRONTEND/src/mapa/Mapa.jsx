import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styled from "styled-components";
import Block from "./Block";
import ArrowMarker from "./Arrow";
import Line from "./Line";

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// MapContent component
function MapContent() {
  return (
    <>
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ"
      />
      <Block
        topLeftPosition={[15.65, -88.22]}
        bottomRightPosition={[15.56, -87.78]}
        width={80}
        color="black"
        text="CORTES"
      />
      <Block
        topLeftPosition={[15.65, -85.723]}
        bottomRightPosition={[15.56, -85.3]}
        height={15}
        width={80}
        color="black"
        text="LITORAL"
      />

      <Block
        topLeftPosition={[15.25, -87.55]}
        bottomRightPosition={[15.16, -86.85]}
        height={15}
        width={80}
        color="black"
        text="EL PROGRESO"
      />

      <Block
        topLeftPosition={[14.94, -87.83]}
        bottomRightPosition={[14.85, -87.33]}
        height={15}
        width={80}
        color="black"
        text="EL CAJON"
      />

      <Block
        topLeftPosition={[14.94, -88.5]}
        bottomRightPosition={[14.85, -88.1]}
        height={15}
        width={80}
        color="black"
        text="YOJOA"
      />

      <Block
        topLeftPosition={[15.14, -89.13]}
        bottomRightPosition={[15.05, -88.6]}
        height={15}
        width={80}
        color="black"
        text="LA ENTRADA"
      />

      <Block
        topLeftPosition={[14.454, -88.88]}
        bottomRightPosition={[14.354, -88.35]}
        height={15}
        width={80}
        color="black"
        text="OCCIDENTE"
      />

      <Block
        topLeftPosition={[14.35, -87.48]}
        bottomRightPosition={[14.26, -87.05]}
        height={15}
        width={80}
        color="black"
        text="CENTRO"
      />

      <Block
        topLeftPosition={[13.5, -87.4]}
        bottomRightPosition={[13.41, -87]}
        height={15}
        width={80}
        color="black"
        text="SUR"
      />

      <Block
        topLeftPosition={[14.15, -86.32]}
        bottomRightPosition={[14.06, -85.75]}
        height={15}
        width={80}
        color="black"
        text="EL PARAISO"
      />

      <Block
        topLeftPosition={[14.8, -85.73]}
        bottomRightPosition={[14.71, -85.3]}
        height={15}
        width={80}
        color="black"
        text="OLANCHO"
      />

      <Line
        startPosition={[15.15, -87.4]}
        endPosition={[14.9, -87.4]}
        color="RED"
        weight={4.3}
        dashArray="5,5"
        description="230KV Line from EL CAJON to EL PROGRESO"
      />
      <Line
        startPosition={[14.26, -87.2]}
        endPosition={[13.5, -87.2]}
        color="RED"
        weight={4.3}
        dashArray="5,5"
        description="230KV Line from CENTRO to SUR"
      />

      <Line
        startPosition={[13.67, -87.345]}
        endPosition={[13.67, -88.53]}
        color="RED"
        weight={4.3}
        dashArray="5,5"
        description="HORIZONTAL PORTION OF 230KV Line from SUR TO INTECONEXION EL SALVADOR"
      />
      <Line
        startPosition={[13.67, -87.35]}
        endPosition={[13.5, -87.35]}
        color="RED"
        weight={4.3}
        dashArray="5,5"
        description="VERTICAL PORTION OF 230KV Line from SUR TO INTECONEXION EL SALVADOR"
      />

      {/* <Line
        startPosition={[13.8, -87.05]}
        endPosition={[13.5, -87.05]}
        color="RED"
        weight={4.3}
        dashArray="5,5"
        description="VERTICAL PORTION OF 230KV Line from SUR TO INTECONEXION NICARAGUA"
      /> */}
      <Line
        startPosition={[13.45, -87]}
        endPosition={[13.45, -86.7]}
        color="RED"
        weight={4.3}
        dashArray="5,5"
        description="HORIZONTAL PORTION OF 230KV Line from SUR TO INTECONEXION NICARAGUA"
      />
      <Line
        startPosition={[13.456, -86.7]}
        endPosition={[12.35, -86.7]}
        color="RED"
        weight={4.3}
        dashArray="5,5"
        description="VERTICAL DOWN PORTION OF 230KV Line from SUR TO INTECONEXION NICARAGUA"
      />

      <Line
        startPosition={[14.85, -87.4]}
        endPosition={[14.34, -87.4]}
        color="RED"
        weight={4.3}
        dashArray="5,5"
        description="VERTICAL DOWN PORTION OF 230KV Line from EL CAJON TO CENTRO"
      />

      <Line
        startPosition={[14.3, -88.175]}
        endPosition={[14.3, -87.48]}
        color="#F97A00"
        weight={4.3}
        dashArray="5,5"
        description="HORIZONTAL PORTION OF 230KV Line from EL CAJON TO CENTRO"
      />
      <Line
        startPosition={[14.2942, -88.17]}
        endPosition={[14.85, -88.17]}
        color="#F97A00"
        weight={4.3}
        dashArray="5,5"
        description="HORIZONTAL PORTION OF 230KV Line from EL CAJON TO CENTRO"
      />

      <Line
        startPosition={[15.25, -87.75]}
        endPosition={[14.9, -87.75]}
        color="RED"
        weight={4.3}
        dashArray="5,5"
        description="VERTICAL UP PORTION OF 230KV Line from EL CAJON TO LA ENTRADA"
      />

      <Line
        startPosition={[15.25, -88.8]}
        endPosition={[15.25, -87.7437]}
        color="RED"
        weight={4.3}
        dashArray="5,5"
        description="HORIZONTAL PORTION OF 230KV Line from EL CAJON TO LA ENTRADA"
      />

      <Line
        startPosition={[15.256, -88.8]}
        endPosition={[15.14, -88.8]}
        color="RED"
        weight={4.3}
        dashArray="5,5"
        description="VERTICAL DOWN SMALL PORTION OF 230KV Line from EL CAJON TO LA ENTRADA"
      />

      <Line
        startPosition={[15.09, -89.126]}
        endPosition={[15.09, -89.6]}
        color="RED"
        weight={4.3}
        dashArray="5,5"
        description="230KV Line FROM LA ENTRADA TO PANALUYA"
      />
      <Line
        startPosition={[14.85, -88.47]}
        endPosition={[14.44, -88.47]}
        color="#F97A00"
        weight={4.3}
        dashArray="5,5"
        description="VERTICAL 69KV Line from OCCIDENTE TO YOJOA"
      />
      <Line
        startPosition={[14.9, -88.17]}
        endPosition={[15.192, -88.17]}
        color="#f8ba3eff"
        weight={4.3}
        dashArray="5,5"
        description="VERTICAL 138KV Line from YOJOA TO CORTES"
      />
      <Line
        startPosition={[15.19, -88.166]}
        endPosition={[15.19, -88.25]}
        color="#f8ba3eff"
        weight={4.3}
        dashArray="5,5"
        description="SMALL HORIZONTAL LEFT 138KV Line from YOJOA TO CORTES"
      />
      <Line
        startPosition={[15.183, -88.25]}
        endPosition={[15.32, -88.25]}
        color="#f8ba3eff"
        weight={4.3}
        dashArray="5,5"
        description="SMALL VERTICAL UP 138KV Line from YOJOA TO CORTES"
      />
      <Line
        startPosition={[15.317, -88.253]}
        endPosition={[15.317, -88.162]}
        color="#f8ba3eff"
        weight={4.3}
        dashArray="5,5"
        description="SMALL HORIZONTAL RIGHT 138KV Line from YOJOA TO CORTES"
      />
      <Line
        startPosition={[15.317, -88.165]}
        endPosition={[15.56, -88.165]}
        color="#f8ba3eff"
        weight={4.3}
        dashArray="5,5"
        description="UP 138KV Line from YOJOA TO CORTES"
      />
      <Line
        startPosition={[15.6, -87.78]}
        endPosition={[15.6, -87.4]}
        color="#f8ba3eff"
        weight={4.3}
        dashArray="5,5"
        description="HORIZONTAL 138KV Line from CORTES TO EL PROGRESO"
      />
      <Line
        startPosition={[15.23, -87.4]}
        endPosition={[15.60585, -87.4]}
        color="#f8ba3eff"
        weight={4.3}
        dashArray="5,5"
        description="VERTICAL 138KV Line from CORTES TO EL PROGRESO"
      />
      <Line
        startPosition={[15.6, -85.7235]}
        endPosition={[15.6, -87.05]}
        color="#f8ba3eff"
        weight={4.3}
        dashArray="5,5"
        description="HORIZONTAL 138KV Line from EL PROGRESO to LITORAL"
      />
      <Line
        startPosition={[15.61, -87.05]}
        endPosition={[15.2, -87.05]}
        color="#f8ba3eff"
        weight={4.3}
        dashArray="5,5"
        description="HORIZONTAL 138KV Line from EL PROGRESO TO LITORAL"
      />
      <Line
        startPosition={[14.3, -87.05]}
        endPosition={[14.3, -86.054]}
        color="#F97A00"
        weight={4.3}
        dashArray="5,5"
        description="HORIZONTAL 69KV Line from CENTRO TO EL PARAISO"
      />
      <Line
        startPosition={[14.305, -86.06]}
        endPosition={[14.14, -86.06]}
        color="#F97A00"
        weight={4.3}
        dashArray="5,5"
        description="VERTICAL 69KV Line from CENTRO TO EL PARAISO"
      />
      <Line
        startPosition={[14.75, -85.73]}
        endPosition={[14.75, -87.12]}
        color="#F97A00"
        weight={4.3}
        dashArray="5,5"
        description="HORIZONTAL 69KV Line from CENTRO TO OLANCHO"
      />
      <Line
        startPosition={[14.75, -87.113]}
        endPosition={[14.35, -87.113]}
        color="#F97A00"
        weight={4.3}
        dashArray="5,5"
        description="VERTICAL 69KV Line from CENTRO TO OLANCHO"
      />
      {/* <ArrowMarker
        position={[14.5, -85.5]}
        direction="right"
        color="#FF0000"
        size={60}
      /> */}
    </>
  );
}

const StyledMapContainer = styled(MapContainer)`
  height: 100vh;
  width: 100%;
  cursor: default;
`;

const Map = () => {
  const hondurasCenter = [14.5, -85.5];
  const zoom = 8.4;

  return (
    <StyledMapContainer
      center={hondurasCenter}
      zoom={zoom}
      minZoom={7}
      maxZoom={9}
      // dragging={false}
      // doubleClickZoom={false}
      scrollWheelZoom={false}
      touchZoom={false}
      boxZoom={false}
      keyboard={false}
      tap={false}
      attributionControl={false}
    >
      <MapContent />
    </StyledMapContainer>
  );
};

export default Map;
