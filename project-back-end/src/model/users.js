const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    phone_number:{
        type:String,
        required:true
    },
    email_id:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:10
    },
     created_at:{
        type:Date,
        default:Date.now()
    }
});












module.exports = User = mongoose.model('users',userSchema);