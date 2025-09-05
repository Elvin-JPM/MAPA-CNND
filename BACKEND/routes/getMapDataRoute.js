const express = require("express");
const { getConnection } = require("../db");
const router = express.Router();

router.get("/map_data", async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(
      ` SELECT 
            TO_CHAR(FECHA, 'DD/MM/YYYY HH24:MI') AS FECHA_FORMAT,
            ID_ZONE,
            ID_TECH,
            ZONE_GEN
        FROM INTERMAP_ZONEGEN@DWH_X10
        WHERE TRUNC(FECHA, 'MI') = (
            SELECT MAX(TRUNC(FECHA, 'MI'))
            FROM INTERMAP_ZONEGEN@DWH_X10
        )
        ORDER BY ID_ZONE, ID_TECH`
    );

    const resultado = result.rows.map(
      ([FECHA_FORMAT, ID_ZONE, ID_TECH, ZONE_GEN]) => ({
        fecha: FECHA_FORMAT,
        idZona: ID_ZONE,
        idTecnologia: ID_TECH,
        potencia: ZONE_GEN,
      })
    );
    console.log("Query result: ", resultado);
    res.json(resultado);
  } catch (error) {
    console.error("Database query error: ", error);
    res.status(500).json({ error: "Failed to fetch subestaciones" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error("Error closing connection: ", err);
      }
    }
  }
});

module.exports = router;
