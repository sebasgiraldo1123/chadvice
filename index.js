import { connectToWhatsApp } from "./src/whatsappCon/index.js";
import Express from "express";

const PORT = process.env.PORT || 3000;
const app = Express();

connectToWhatsApp().catch((err) => console.log("unexpected error: " + err)); // catch any errors

app.listen(PORT, () => {
  console.log("Server Run PORT : " + PORT);
});
