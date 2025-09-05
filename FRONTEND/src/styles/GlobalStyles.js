import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  :root{
    --color-institucional-celeste: #5fd0df;
    --color-institucional-amarillo: #f29100;
    --color-institucional-rojo: #e20613;

    ${'' /* Colores de tecnologia generacion */}
    --color-generacion-solar: #ffdd17;
    --color-generacion-eolica: #0d9344;
    --color-generacion-hidroelectrica-paso: #86c7df;
    --color-generacion-hidroelectrica-embalse: #00aeef;
    --color-generacion-geotermica: #fbb03f;
    --color-generacion-biomasa: #8bc63e;
    --color-generacion-termica: #959467;

  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    height: 100vh;
    width: 100%;
  }

  .leaflet-container {
    height: 100%;
    width: 100%;
  }
`;

export default GlobalStyles;
