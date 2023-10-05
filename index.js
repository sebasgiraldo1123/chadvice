import { connectToWhatsApp } from "./src/whatsappCon/index.js";
import Express from "express";
import { crearEsquemas } from "./schemas.js";
// ! quitar import (prueba orm)
import Equipos from "./src/datos/equipos.js";

const PORT = process.env.PORT || 3000;
const app = Express();

connectToWhatsApp().catch((err) => console.log("unexpected error: " + err)); // catch any errors
crearEsquemas();

app.listen(PORT, () => {
  console.log("Server Run PORT : " + PORT);
});

// ! quitar bloque (prueba orm)
const equipos = new Equipos();
equipos
  .obtenerTodos()
  .then((prods) =>
    console.log(
      prods.map(
        ({ dataValues }) =>
          `equipo ${dataValues.nombre} con pantalla de ${dataValues.pantalla} pulgadas`
      )
    )
  );
// 06e03010064f951efe23f39539778a5a61d44385
