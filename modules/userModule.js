const { User } = require("../models");

module.exports.createUser = (data) =>
  new Promise((resolve, reject) => {
    User.create(data)
      .then((user) => {
        resolve([false, user]);
      })
      .catch((error) => {
        resolve([error, {}]);
      });
  });

module.exports.findUser = (query) =>
  new Promise((resolve, reject) => {
    User.find(query)
      .then((user) => {
        resolve([false, user[0]]);
      })
      .catch((error) => {
        resolve([error, {}]);
      });
  });

module.exports.findAllUsers = (query) =>
  new Promise((resolve, reject) => {
    let { skip, limit } = query;
    User.find({})
      .skip(skip)
      .limit(limit)
      .populate("role")
      .then((users) => {
        resolve([false, users]);
      })
      .catch((error) => {
        resolve([error, {}]);
      });
  });

module.exports.findAndUpdateUser = (query, data) =>
  new Promise((resolve, reject) => {
    User.findOneAndUpdate(query, data)
      .then((update) => {
        resolve([false, update]);
      })
      .catch((error) => {
        resolve([error, {}]);
      });
  });
