const express = require("express");
const cors = require("cors");
const routeManager = require("./routes/routeManager");

const app = express();

app.use(cors());
app.use(express.json());
app.get("/health", (req, res) => {
  res.json({
    message: "welcome to helix, server is up!",
  });
});
app.use("/api", routeManager);
app.use(express.urlencoded({ extended: true }));

module.exports = { app };
