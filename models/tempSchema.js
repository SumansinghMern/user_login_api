const mongoose = require('mongoose');

const {Schema, Types, model} = mongoose;

const tempSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    require: true
  }
},{
    timestamps: true,
    versionKey: false
});

const TempDetails = model('tempDetail',tempSchema)

module.exports = TempDetails;