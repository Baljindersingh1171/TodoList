require("dotenv").config();
const express = require("express");
const cors = require("cors");
const taskroutes = require("./Routes/taskroutes");
const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());

const connect = require("./db/connect");
const startserver = async () => {
  await connect();
  app.use("/api/v1", taskroutes);
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
};
startserver();
