const { BookSchema } = require("../models");

module.exports.getAllBooks = (query = {}) =>
  new Promise((resolve, reject) => {
    const { skip, limit, search } = query;
    let myQuery = {};
    if (search) {
      const regexQuery = new RegExp(search, "i");
      myQuery = {
        $or: [{ title: regexQuery }, { description: regexQuery }],
      };
    }
    BookSchema.find(myQuery)
      .skip(skip)
      .limit(limit)
      .then((doc) => {
        resolve([false, doc]);
      })
      .catch((error) => {
        resolve([error, {}]);
      });
  });

module.exports.getBookById = (id) =>
  new Promise((resolve, reject) => {
    BookSchema.findById(id)
      .populate("author", "email name")
      .then((doc) => {
        resolve([false, doc]);
      })
      .catch((error) => {
        resolve([error, {}]);
      });
  });

module.exports.deleteBookById = (id) =>
  new Promise((resolve, reject) => {
    BookSchema.findByIdAndDelete(id)
      .then((doc) => {
        resolve([false, doc]);
      })
      .catch((error) => {
        resolve([error, {}]);
      });
  });

module.exports.addBook = (data) =>
  new Promise((resolve, reject) => {
    BookSchema.create(data)
      .then((doc) => {
        resolve([false, doc]);
      })
      .catch((error) => {
        resolve([error, {}]);
      });
  });

module.exports.updateBookById = (id, data) =>
  new Promise((resolve, reject) => {
    BookSchema.findByIdAndUpdate(id, { $set: data }, { new: true })
      .then((doc) => {
        resolve([false, doc]);
      })
      .catch((error) => {
        resolve([error, {}]);
      });
  });
