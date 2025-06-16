// IMPORT
const express = require("express");
const { notFound, errorHandler } = require("./middlewares/errors");

// CONFIG
const app = express();

// MIDDLEWARES
app.use(express.static("public"));
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  res.json("Benvenuto sul backend dei movies");
});

// ERROR HANDLER MIDDLEWARES
app.use(notFound);
app.use(errorHandler);

// LISTEN
app.listen(3000, () => {
  console.log("Server in ascolto su http://localhost:3000");
});
