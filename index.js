import express from "express";
import cors from "cors";
import "dotenv/config";
import apiRoute from "./src/routers/index.js";
import { swaggerUi, specs } from "./swagger.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", apiRoute);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
