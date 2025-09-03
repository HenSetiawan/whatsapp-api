const express = require("express");
const apiRoute = express.Router();
const controllers = require("../controllers");

apiRoute.post("/api/session/start", controllers.createClient);
apiRoute.get("/api/session/status", controllers.sessionStatus);
apiRoute.get("/api/chats", controllers.getChatId);
apiRoute.post("/api/messages", controllers.sendMessage);

module.exports = apiRoute;
