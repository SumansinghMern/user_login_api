const express = require("express");

const genralController = require('../controller/genralController')

const router = express.Router();

router.post("/createRoles", genralController.addRoles);
router.get("/getroles", genralController.getRoles);

router.get("/getResetPassword/:tempId",genralController.getResetPaswword);

router.post("/setPassowd", genralController.resetPassword)

module.exports = router;

