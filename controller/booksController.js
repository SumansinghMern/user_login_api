const {
  addBook,
  updateBookById,
  getAllBooks,
  getBookById,
  deleteBookById,
} = require("../modules/bookModule");

module.exports.getAllBooks = async (req, res, next) => {
  try {
    let { search, skip, limit } = req.query;
    limit = limit || 10;
    skip = skip || 0;
    let myBooks;

    const [error, myAllBooks] = await getAllBooks({ skip, limit, search });
    if (error) {
      return next(error);
    }
    console.log("BBBBBBBBBBBBBBBB");
    myBooks = myAllBooks;
    // }

    res.status(200).json(myBooks);
  } catch (error) {
    console.log("🚀 ~ file: booksController.js:8 ~ error:", error);
    next(error);
  }
};

module.exports.addSingleBook = async (req, res, next) => {
  try {
    const { title, description, publication } = req.body;

    if (!title || !publication) {
      let error = new Error("title is required");
      error.statusCode = 400;
      return next(error);
    }

    // Not a Right way to handle it.
    if (publication > 2024 || publication < 1800 || isNaN(publication)) {
      let error = new Error("Please Enter valid publication Year");
      error.statusCode = 400;
      return next(error);
    }

    let myBookObj = {
      title,
      description,
      publication,
      author: req.userId,
    };

    const [error, addedBook] = await addBook(myBookObj);

    if (error) {
      return next(error);
    }

    res.status(201).json(addedBook);
  } catch (error) {
    console.log("🚀 ~ file: booksController.js:24 ~ error:", error);
    next(error);
  }
};

module.exports.getBookById = async (req, res, next) => {
  try {
    let { id } = req.params;
    console.log(
      "🚀 ~ file: booksController.js:72 ~ module.exports.getBookById= ~ id:",
      id
    );

    if (!id) {
      let error = new Error("id is required");
      error.statusCode = 400;
      return next(error);
    }

    let [error, myBook] = await getBookById(id);
    if (error) {
      return next(error);
    }

    res.status(200).json(myBook);
  } catch (error) {
    console.log(
      "🚀 ~ file: booksController.js:81 ~ module.exports.getBookById= ~ error:",
      error
    );
    next(error);
  }
};

module.exports.deleteBookById = async (req, res, next) => {
  try {
    let { id } = req.params;

    if (!id) {
      let error = new Error("id is required");
      error.statusCode = 400;
      return next(error);
    }

    let [error, deleteBook] = await deleteBookById(id);
    if (error) {
      return next(error);
    }

    res.status(200).json(deleteBook);
  } catch (error) {
    console.log(
      "🚀 ~ file: booksController.js:106 ~ module.exports.deleteBookById ~ error:",
      error
    );
    next(error);
  }
};

module.exports.updateBookById = async (req, res, next) => {
  try {
    let { id } = req.params;
    let { title, description, publication } = req.body;
    if (!title && !description && !publication) {
      let error = new Error(
        "Please pass the field and value which you wanted to Update"
      );
      error.statusCode = 400;
      return next(error);
    }

    if (
      publication &&
      (publication > 2024 || publication < 1800 || isNaN(publication))
    ) {
      let error = new Error("Please Enter valid publication Year");
      error.statusCode = 400;
      return next(error);
    }

    let data = {};

    if (title) {
      data.title = title;
    }

    if (description) {
      data.description = description;
    }

    if (publication) {
      data.publication = publication;
    }

    let [error, updatedBook] = await updateBookById(id, data);

    if (error) {
      return next(error);
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.log(
      "🚀 ~ file: booksController.js:131 ~ module.exports.updateBookById= ~ error:",
      error
    );
    next(error);
  }
};
