const { createPosts, getPosts } = require("../modules/postModule");

module.exports.createPost = async (req, res, next) => {
  try {
    const { title, message, active } = req.body;

    let data = {
      title: title,
      message: message,
      active,
    };

    data.userId = req.userId;

    const [error, newuser] = await createPosts(data);

    if (error) {
      return next(error);
    }

    res.status(200).json(newuser);
  } catch (error) {
    console.log("🚀 ~ file: postsController.js:6 ~ error:", error);
    next(error);
  }
};

module.exports.getMyPosts = async (req, res, next) => {
  try {
    const { skip, limit } = req.query;
    let query = {
      userId: req.userId,
    };
    let [error, myAllPost] = await getPosts(query, skip, limit);

    if (error) {
      return next(error);
    }

    res.status(200).json(myAllPost);
  } catch (error) {
    console.log(
      "🚀 ~ file: postsController.js:32 ~ module.exports.getMyPosts= ~ error:",
      error
    );
    next();
  }
};
