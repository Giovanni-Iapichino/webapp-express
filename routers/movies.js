const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

//# INDEX

router.get("/", movieController.index);

//# SHOW

router.get("/:id", movieController.show);

module.exports = router;
