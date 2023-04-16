const express = require("express");

const route = express.Router();

const userController = require("../controller/userController");

const { isAdmin } = require("../middileware/authMid");

route.use(isAdmin);

route.post("/createUser", userController.createUser);

route.get("/getAllUsers", userController.getAllUser);

module.exports = route;
