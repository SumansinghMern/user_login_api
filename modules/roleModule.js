const { Role } = require("../models");

module.exports.addRole = (data) =>
  new Promise((resolve, reject) => {
    Role.create(data)
      .then((doc) => {
        resolve([false, doc]);
      })
      .catch((error) => {
        console.log("🚀 ~ file: roleModule.js:10 ~ newPromise ~ error:", error);
        resolve([error, {}]);
      });
  });

module.exports.getAllRoles = (query) => new Promise((resolve, reject) => {
  Role.find(query)
    .then((doc) => {
      resolve([false, doc])
    })
    .catch((error) => {
      resolve([error,{}])
    })
})
