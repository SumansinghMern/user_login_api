const express = require("express");

const router = express.Router();
const { isAdmin, isLogedIn } = require("../middileware/authMid");

const booksController = require("../controller/booksController");

/**
 * For get all Books with pagination and fuzzy search and add books
 */
router
  .route("/books")
  .get(isLogedIn,booksController.getAllBooks)
  .post(isAdmin, booksController.addSingleBook);

/**
 * Get/Update/Delete Books with the id's.
 */
router
  .route("/book/:id")
  .get(isLogedIn,booksController.getBookById)
  .put(isAdmin, booksController.updateBookById)
  .delete(isAdmin, booksController.deleteBookById);

module.exports = router;
