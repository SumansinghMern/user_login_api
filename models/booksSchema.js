const mongoose = require("mongoose");
const User = require("./user");

const { Schema, model, Types } = mongoose;
const { ObjectId } = Types;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
      index: true,
    },
    publication: {
      type: Number,
      required: true,
    },
    author: {
      type: ObjectId,
      required: true,
      ref: User,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const BookSchema = model("book", bookSchema);

module.exports = BookSchema;
