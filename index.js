const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const apiRoute = require("./src/routers");
const PORT = process.env.PORT || 6000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", apiRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
