import { useState } from "react";
import Map from "./mapa/Mapa";
import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Block from "./mapa/Block";

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

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        {/* <MapTitle>Mapa de Generación y Demanda</MapTitle> */}
        <Map />
        {/* <EnergyTable /> */}
      </AppContainer>
    </>
  );
}

export default App;
