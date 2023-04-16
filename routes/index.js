const express = require("express");

const router = express.Router();
const adminRoute = require("./adminRoutes");
const superUserRoute = require("./superUserRoutes");
const usersRoute = require("./usersRoutes")

/**
 * Admin Route
 */

router.use("/admin", adminRoute);

/**
 * Power Users
 */

router.use("/superUser", superUserRoute);

/**
 * Users
 */

router.use("/users", usersRoute);

module.exports = router;
