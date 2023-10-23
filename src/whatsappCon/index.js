import {
  makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
} from "@whiskeysockets/baileys";
import log from "pino";
import { Boom } from "@hapi/boom";

import Bot from "../bot/index.js";

let sock;
let qrDinamic;

const bot = new Bot();
async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState("session_auth_info");

  sock = makeWASocket({
    printQRInTerminal: true, // TODO: mostrar QR en web
    auth: state,
    logger: log({ level: "silent" }),
  });

  // console.log("** no se está mostrando qr **");
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

  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    try {
      if (type !== "notify") return;
      if (!messages[0]?.key.fromMe) return;

      const mensajeEntrante = messages[0]?.message?.conversation;
      const numeroTelefonoUsuario = messages[0]?.key?.remoteJid;
      const mensajeEntranteMinuscula = mensajeEntrante.toLocaleLowerCase();

      const respuestas = await bot.mensaje(
        mensajeEntranteMinuscula,
        numeroTelefonoUsuario
      );0
      for (let i = 0; i < respuestas.length; i++) {
        await sock.sendMessage(numeroTelefonoUsuario, respuestas[i]);
      }
    } catch (error) {
      // TODO: implementar logs
      console.log("error ", error);
    }
  });

  /*   const generateMessageQuestion = async (numeroTelefonoUsuario, message, options) => {
    totaloptions = "";
    options.forEach((option) => {
      totaloptions += option + "\n";
    });
  
    await sock.sendMessage(numeroTelefonoUsuario, {
      text: message + "\n" + totaloptions,
    });
  };

  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    try {
      if (type === "notify") {
        const mensajeEntrante = messages[0]?.message?.conversation;
        const numeroTelefonoUsuario = messages[0]?.key?.remoteJid;
        let step = 0;
        if (messages[0]?.key.fromMe) {
          let mensajeEntranteMinuscula = mensajeEntrante.toLocaleLowerCase();
          if (mensajeEntranteMinuscula === "hola" && step === 0) {
            console.log("--------------------");
            let opciones = ["1. Ubicacion", "2. Ver productos", "3. Servicios"];
            await sock.sendMessage(
              numeroTelefonoUsuario,
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
        let mensajeEntranteMinuscula = mensajeEntrante.toLocaleLowerCase();

        console.log(step);

        if (mensajeEntranteMinuscula === "2" && step == 1) {
          console.log("opcion 2");
          opciones = ["A. Smartphones", "B. Otros productos"];
          generateMessageQuestion(
            numeroTelefonoUsuario,
            "Claro, ¿qué tipo de productos te gustaría explorar hoy?\n\n",
            opciones
          );
          step += 1;
        }

        mensajeEntranteMinuscula = mensajeEntrante.toLocaleLowerCase();

        if (mensajeEntranteMinuscula === "a" && step == 2) {
          console.log("opcion 3");
          opciones = ["1. Nuevos", "2. De exhibición"];
          await generateMessageQuestion(
            numeroTelefonoUsuario,
            "¡Perfecto! ¿Qué tipo de teléfonos te interesa?\n\n",
            opciones
          );
          step += 1;
        }
        mensajeEntranteMinuscula = mensajeEntrante.toLocaleLowerCase();

        if (mensajeEntranteMinuscula === "1" || (mensajeEntranteMinuscula === "2" && step == 3)) {
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
            numeroTelefonoUsuario,
            "¿por cuál de las siguientes categorías deseas filtrar los teléfonos nuevos?\n\n",
            opciones
          );
          step += 1;
        }
        mensajeEntranteMinuscula = mensajeEntrante.toLocaleLowerCase();

        if (mensajeEntranteMinuscula === "c" && step == 4) {
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
          generateMessageQuestion(numeroTelefonoUsuario, "\n\n", opciones);

          step += 1;
        } else if (mensajeEntranteMinuscula === "d" && step == 4) {
          opciones = [
            "1. De 2000 a 3000 mAh",
            "2. De 3000 a 4000 mAh",
            "3. De 4000 a 5000 mAh",
            "4. De 5000 a 6000 mAh",
            "5. De 6000 a 7000 mAh",
          ];
          generateMessageQuestion(
            numeroTelefonoUsuario,
            "¿Qué capacidad de batería prefieres?\n\n",
            opciones
          );

          step += 1;
        }
      }
    } catch (error) {
      console.log("error ", error);
    }
  }); */

  sock.ev.on("creds.update", saveCreds);
}

export { connectToWhatsApp };
