const mongoose = require('mongoose');
const Role = require('./roleSchema');
// const Schema = mongoose.Schema;
const {Schema,Types,model} = mongoose;
const { ObjectId } = Types


const userSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default: true
    },
    role: {
        type: ObjectId,
        ref:Role
    }
},{
    timestamps:true
})

module.exports = model('User',userSchema);     