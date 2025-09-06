const express = require("express");
const apiRoute = express.Router();
const messagesController = require("../controllers/message.js");
const sessionController = require("../controllers/session.js");

apiRoute.post("/api/session/start", sessionController.createClient);
apiRoute.get("/api/session/status", sessionController.sessionStatus);
apiRoute.post("/api/session/delete", messagesController.deleteClient);
apiRoute.get("/api/chats", messagesController.getChatId);
apiRoute.post("/api/message", messagesController.sendMessage);

module.exports = apiRoute;
