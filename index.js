/* const {
  default: makeWASocket,
  MessageType,
  MessageOptions,
  Mimetype,
  DisconnectReason,
  BufferJSON,
  AnyMessageContent,
  delay,
  fetchLatestBaileysVersion,
  isJidBroadcast,
  makeCacheableSignalKeyStore,
  makeInMemoryStore,
  MessageRetryMap,
  useMultiFileAuthState,
  msgRetryCounterMap,
} = require("@whiskeysockets/baileys");

const log = (pino = require("pino"));
const { session } = { session: "session_auth_info" };
const { Boom } = require("@hapi/boom");
const path = require("path");
const fs = require("fs");
const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = require("express")();
// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 8000;
const qrcode = require("qrcode");

app.use("/assets", express.static(__dirname + "/client/assets"));

app.get("/scan", (req, res) => {
  res.sendFile("./client/index.html", {
    root: __dirname,
  });
});

app.get("/", (req, res) => {
  res.send("server working");
});

let sock;
let qrDinamic;
let soket;

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState("session_auth_info");

  sock = makeWASocket({
    printQRInTerminal: true,
    auth: state,
    logger: log({ level: "silent" }),
  });

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update;
    qrDinamic = qr;
    if (connection === "close") {
      let reason = new Boom(lastDisconnect.error).output.statusCode;
      if (reason === DisconnectReason.badSession) {
        console.log(
          `Bad Session File, Please Delete ${session} and Scan Again`
        );
        sock.logout();
      } else if (reason === DisconnectReason.connectionClosed) {
        console.log("Conexión cerrada, reconectando....");
        connectToWhatsApp();
      } else if (reason === DisconnectReason.connectionLost) {
        console.log("Conexión perdida del servidor, reconectando...");
        connectToWhatsApp();
      } else if (reason === DisconnectReason.connectionReplaced) {
        console.log(
          "Conexión reemplazada, otra nueva sesión abierta, cierre la sesión actual primero"
        );
        sock.logout();
      } else if (reason === DisconnectReason.loggedOut) {
        console.log(
          `Dispositivo cerrado, elimínelo ${session} y escanear de nuevo.`
        );
        sock.logout();
      } else if (reason === DisconnectReason.restartRequired) {
        console.log("Se requiere reinicio, reiniciando...");
        connectToWhatsApp();
      } else if (reason === DisconnectReason.timedOut) {
        console.log("Se agotó el tiempo de conexión, conectando...");
        connectToWhatsApp();
      } else {
        sock.end(
          `Motivo de desconexión desconocido: ${reason}|${lastDisconnect.error}`
        );
      }
    } else if (connection === "open") {
      console.log("conexión abierta");
      return;
    }
  });
  let step = 0;

  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    try {
      const numberWa = messages[0]?.key?.remoteJid;

      if (type === "notify") {
        if (!messages[0]?.key.fromMe) {
          const captureMessage = messages[0]?.message?.conversation;

          let compareMessage = captureMessage.toLocaleLowerCase();
          if (compareMessage === "hola" && step === 0) {
            let opciones = ["1. Ubicacion", "2. Ver productos", "3. Servicios"];
            await sock.sendMessage(
              numberWa,
              {
                text:
                  "¡Bienvenido al Chatbot de MariangelCell! 😊📱\n¡Hola! Soy tu asistente virtual Mari, estoy aquí para ayudarte con todas tus consultas y necesidades relacionadas con nuestros productos y servicios tecnológicos. 🤖\nNo dudes en preguntarme sobre nuestros últimos modelos de celulares 📲, audífonos 🎧, cámaras fotográficas 📷 y periféricos 🖱️. También puedo ayudarte a conocer nuestro inventario actualizado, registrar tus compras en tienda física 🛒, brindarte información sobre nuestros servicios técnicos 🛠️, y mucho más.\nEstoy aquí para hacer tu experiencia con MariangelCell más fácil y conveniente. ¡Así que adelante, pregúntame lo que necesites! 👍\n\nSelecciona una de las opciones : \n\n" +
                  opciones[0] +
                  "\n" +
                  opciones[1],
                footer: "MariangelCell",
              },
              {
                quoted: messages[0],
              }
            );
            step += 1;
            console.log(step);
          }
        }

        let opciones = [];
        captureMessage = messages[0]?.message?.conversation;
        let compareMessage = captureMessage.toLocaleLowerCase();

        console.log(step);

        if (compareMessage === "2" && step == 1) {
          console.log("opcion 2");
          opciones = ["A. Smartphones", "B. Otros productos"];
          generateMessageQuestion(
            numberWa,
            "Claro, ¿qué tipo de productos te gustaría explorar hoy?\n\n",
            opciones
          );
          step += 1;
        }

        captureMessage = messages[0]?.message?.conversation;
        compareMessage = captureMessage.toLocaleLowerCase();

        if (compareMessage === "a" && step == 2) {
          console.log("opcion 3");
          opciones = ["1. Nuevos", "2. De exhibición"];
          await generateMessageQuestion(
            numberWa,
            " ¡Perfecto! ¿Qué tipo de teléfonos te interesa?\n\n",
            opciones
          );
          step += 1;
        }

        captureMessage = messages[0]?.message?.conversation;
        compareMessage = captureMessage.toLocaleLowerCase();

        if (compareMessage === "1" || compareMessage === "2" && step == 3) {
          console.log("opcion 4");

          opciones = [
            "A. Nombre",
            "B. Marca",
            "C. Resolución de pantalla",
            "D. Capacidad de batería",
            "E. Resolución de cámara principal",
            "F. Almacenamiento interno",
            "G. Memoria RAM",
            "H. Precio",
            "I. Estado",
            "J. Porcentaje de la batería",
          ];

          generateMessageQuestion(
            numberWa,
            "¿por cuál de las siguientes categorías deseas filtrar los teléfonos nuevos?\n\n",
            opciones
          );
          step += 1;
        }

        captureMessage = messages[0]?.message?.conversation;
        compareMessage = captureMessage.toLocaleLowerCase();

        if (compareMessage === "c" && step == 4) {
          console.log("opcion 5");
          opciones = [
            "1. 5,5 pulgadas",
            "2. 5,7 pulgadas",
            "3. 5,8 pulgadas",
            "4. 5,9 pulgadas",
            "5. 6,0 pulgadas",
            "6. 6,1 pulgadas",
            "7. 6,2 pulgadas",
            "8. 6,3 pulgadas",
            "9. 6,4 pulgadas",
            "10. 6,5 pulgadas",
            "11. 6,6 pulgadas",
            "12. 6,7 pulgadas",
            "13. 6,8 pulgadas",
          ];
          generateMessageQuestion(numberWa, "\n\n", opciones);

          step += 1;
        } else if (compareMessage === "d" && step == 4) {
          opciones = [
            "1. De 2000 a 3000 mAh",
            "2. De 3000 a 4000 mAh",
            "3. De 4000 a 5000 mAh",
            "4. De 5000 a 6000 mAh",
            "5. De 6000 a 7000 mAh",
          ];
          generateMessageQuestion(
            numberWa,
            "¿Qué capacidad de batería prefieres?\n\n",
            opciones
          );

          step += 1;
        }
      }
    } catch (error) {
      console.log("error ", error);
    }
  });

  sock.ev.on("creds.update", saveCreds);
}

//Funcion para generar el mensaje de pregunta
const generateMessageQuestion = async (numberWa, message, options) => {
  totaloptions = "";
  options.forEach((option) => {
    totaloptions += option + "\n";
  });

  await sock.sendMessage(numberWa, {
    text: message + "\n" + totaloptions,
  });
};

const isConnected = () => {
  return sock?.user ? true : false;
};

app.get("/send-message", async (req, res) => {
  const tempMessage = req.query.message;
  const number = req.query.number;

  let numberWA;
  try {
    if (!number) {
      res.status(500).json({
        status: false,
        response: "El numero no existe",
      });
    } else {
      numberWA = "57" + number + "@s.whatsapp.net";

      if (isConnected()) {
        const exist = await sock.onWhatsApp(numberWA);

        if (exist?.jid || (exist && exist[0]?.jid)) {
          sock
            .sendMessage(exist.jid || exist[0].jid, {
              text: tempMessage,
            })
            .then((result) => {
              res.status(200).json({
                status: true,
                response: result,
              });
            })
            .catch((err) => {
              res.status(500).json({
                status: false,
                response: err,
              });
            });
        }
      } else {
        res.status(500).json({
          status: false,
          response: "Aun no estas conectado",
        });
      }
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

io.on("connection", async (socket) => {
  soket = socket;
  if (isConnected()) {
    updateQR("connected");
  } else if (qrDinamic) {
    updateQR("qr");
  }
});

const updateQR = (data) => {
  switch (data) {
    case "qr":
      qrcode.toDataURL(qrDinamic, (err, url) => {
        soket?.emit("qr", url);
        soket?.emit("log", "QR recibido , scan");
      });
      break;
    case "connected":
      soket?.emit("qrstatus", "./assets/check.svg");
      soket?.emit("log", " usaario conectado");
      const { id, name } = sock?.user;
      var userinfo = id + " " + name;
      soket?.emit("user", userinfo);

      break;
    case "loading":
      soket?.emit("qrstatus", "./assets/loader.gif");
      soket?.emit("log", "Cargando ....");

      break;
    default:
      break;
  }
};

connectToWhatsApp().catch((err) => console.log("unexpected error: " + err)); // catch any errors
server.listen(port, () => {
  console.log("Server Run Port : " + port);
}); */

import { connectToWhatsApp } from "./src/whatsappCon/index.js";
import Express from "express";
import { crearEsquemas } from "./src/datos/schemas.js";

const PORT = process.env.PORT || 3000;
const app = Express();

connectToWhatsApp().catch((err) => console.log("unexpected error: " + err)); // catch any errors
crearEsquemas();

app.listen(PORT, () => {
  console.log("Server Run PORT : " + PORT);