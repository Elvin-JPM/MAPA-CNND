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
import useGetMapData from "../hooks/useGetMapData";
import powerFlowBoxes from "../utils/powerFlowBoxes";
import arrows from "../utils/arrow";
import demandStaticArrows from "../utils/demandStaticArrows";
import powerBoxes from "../utils/powerBoxes";
import powerLines from "../utils/powerLines";
import blocks from "../utils/blocks";
import GenerationBoxesContainer from "./GenerationBoxesContainer";
import generationBoxContainerArray from "../utils/generationBoxContainers";
import colorsByGenerationType from "../utils/colorsByGenerationType";
import DataTable from "./Table";
import { PiSolarPanelFill } from "react-icons/pi";
import { MdWindPower } from "react-icons/md";
import { IoWaterSharp } from "react-icons/io5";
import { IoIosLeaf } from "react-icons/io";
import { PiNuclearPlantFill } from "react-icons/pi";
import { GiSugarCane } from "react-icons/gi";
import { FaVolcano } from "react-icons/fa6";
import { GiDam } from "react-icons/gi";

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

const GenerationBox = styled.div`
  transition: border-color 0.3s;
  background-color: ${(props) => props.backgroundColor || "transparent"};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.fontWeight || "normal"};
  padding: 2px;
  border-radius: 4px;
  width: 45px;
  display: flex;
  justify-content: start;
  align-items: center;
  border: 1px solid white;
  gap: 3px;
  font-size: 14px;
  box-shadow: 0 1px 0 1px rgba(255, 255, 255, 0.6);

  &:hover {
    border-color: #f4f4f4;
  }
`;

// MapContent component
function MapContent({ data, controls }) {
  console.log("Data at map content: ", data);
  const tableData = data?.filter((item) =>
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13].includes(item.idZona)
  );
  console.log("Table data: ", tableData);

  const controlGeneracion = controls.find(
    (control) => control.id === "show-generacion"
  );
  const controlDemanda = controls.find(
    (control) => control.id === "show-demanda"
  );
  const controlFlujos = controls.find(
    (control) => control.id === "show-flujos"
  );
  const controlTabla = controls.find((control) => control.id === "show-tabla");

  return (
    <>
      {/* TileLayer indica el mapa base, este se puede cambiar por otro servicio de mapas a traves de la URL */}
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ"
      />
      {controlGeneracion.checked &&
        generationBoxContainerArray.map((area, index) => {
          const generationTypesByZone = data?.filter(
            (mapaItem) =>
              mapaItem.idZona === area.idZona &&
              [1, 2, 3, 4, 5, 6, 7].includes(mapaItem.idTecnologia)
          );
          return (
            <GenerationBoxesContainer
              key={index}
              topLeftPosition={area.topLeftPosition}
              bottomRightPosition={area.bottomRightPosition}
              color={area.color}
              hoverColor={area.hoverColor}
            >
              {generationTypesByZone.map((genType, genIndex) => (
                <GenerationBox
                  key={genIndex}
                  color={`${genType.idTecnologia === 4 ? "black" : "white"}`}
                  fontWeight="bold"
                  backgroundColor={colorsByGenerationType[genType.idTecnologia]}
                >
                  {genType.idTecnologia === 1 ? (
                    <PiNuclearPlantFill />
                  ) : genType.idTecnologia === 2 ? (
                    <IoWaterSharp />
                  ) : genType.idTecnologia === 3 ? (
                    <GiDam />
                  ) : genType.idTecnologia === 4 ? (
                    <PiSolarPanelFill />
                  ) : genType.idTecnologia === 5 ? (
                    <MdWindPower />
                  ) : genType.idTecnologia === 6 ? (
                    <FaVolcano />
                  ) : genType.idTecnologia === 7 ? (
                    <GiSugarCane />
                  ) : (
                    ""
                  )}
                  {genType.potencia}
                </GenerationBox>
              ))}
            </GenerationBoxesContainer>
          );
        })}
      {controlTabla.checked && (
        <GenerationBoxesContainer
          topLeftPosition={[16, -84.8]}
          bottomRightPosition={[13, -83.2]}
          color="transparent"
          hoverColor="#f4f4f4"
        >
          <DataTable tableData={tableData} />
        </GenerationBoxesContainer>
      )}
      // Los bloques son los rectangulos azules que indican las zonas del mapa
      {blocks.map((block, index) => (
        <Block
          key={index}
          topLeftPosition={block.topLeftPosition}
          bottomRightPosition={block.bottomRightPosition}
          width={block.width}
          height={block.height}
          text={block.text}
        />
      ))}
      {powerLines.map((line, index) => (
        <Line
          key={index}
          startPosition={line.startPosition}
          endPosition={line.endPosition}
          color={line.color}
          weight={line.weight}
          dashArray={line.dashArray}
          description={line.description}
        />
      ))}
      {/** Flechas que indican la demanda de la zona */}
      {demandStaticArrows.map((arrow, index) => (
        <DemandStaticArrow
          key={index}
          direction={arrow.direction}
          initialCoordinate={arrow.initialCoordinate}
          finalCoordinate={arrow.finalCoordinate}
          description={arrow.description}
        />
      ))}
      {/** Cajas de demanda en la zona */}
      {controlDemanda.checked &&
        powerBoxes.map((box, index) => {
          const boxText =
            data?.find(
              (mapDataItem) =>
                mapDataItem.idZona === box.idZona &&
                mapDataItem.idTecnologia === box.idTecnologia
            )?.potencia || "0.0";

          return (
            <PowerBox
              key={index}
              topLeftPosition={box.topLeftPosition}
              bottomRightPosition={box.bottomRightPosition}
              text={boxText}
              fontWeight={box.fontWeight}
              description={box.description}
            />
          );
        })}
      {/* Cajas y flechas de flujo de potencia */}
      {controlFlujos.checked &&
        powerFlowBoxes.map((box, index) => {
          const boxText =
            data?.find(
              (mapDataItem) =>
                mapDataItem.idZona === box.idZona &&
                mapDataItem.idTecnologia === box.idTecnologia
            )?.potencia || 0;
          const arrowDirection = parseInt(boxText, 10) > 0 ? 1 : 0;
          const arrowFlow = arrows.find((arrow) => arrow.flowId === box.flowId);
          return (
            <>
              <PowerFlowBox
                key={index}
                topLeftPosition={box.topLeftPosition}
                bottomRightPosition={box.bottomRightPosition}
                text={`${Math.abs(boxText)}`}
                fontWeight={box.fontWeight}
                description={box.description}
              />
              <Arrow
                direction={
                  arrowDirection ? arrowFlow.positive : arrowFlow.negative
                }
                initialCoordinate={arrowFlow.initialCoordinate}
                finalCoordinate={arrowFlow.finalCoordinate}
                speed={arrowFlow.speed}
                count={arrowFlow.count}
                size={arrowFlow.size}
              />
            </>
          );
        })}
    </>
  );
}

const StyledMapContainer = styled(MapContainer)`
  height: 100%;
  width: 100%;
  cursor: default;
`;

const Map = ({ controls }) => {
  // Con este hook se extraen los datos del mapa
  const { data, isLoading, isError, refetch } = useGetMapData();

  // Esas coordenadas especifican la latitud y longitud en la que se centrara el mapa
  const hondurasCenter = [14.5, -85.8];
  const zoom = 8;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading map data</div>;

  return (
    <StyledMapContainer
      center={hondurasCenter}
      zoom={zoom}
      minZoom={8.35}
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
      <MapContent data={data} controls={controls} />
    </StyledMapContainer>
  );
};

export default Map;
