const mongoose = require("mongoose");

const { Schema, Types, model } = mongoose;

//
/**
 * For Types of role We have.
 * 1 . Admin --> Create Super Users, Users, Support( privilegeRank : 1)
 * 2 . Power Users --> Only can see the All User Posts (privilegeRank: 2)
 * 3 . Users -> can create/update/delete posts ( privilegeRank: 3)
 * 4 . Support Dest --> can read only All users Data (privilegeRank: 4)
 */

const roleSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
      unique: true,
    },
    privilegeRank: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Role = model('user_role', roleSchema)

module.exports = Role
