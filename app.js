// IMPORT
const express = require("express");
const { notFound, errorHandler } = require("./middlewares/errors");
const moviesRouter = require("./routers/movies");
const cors = require("cors");
const appUrl = process.env.VITE_APP_URL;

// CONFIG
const app = express();

// MIDDLEWARES
app.use(express.static("public"));
app.use(express.json());
app.use(
  cors({
    origin: appUrl,
  })
);

// ROUTES
app.use("/movies", moviesRouter);

// ERROR HANDLER MIDDLEWARES
app.use(notFound);
app.use(errorHandler);

// LISTEN
app.listen(3000, () => {
  console.log("Server in ascolto su http://localhost:3000");
});
