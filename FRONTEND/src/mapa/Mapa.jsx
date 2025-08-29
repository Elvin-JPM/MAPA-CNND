import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styled from "styled-components";
import Block from "./Block";
import Arrow from "./Arrow";
import Line from "./Line";
import DemandStaticArrow from "./DemandStaticArrow";
import PowerBox from "./PowerBox";
import PowerFlowBox from "./PowerFlowBox";

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
        text="CORTÉS"
      />
      <Block
        topLeftPosition={[15.65, -85.723]}
        bottomRightPosition={[15.56, -85.3]}
        height={15}
        width={80}
        text="LITORAL"
      />

      <Block
        topLeftPosition={[15.25, -87.55]}
        bottomRightPosition={[15.16, -86.85]}
        height={15}
        width={80}
        text="EL PROGRESO"
      />

      <Block
        topLeftPosition={[14.94, -87.83]}
        bottomRightPosition={[14.85, -87.33]}
        height={15}
        width={80}
        text="EL CAJÓN"
      />

      <Block
        topLeftPosition={[14.94, -88.5]}
        bottomRightPosition={[14.85, -88.1]}
        height={15}
        width={80}
        text="YOJOA"
      />

      <Block
        topLeftPosition={[15.14, -89.13]}
        bottomRightPosition={[15.05, -88.6]}
        height={15}
        width={80}
        text="LA ENTRADA"
      />

      <Block
        topLeftPosition={[14.454, -88.88]}
        bottomRightPosition={[14.354, -88.35]}
        height={15}
        width={80}
        text="OCCIDENTE"
      />

      <Block
        topLeftPosition={[14.35, -87.48]}
        bottomRightPosition={[14.26, -87.05]}
        height={15}
        width={80}
        text="CENTRO"
      />

      <Block
        topLeftPosition={[13.5, -87.4]}
        bottomRightPosition={[13.41, -87]}
        height={15}
        width={80}
        text="SUR"
      />

      <Block
        topLeftPosition={[14.15, -86.32]}
        bottomRightPosition={[14.06, -85.75]}
        height={15}
        width={80}
        text="EL PARAÍSO"
      />

      <Block
        topLeftPosition={[14.8, -85.73]}
        bottomRightPosition={[14.71, -85.3]}
        height={15}
        width={80}
        text="OLANCHO"
      />

      <Line
        startPosition={[15.16, -87.4]}
        endPosition={[14.9, -87.4]}
        color="RED"
        weight={4.5}
        dashArray="5,5"
        description="230KV Line from EL CAJON to EL PROGRESO"
      />
      <Line
        startPosition={[14.26, -87.2]}
        endPosition={[13.5, -87.2]}
        color="RED"
        weight={4.5}
        dashArray="5,5"
        description="230KV Line from CENTRO to SUR"
      />

      <Line
        startPosition={[13.67, -87.345]}
        endPosition={[13.67, -88.53]}
        color="RED"
        weight={4.5}
        dashArray="5,5"
        description="HORIZONTAL PORTION OF 230KV Line from SUR TO INTECONEXION EL SALVADOR"
      />
      <Line
        startPosition={[13.67, -87.35]}
        endPosition={[13.5, -87.35]}
        color="RED"
        weight={4.5}
        dashArray="5,5"
        description="VERTICAL PORTION OF 230KV Line from SUR TO INTECONEXION EL SALVADOR"
      />

      {/* <Line
        startPosition={[13.8, -87.05]}
        endPosition={[13.5, -87.05]}
        color="RED"
        weight={4.5}
        dashArray="5,5"
        description="VERTICAL PORTION OF 230KV Line from SUR TO INTECONEXION NICARAGUA"
      /> */}
      <Line
        startPosition={[13.45, -87]}
        endPosition={[13.45, -86.7]}
        color="RED"
        weight={4.5}
        dashArray="5,5"
        description="HORIZONTAL PORTION OF 230KV Line from SUR TO INTECONEXION NICARAGUA"
      />
      <Line
        startPosition={[13.456, -86.7]}
        endPosition={[12.35, -86.7]}
        color="RED"
        weight={4.5}
        dashArray="5,5"
        description="VERTICAL DOWN PORTION OF 230KV Line from SUR TO INTECONEXION NICARAGUA"
      />

      <Line
        startPosition={[14.85, -87.4]}
        endPosition={[14.34, -87.4]}
        color="RED"
        weight={4.5}
        dashArray="5,5"
        description="VERTICAL DOWN PORTION OF 230KV Line from EL CAJON TO CENTRO"
      />

      <Line
        startPosition={[14.3, -88.175]}
        endPosition={[14.3, -87.48]}
        color="#F97A00"
        weight={4.5}
        dashArray="5,5"
        description="HORIZONTAL PORTION OF 230KV Line from EL CAJON TO CENTRO"
      />
      <Line
        startPosition={[14.2942, -88.17]}
        endPosition={[14.85, -88.17]}
        color="#F97A00"
        weight={4.5}
        dashArray="5,5"
        description="HORIZONTAL PORTION OF 230KV Line from EL CAJON TO CENTRO"
      />

      <Line
        startPosition={[15.25, -87.75]}
        endPosition={[14.9, -87.75]}
        color="RED"
        weight={4.5}
        dashArray="5,5"
        description="VERTICAL UP PORTION OF 230KV Line from EL CAJON TO LA ENTRADA"
      />

      <Line
        startPosition={[15.25, -88.8]}
        endPosition={[15.25, -87.7437]}
        color="RED"
        weight={4.5}
        dashArray="5,5"
        description="HORIZONTAL PORTION OF 230KV Line from EL CAJON TO LA ENTRADA"
      />

      <Line
        startPosition={[15.256, -88.8]}
        endPosition={[15.14, -88.8]}
        color="RED"
        weight={4.5}
        dashArray="5,5"
        description="VERTICAL DOWN SMALL PORTION OF 230KV Line from EL CAJON TO LA ENTRADA"
      />

      <Line
        startPosition={[15.09, -89.126]}
        endPosition={[15.09, -89.6]}
        color="RED"
        weight={4.5}
        dashArray="5,5"
        description="230KV Line FROM LA ENTRADA TO PANALUYA"
      />
      <Line
        startPosition={[14.85, -88.47]}
        endPosition={[14.44, -88.47]}
        color="#F97A00"
        weight={4.5}
        dashArray="5,5"
        description="VERTICAL 69KV Line from OCCIDENTE TO YOJOA"
      />
      <Line
        startPosition={[14.9, -88.17]}
        endPosition={[15.192, -88.17]}
        color="#f8ba3eff"
        weight={4.5}
        dashArray="5,5"
        description="VERTICAL 138KV Line from YOJOA TO CORTES"
      />
      <Line
        startPosition={[15.19, -88.166]}
        endPosition={[15.19, -88.25]}
        color="#f8ba3eff"
        weight={4.5}
        dashArray="5,5"
        description="SMALL HORIZONTAL LEFT 138KV Line from YOJOA TO CORTES"
      />
      <Line
        startPosition={[15.183, -88.25]}
        endPosition={[15.32, -88.25]}
        color="#f8ba3eff"
        weight={4.5}
        dashArray="5,5"
        description="SMALL VERTICAL UP 138KV Line from YOJOA TO CORTES"
      />
      <Line
        startPosition={[15.317, -88.253]}
        endPosition={[15.317, -88.162]}
        color="#f8ba3eff"
        weight={4.5}
        dashArray="5,5"
        description="SMALL HORIZONTAL RIGHT 138KV Line from YOJOA TO CORTES"
      />
      <Line
        startPosition={[15.317, -88.165]}
        endPosition={[15.56, -88.165]}
        color="#f8ba3eff"
        weight={4.5}
        dashArray="5,5"
        description="UP 138KV Line from YOJOA TO CORTES"
      />
      <Line
        startPosition={[15.6, -87.78]}
        endPosition={[15.6, -87.4]}
        color="#f8ba3eff"
        weight={4.5}
        dashArray="5,5"
        description="HORIZONTAL 138KV Line from CORTES TO EL PROGRESO"
      />
      <Line
        startPosition={[15.23, -87.4]}
        endPosition={[15.60585, -87.4]}
        color="#f8ba3eff"
        weight={4.5}
        dashArray="5,5"
        description="VERTICAL 138KV Line from CORTES TO EL PROGRESO"
      />
      <Line
        startPosition={[15.6, -85.7235]}
        endPosition={[15.6, -87.05]}
        color="#f8ba3eff"
        weight={4.5}
        dashArray="5,5"
        description="HORIZONTAL 138KV Line from EL PROGRESO to LITORAL"
      />
      <Line
        startPosition={[15.6041, -87.05]}
        endPosition={[15.2, -87.05]}
        color="#f8ba3eff"
        weight={4.5}
        dashArray="5,5"
        description="VERTICAL 138KV Line from EL PROGRESO TO LITORAL"
      />
      <Line
        startPosition={[14.3, -87.05]}
        endPosition={[14.3, -86.054]}
        color="#F97A00"
        weight={4.5}
        dashArray="5,5"
        description="HORIZONTAL 69KV Line from CENTRO TO EL PARAISO"
      />
      <Line
        startPosition={[14.305, -86.06]}
        endPosition={[14.14, -86.06]}
        color="#F97A00"
        weight={4.5}
        dashArray="5,5"
        description="VERTICAL 69KV Line from CENTRO TO EL PARAISO"
      />
      <Line
        startPosition={[14.75, -85.73]}
        endPosition={[14.75, -87.12]}
        color="#F97A00"
        weight={4.5}
        dashArray="5,5"
        description="HORIZONTAL 69KV Line from CENTRO TO OLANCHO"
      />
      <Line
        startPosition={[14.75, -87.113]}
        endPosition={[14.35, -87.113]}
        color="#F97A00"
        weight={4.5}
        dashArray="5,5"
        description="VERTICAL 69KV Line from CENTRO TO OLANCHO"
      />
      <Line
        startPosition={[15.2, -87.5512]}
        endPosition={[15.2, -87.62]}
        color="#f8ba3eff"
        weight={4.5}
        dashArray="5,5"
        description="FIRST HORIZONTAL 138KV Line FROM RIGHT TO LEFT from EL YOJOA TO EL PROGRESO"
      />
      <Line
        startPosition={[15.205, -87.62]}
        endPosition={[15.05, -87.62]}
        color="#f8ba3eff"
        weight={4.5}
        dashArray="5,5"
        description="FIRST VERTICAL 138KV Line FROM RIGHT TO LEFT (DOWN) from EL YOJOA TO EL PROGRESO"
      />
      <Line
        startPosition={[15.05, -87.615]}
        endPosition={[15.05, -87.7]}
        color="#f8ba3eff"
        weight={4.5}
        dashArray="5,5"
        description="SECOND HORIZONTAL 138KV Line FROM RIGHT TO LEFT from EL YOJOA TO EL PROGRESO"
      />
      <Line
        startPosition={[15.1, -87.7]}
        endPosition={[15.0469, -87.7]}
        color="#f8ba3eff"
        weight={4.5}
        dashArray="5,5"
        description="SECOND VERTICAL 138KV Line FROM RIGHT TO LEFT (UP) from EL YOJOA TO EL PROGRESO"
      />
      <Line
        startPosition={[15.1, -87.695]}
        endPosition={[15.1, -87.8]}
        color="#f8ba3eff"
        weight={4.5}
        dashArray="5,5"
        description="THIRD HORIZONTAL 138KV Line FROM RIGHT TO LEFT from EL YOJOA TO EL PROGRESO"
      />
      <Line
        startPosition={[15.0469, -87.8]}
        endPosition={[15.1053, -87.8]}
        color="#f8ba3eff"
        weight={4.5}
        dashArray="5,5"
        description="THIRD VERTICAL 138KV Line FROM RIGHT TO LEFT (DOWN) from EL YOJOA TO EL PROGRESO"
      />
      <Line
        startPosition={[15.05, -87.795]}
        endPosition={[15.05, -88.126]}
        color="#f8ba3eff"
        weight={4.5}
        dashArray="5,5"
        description="FOURTH HORIZONTAL 138KV Line FROM RIGHT TO LEFT from EL YOJOA TO EL PROGRESO"
      />
      <Line
        startPosition={[15.05, -88.12]}
        endPosition={[14.9, -88.12]}
        color="#f8ba3eff"
        weight={4.5}
        dashArray="5,5"
        description="FOURTH VERTICAL 138KV Line FROM RIGHT TO LEFT (DOWN) from EL YOJOA TO EL PROGRESO"
      />

      {/* Arrow Animation */}
      <Arrow
        direction="right"
        initialCoordinate={[14.315, -88.0]}
        finalCoordinate={[14.0, -87.6]}
        size={10.5}
        speed={3000}
        count={7}
        description="Arrow from Yojoa to Centro"
      />
      <Arrow
        direction="right"
        initialCoordinate={[15.1, -89.6]}
        finalCoordinate={[15.1, -89.2]}
        size={10.5}
        speed={3000}
        count={7}
        description="Arrow from Guatemala to La Entrada"
      />
      <Arrow
        direction="right"
        initialCoordinate={[15.264, -88.7]}
        finalCoordinate={[15.264, -88.3]}
        size={10.5}
        speed={3000}
        count={7}
        description="Arrow from La Entrada to El Cajon"
      />
      <Arrow
        direction="left"
        initialCoordinate={[15.065, -88.1]}
        finalCoordinate={[15.065, -87.85]}
        size={10.5}
        speed={3000}
        count={5}
        description="Arrow from Yojoa to El Progreso"
      />
      <Arrow
        direction="right"
        initialCoordinate={[15.61, -86.7]}
        finalCoordinate={[15.61, -86.2]}
        size={10.5}
        speed={3000}
        count={7}
        description="Arrow from Litoral to El Progreso"
      />
      <Arrow
        direction="right"
        initialCoordinate={[14.76, -86.7]}
        finalCoordinate={[14.76, -86.2]}
        size={10.5}
        speed={3000}
        count={7}
        description="Arrow from Centro to Olancho"
      />
      <Arrow
        direction="right"
        initialCoordinate={[14.315, -86.7]}
        finalCoordinate={[14.315, -86.2]}
        size={10.5}
        speed={3000}
        count={7}
        description="Arrow from Centro to El Paraiso"
      />
      <Arrow
        direction="right"
        initialCoordinate={[13.68, -88.2]}
        finalCoordinate={[13.68, -87.6]}
        size={10.5}
        speed={3000}
        count={7}
        description="Arrow from El Salvador to Honduras"
      />

      {/* VERTICAL ARROWS */}
      <Arrow
        direction="up"
        initialCoordinate={[14.8, -87.395]}
        finalCoordinate={[14.5, -87.39]}
        size={10.5}
        speed={3000}
        count={7}
        description="Arrow from Centro to El Cajon"
      />
      <Arrow
        direction="up"
        initialCoordinate={[14.85, -88.455]}
        finalCoordinate={[14.55, -88]}
        size={10.5}
        speed={3000}
        count={7}
        description="Arrow from Occidente to Yojoa"
      />
      <Arrow
        direction="up"
        initialCoordinate={[15.6, -88.158]}
        finalCoordinate={[15.35, -88]}
        size={10.5}
        speed={3000}
        count={4}
        description="Arrow from Yojoa to Cortes"
      />
      <Arrow
        direction="up"
        initialCoordinate={[15.63, -87.395]}
        finalCoordinate={[15.3, -87.395]}
        size={10.5}
        speed={3000}
        count={5}
        description="Arrow from El Progreso to Cortes"
      />
      <Arrow
        direction="up"
        initialCoordinate={[13.4, -86.7]}
        finalCoordinate={[12.8, -87]}
        size={10.5}
        speed={3000}
        count={8}
        description="Arrow from Nicaragua to Honduras"
      />
      <Arrow
        direction="up"
        initialCoordinate={[14.15, -87.2]}
        finalCoordinate={[13.6, -87]}
        size={10.5}
        speed={3000}
        count={6}
        description="Arrow from Sur to Centro"
      />
      <Arrow
        direction="up"
        initialCoordinate={[15.19, -87.395]}
        finalCoordinate={[14.96, -87]}
        size={10.5}
        speed={3000}
        count={4}
        description="Arrow from El Cajon to El Progreso"
      />

      {/* STATIC ARROWS */}
      <DemandStaticArrow
        direction="up"
        initialCoordinate={[13.5, -87.05]}
        finalCoordinate={[13.65, -87.05]}
        description="Static arrow Demanda Sur"
      />
      <DemandStaticArrow
        direction="up"
        initialCoordinate={[15.65, -87.85]}
        finalCoordinate={[15.8, -87.85]}
        description="Static arrow Demanda Cortes"
      />
      <DemandStaticArrow
        direction="up"
        initialCoordinate={[15.14, -89.05]}
        finalCoordinate={[15.29, -89.05]}
        description="Static arrow Demanda La Entrada"
      />
      <DemandStaticArrow
        direction="up"
        initialCoordinate={[15.65, -85.65]}
        finalCoordinate={[15.8, -85.65]}
        description="Static arrow Demanda Litoral"
      />
      <DemandStaticArrow
        direction="up"
        initialCoordinate={[14.8, -85.65]}
        finalCoordinate={[14.95, -85.65]}
        description="Static arrow Demanda Olancho"
      />
      <DemandStaticArrow
        direction="up"
        initialCoordinate={[14.15, -85.8]}
        finalCoordinate={[14.3, -85.8]}
        description="Static arrow Demanda El Paraiso"
      />
      <DemandStaticArrow
        direction="up"
        initialCoordinate={[14.26, -87.4]}
        finalCoordinate={[14.11, -87.4]}
        description="Static arrow Demanda Centro"
      />
      <DemandStaticArrow
        direction="up"
        initialCoordinate={[14.34, -88.42]}
        finalCoordinate={[14.19, -88.42]}
        description="Static arrow Demanda Occidente"
      />
      <DemandStaticArrow
        direction="left"
        initialCoordinate={[14.88, -88.5]}
        finalCoordinate={[14.88, -88.65]}
        description="Static arrow Demanda Yojoa"
      />
      <DemandStaticArrow
        direction="up"
        initialCoordinate={[14.85, -87.75]}
        finalCoordinate={[14.7, -87.75]}
        description="Static arrow Demanda El Cajon"
      />
      <DemandStaticArrow
        direction="up"
        initialCoordinate={[15.16, -87.15]}
        finalCoordinate={[15.01, -87.15]}
        description="Static arrow Demanda El Progreso"
      />

      {/* Power Demand Boxes */}
      <PowerBox
        topLeftPosition={[14.44, -85.9]}
        bottomRightPosition={[14.33, -85.68]}
        text="155.00"
        fontWeight="700"
        description="Power Demand Box El Paraiso"
      />
      <PowerBox
        topLeftPosition={[15.08, -85.76]}
        bottomRightPosition={[14.97, -85.54]}
        text="155.00"
        fontWeight="700"
        description="Power Demand Box Olancho"
      />
      <PowerBox
        topLeftPosition={[15.94, -85.76]}
        bottomRightPosition={[15.83, -85.54]}
        text="155.00"
        fontWeight="700"
        description="Power Demand Box Litoral"
      />
      <PowerBox
        topLeftPosition={[15.94, -87.96]}
        bottomRightPosition={[15.83, -87.74]}
        text="155.00"
        fontWeight="700"
        description="Power Demand Box Cortes"
      />
      <PowerBox
        topLeftPosition={[14.83, -87.70]}
        bottomRightPosition={[14.72, -87.48]}
        text="155.00"
        fontWeight="700"
        description="Power Demand Box El Cajon"
      />
      <PowerBox
        topLeftPosition={[14.1, -87.49]}
        bottomRightPosition={[13.99, -87.29]}
        text="155.00"
        fontWeight="700"
        description="Power Demand Box Centro"
      />
      <PowerBox
        topLeftPosition={[14.32, -88.68]}
        bottomRightPosition={[14.21, -88.46]}
        text="155.00"
        fontWeight="700"
        description="Power Demand Box Occidente"
      />
      <PowerBox
        topLeftPosition={[13.62, -87.01]}
        bottomRightPosition={[13.51, -86.79]}
        text="155.00"
        fontWeight="700"
        description="Power Demand Box Sur"
      />
      <PowerBox
        topLeftPosition={[15.13, -87.07]}
        bottomRightPosition={[15.02, -86.85]}
        text="155.00"
        fontWeight="700"
        description="Power Demand Box El Progreso"
      />
      <PowerBox
        topLeftPosition={[15.42, -89.16]}
        bottomRightPosition={[15.31, -88.94]}
        text="155.00"
        fontWeight="700"
        description="Power Demand Box La Entrada"
      />
      <PowerBox
        topLeftPosition={[14.94, -89.08]}
        bottomRightPosition={[14.82, -88.68]}
        text="155.00"
        fontWeight="700"
        description="Power Demand Box El Progreso"
      />

      {/* Power flows labels */}
      <PowerFlowBox
        topLeftPosition={[15.24, -89.52]}
        bottomRightPosition={[15.12, -89.28]}
        text="155.00"
        fontWeight="700"
        description="Power Flow Box from Guatemala to Honduras"
      />
      <PowerFlowBox
        topLeftPosition={[15.41, -88.62]}
        bottomRightPosition={[15.3, -88.38]}
        text="155.00"
        fontWeight="700"
        description="Power Flow Box from La Entrada to El Cajon"
      />
      <PowerFlowBox
        topLeftPosition={[15.49, -88.1]}
        bottomRightPosition={[15.38, -87.86]}
        text="155.00"
        fontWeight="700"
        description="Power Flow Box from Yojoa to Cortes"
      />
      <PowerFlowBox
        topLeftPosition={[15.52, -87.37]}
        bottomRightPosition={[15.41, -87.13]}
        text="155.00"
        fontWeight="700"
        description="Power Flow Box from El Progreso to Cortes"
      />
      <PowerFlowBox
        topLeftPosition={[15.78, -86.57]}
        bottomRightPosition={[15.67, -86.33]}
        text="155.00"
        fontWeight="700"
        description="Power Flow Box from El Progreso to Litoral"
      />
      <PowerFlowBox
        topLeftPosition={[14.91, -86.57]}
        bottomRightPosition={[14.8, -86.33]}
        text="155.00"
        fontWeight="700"
        description="Power Flow Box from Centro to Olancho"
      />
      <PowerFlowBox
        topLeftPosition={[14.46, -86.57]}
        bottomRightPosition={[14.35, -86.33]}
        text="155.00"
        fontWeight="700"
        description="Power Flow Box from Centro to El Paraiso"
      />
      <PowerFlowBox
        topLeftPosition={[13.15, -86.64]}
        bottomRightPosition={[13.04, -86.4]}
        text="155.00"
        fontWeight="700"
        description="Power Flow Box from Nicaragua to Honduras"
      />
      <PowerFlowBox
        topLeftPosition={[13.82, -88.1]}
        bottomRightPosition={[13.71, -87.86]}
        text="155.00"
        fontWeight="700"
        description="Power Flow Box from El Salvador to Honduras"
      />
      <PowerFlowBox
        topLeftPosition={[14.25, -87.9]}
        bottomRightPosition={[14.14, -87.66]}
        text="155.00"
        fontWeight="700"
        description="Power Flow Box from Yojoa to Centro"
      />
      <PowerFlowBox
        topLeftPosition={[14.71, -88.75]}
        bottomRightPosition={[14.6, -88.51]}
        text="155.00"
        fontWeight="700"
        description="Power Flow Box from Yojoa to Occidente"
      />
      <PowerFlowBox
        topLeftPosition={[15.2, -88.1]}
        bottomRightPosition={[15.09, -87.86]}
        text="155.00"
        fontWeight="700"
        description="Power Flow Box from Yojoa to El Progreso"
      />
      <PowerFlowBox
        topLeftPosition={[15.04, -87.7]}
        bottomRightPosition={[14.95, -87.47]}
        text="155.00"
        fontWeight="700"
        description="Power Flow Box from El Cajon to El Progreso"
      />
      <PowerFlowBox
        topLeftPosition={[14.61, -87.35]}
        bottomRightPosition={[14.51, -87.13]}
        text="155.00"
        fontWeight="700"
        description="Power Flow Box from El Cajon to Centro"
      />
    </>
  );
}

const StyledMapContainer = styled(MapContainer)`
  height: 100vh;
  width: 100%;
  cursor: default;
`;

const Map = () => {
  const hondurasCenter = [14.5, -85.8];
  const zoom = 8;

  return (
    <StyledMapContainer
      center={hondurasCenter}
      zoom={zoom}
      minZoom={8.4}
      maxZoom={8.7}
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
