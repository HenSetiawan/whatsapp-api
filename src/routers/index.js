import express from "express";
import {getChatId, sendMessage} from "../controllers/message.js";
import {sessionStatus, deleteClient, createClientWeb } from "../controllers/session.js";

const apiRoute = express.Router();

apiRoute.post("/api/session/start", createClientWeb);
apiRoute.get("/api/session/status", sessionStatus);
apiRoute.post("/api/session/delete", deleteClient);
apiRoute.get("/api/chats", getChatId);
apiRoute.post("/api/message", sendMessage);

export default apiRoute;
