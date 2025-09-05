import styled from "styled-components";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 3fr 3fr 1.5fr 0.2fr;
  column-gap: 1rem;
  align-content: center;
  padding: 0.6rem 1rem;
  color: black;
  font-size: 0.95rem;
  margin: 0 0.5rem;
  font-weight: ${(props) => (props.zona === "Total" ? "bold" : "normal")};

  &:not(:last-child) {
    border-bottom: 1px solid rgba(68, 68, 78, 0.2);
  }
`;

const Column = styled.div`
  font-family: "Roboto";
  align-self: center;

  /* --color: var(--color-green-700); */
`;

function MapTableRow({ rowData }) {
  let zona;
  switch (rowData.idZona) {
    case 1:
      zona = "Cortés";
      break;
    case 2:
      zona = "Sur";
      break;
    case 3:
      zona = "Centro";
      break;
    case 4:
      zona = "Occidente";
      break;
    case 5:
      zona = "El Cajón";
      break;
    case 6:
      zona = "Yojoa";
      break;
    case 7:
      zona = "Litoral";
      break;
    case 8:
      zona = "Olancho";
      break;
    case 9:
      zona = "El Paraíso";
      break;
    case 10:
      zona = "El Progreso";
      break;
    case 13:
      zona = "La Entrada";
      break;
    case "TOTAL":
      zona = "Total";
      break;
    case 12:
      zona = "Interconexiones";
      break;
    default:
      zona = "Zona desconocida";
  }

  return (
    <>
      {zona !== "Interconexiones" && (
        <TableRow role="row" zona={zona}>
          <Column />
          <Column>{zona}</Column>
          <Column>{rowData.totalPotencia}</Column>
          <Column>{rowData.demanda}</Column>
          <Column />
        </TableRow>
      )}
      {zona === "Interconexiones" && (
        <TableRow role="row" zona={zona}>
          <Column />
          <Column>{Math.abs(rowData.totalPotencia)}</Column>
          <Column>{Math.abs(rowData.demanda)}</Column>
          <Column>{Math.abs(rowData.totalPotencia + rowData.demanda)}</Column>
          <Column />
        </TableRow>
      )}
    </>
  );
}

export default MapTableRow;
