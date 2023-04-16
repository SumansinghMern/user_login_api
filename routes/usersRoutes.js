const express = require("express");

const route = express.Router();

const { isUser } = require("../middileware/authMid");

const postController = require("../controller/postsController");

route.use(isUser);

route.post("/createPost", postController.createPost);
route.get("/getMyPosts", postController.getMyPosts);

module.exports = route;
