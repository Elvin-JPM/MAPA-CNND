import { useState } from "react";
import Map from "./mapa/Mapa";
import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Block from "./mapa/Block";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MapControls from "./ui/MapControls";

const AppContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

const HelloText = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: white;
  padding: 12px 16px;
  border-radius: 8px;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  color: #333;
`;

const MapTitle = styled.div`
  background-color: black;
  color: white;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1000;

  &:hover {
    filter: drop-shadow(0 0 0.5em #646cffaa);
  }
`;

const EnergyTable = styled.div`
  width: 18rem;
  height: 35rem;
  background-color: white;
  color: black;
  border-radius: 0.5rem;
  box-shadow: 1px 1px 4px 1px lightblue;

  position: absolute;
  right: 18rem;
  top: 10rem;
  z-index: 1000;
`;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const MapWrapper = styled.div`
  width: 100%;
  height: 100%; /* or 80vh, or calc(100vh - headerHeight) */
  display: flex;
`;

function App() {
  const [mapControls, setMapControls] = useState([
    { id: "show-generacion", label: "Mostrar Generacion", checked: true },
    { id: "show-demanda", label: "Mostrar Demanda", checked: true },
    { id: "show-flujos", label: "Mostrar Flujos", checked: true },
    { id: "show-tabla", label: "Mostrar Tabla", checked: true },
  ]);

  const handleControlChange = (controlId, checked) => {
    console.log(`Control ${controlId} changed to:`, checked);
    setMapControls((prev) =>
      prev.map((control) =>
        control.id === controlId ? { ...control, checked } : control
      )
    );
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <AppContainer>
          {/* <MapTitle>Mapa de Generación y Demanda</MapTitle> */}
          <MapWrapper>
            <Map controls={mapControls} />
          </MapWrapper>
          <MapControls
            controls={mapControls}
            onControlChange={handleControlChange}
          />
        </AppContainer>
      </QueryClientProvider>
    </>
  );
}

export default App;
