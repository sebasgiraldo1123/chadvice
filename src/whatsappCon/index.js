import {
  makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
} from "@whiskeysockets/baileys";
import log from "pino";
import { Boom } from "@hapi/boom";
import Controlador from "../bot/controlador.js";

let sock;
let qrDinamic;

const bot = new Controlador();
var numeroTelefonoUsuario = "";
async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState("session_auth_info");

  sock = makeWASocket({
    printQRInTerminal: true, // TODO: mostrar QR en web
    auth: state,
    logger: log({ level: "silent" }),
  });

  console.log("** no se está mostrando qr **");
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
  const menuI = "Menu inicial";

  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    try {
      if (type !== "notify") return;
      if (!messages[0]?.key.fromMe) return;

      const mensajeEntrante = messages[0]?.message?.conversation;
      numeroTelefonoUsuario = messages[0]?.key?.remoteJid;
      const mensajeEntranteMinuscula = mensajeEntrante.toLocaleLowerCase();
      
      
      const respuestas = await bot.mensaje(
        mensajeEntranteMinuscula,
        numeroTelefonoUsuario
      );
      for (let i = 0; i < respuestas.length; i++) {
        await sock.sendMessage(numeroTelefonoUsuario, respuestas[i]);
      }
    } catch (error) {
      // TODO: implementar logs
      console.log("error ", error);
    }
  });

/*
  const generateMessageQuestion = async (numeroTelefonoUsuario, message, options) => {
/*
  const generateMessageQuestion = async (numeroTelefonoUsuario, message, options) => {
    totaloptions = "";
  const generateMessageQuestion = async (numberWa, message, options) => {
    let totaloptions = "";
    options.forEach((option) => {
      totaloptions += option + "\n";
    });
    await sock.sendMessage(numberWa, {
      text: message + "\n" + totaloptions,
    });
  };

  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    try {
      const numberWa = messages[0]?.key?.remoteJid;
      if (type === "notify") {
        if (!messages[0]?.key.fromMe) {
          let captureMessage = messages[0]?.message?.conversation;
          let compareMessage = captureMessage.toLocaleLowerCase();
          if (compareMessage === "hola" || step === 0) {
            let opciones = ["1. Ubicacion", "2. Ver productos", "3. Servicios"];
            await sock.sendMessage(
              numberWa,
              {
                text:
                  "¡Bienvenido a MariangelCell! 😊📱 Soy tu asistente virtual 🤖. Estoy aquí para ayudarte con tus consultas sobre productos y servicios tecnológicos. No dudes en preguntar sobre smartphones 📲, audífonos 🎧, cámaras 📷, periféricos 🖱️ y más.\nSelecciona una opción:\n\n" +
                  opciones[0] +
                  "\n" +
                  opciones[1] +
                  "\n" +
                  opciones[2],
                footer: "MariangelCell",
              },
              {
                quoted: messages[0],
              }
            );
            step += 1;
            console.log(step);
          }

          let opciones = [];
          captureMessage = messages[0]?.message?.conversation;
          compareMessage = captureMessage.toLocaleLowerCase();
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
          if (compareMessage === "1" || (compareMessage === "2" && step == 3)) {
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
            generateMessageQuestion(
              numberWa,
              "¿Qué resolución de pantalla estás buscando?\n\n",
              opciones
            );
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
      }
    } catch (error) {
      console.log("error ", error);
    }
  });*/

  sock.ev.on("creds.update", saveCreds);
}

export {connectToWhatsApp, numeroTelefonoUsuario};
