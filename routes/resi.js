const express = require("express");
const resiController = require("../controllers/resiController");
const upload = require("../middleware/multer");

const router = express.Router();

router
  .route("/")
  .get(resiController.getResi)
  .post(upload.single("photo"), resiController.createNewResi)
  .put(resiController.terimaResi);

router.route("/:id").get(resiController.getResiByNoResi);

module.exports = router;
