import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from "qrcode-terminal";

const SESSION_DIR = process.env.SESSION_DIR || ".wwebjs_auth";

// state & client global
export const sessionState = { status: "idle" };
let client = null;

export function createClient() {
  if (client) return client;

  sessionState.status = "initializing";

  client = new Client({
    authStrategy: new LocalAuth({ dataPath: SESSION_DIR }),
    puppeteer: {
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    },
  });

  client.on("qr", async (qr) => {
    try {
      qrcode.generate(qr, { small: true });
      sessionState.status = "qr";
    } catch (e) {
      sessionState.status = "failed";
      sessionState.error = "QR encode failed";
    }
  });

  client.on("authenticated", () => {
    sessionState.status = "authenticated";
    delete sessionState.qr;
  });

  client.on("ready", () => {
    sessionState.status = "ready";
  });

  client.on("disconnected", (reason) => {
    sessionState.status = "disconnected";
    sessionState.error = String(reason);
  });

  client.on("auth_failure", (msg) => {
    sessionState.status = "failed";
    sessionState.error = String(msg);
  });

  return client;
}

export function getClient() {
  return client;
}
