const express = require("express");

const { isSuperUser } = require("../middileware/authMid");

const route = express.Router();
const userController = require("../controller/userController");

route.use(isSuperUser);

route.get("/getAllUsers", userController.getAllUser);
module.exports = route;
