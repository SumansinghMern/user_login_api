const mongoose = require("mongoose");

const User = require("./user")

const { Schema, Types, model } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    active: {
      type: Boolean,
    },
    userId: {
      type: Types.ObjectId,
      ref: User,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

let Post = model('post',postSchema)

module.exports = Post;