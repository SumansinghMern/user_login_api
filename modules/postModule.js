const { Post } = require("../models");

module.exports.createPosts = (data) =>
  new Promise((resolve, reject) => {
    Post.create(data)
      .then((post) => {
        resolve([false, post]);
      })
      .catch((error) => {
        resolve([error, {}]);
      });
  });

module.exports.getPosts = (query, skip=0, limit=10) =>
  new Promise((resolve, reject) => {
    Post.find(query)
      .skip(skip)
      .limit(limit)
      .then((posts) => {
        resolve([false, posts]);
      })
      .catch((error) => {
        resolve([error, {}]);
      });
  });
