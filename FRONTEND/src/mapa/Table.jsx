import { useState, useEffect } from "react";
import styled from "styled-components";
import MapTableRow from "./TableRow";
import Checkbox from "../ui/Checkbox";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: rgba(238, 238, 238, 0.8);
  border-radius: 7px;
  overflow: hidden;
  width: 95%;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.2fr 3fr 3fr 1.5fr 0.2fr;
  column-gap: 1.6rem;
  align-content: center;
  /* background-color: beige; */
  color: #fffcfb;
  border-bottom: 1px solid #222831;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  padding: 0.7rem 1rem;
  position: relative;
  font-size: 1rem;
  background: #0f2027; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #2c5364,
    #203a43,
    #0f2027
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #2c5364,
    #203a43,
    #0f2027
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const InterconexionesHeader = styled.div`
  color: #fffcfb;
  font-size: 0.9rem;
  font-weight: bold;
  /* background-color: beige; */
  width: 100%;
  text-align: center;
  padding: 0.3rem 1rem;
  text-transform: uppercase;
  background: #0f2027; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #2c5364,
    #203a43,
    #0f2027
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #2c5364,
    #203a43,
    #0f2027
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const EmptyTableMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: var(--color-grey-500);
  background-color: var(--color-grey-0);
  border-radius: 7px;
  border: 1px solid var(--color-grey-200);
`;

const BackgroundForHeading = styled.div`
  background-color: var(--color-grey-50);
  padding: 1rem 2.4rem;
  border-radius: 7px;
  margin: 1.2rem 0;
  border: 1px solid var(--color-grey-200);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

function DataTable({ tableData }) {
  
  console.log("Table data: ", tableData);

  // ✅ Group all zones EXCEPT 12
  const grouped = tableData.reduce((acc, row) => {
    if (row.idZona === 12) return acc; // skip 12 here

    if (!acc[row.idZona]) {
      acc[row.idZona] = { idZona: row.idZona, totalPotencia: 0, demanda: 0 };
    }

    if (row.idTecnologia === 8) {
      acc[row.idZona].demanda += row.potencia;
    } else {
      acc[row.idZona].totalPotencia += row.potencia;
    }

    return acc;
  }, {});

  const rowsData = Object.values(grouped);

  // ✅ Special handling for idZona = 12
  const zona12 = tableData.reduce(
    (acc, row) => {
      if (row.idZona === 12) {
        if (row.potencia <= 0) {
          acc.totalPotencia += row.potencia;
        } else {
          acc.demanda += row.potencia;
        }
      }
      return acc;
    },
    { idZona: 12, totalPotencia: 0, demanda: 0 }
  );

  // ✅ Totals row (sum of all zones including 12)
  const totalsRow = [...rowsData].reduce(
    (acc, row) => {
      acc.totalPotencia += row.totalPotencia;
      acc.demanda += row.demanda;
      return acc;
    },
    { idZona: "TOTAL", totalPotencia: 0, demanda: 0 }
  );

  // ✅ Final data with zona12 and totals
  const finalData = [...rowsData, totalsRow];

  console.log("With totals:", JSON.stringify(finalData, null, 2));

  const interconnectionType =
    zona12.totalPotencia + zona12.demanda > 0 ? "EXPORTANDO" : "IMPORTANDO";

  
  return (
      <Table role="table">
        <TableHeader role="row">
          <div></div>
          <div>ZONA</div>
          <div>GENERACIÓN</div>
          <div>DEMANDA</div>
          <div></div>
        </TableHeader>

        {finalData.map((row, index) => (
          <MapTableRow rowData={row} key={index}></MapTableRow>
        ))}
        <InterconexionesHeader>Interconexiones</InterconexionesHeader>
        <TableHeader>
          <div></div>
          <div>ENTRA</div>
          <div>SALE</div>
          <div>{interconnectionType}</div>
          <div></div>
        </TableHeader>
        <MapTableRow rowData={zona12} />
      </Table>
  );
}

export default DataTable;
