const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const adminSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    
    email_id:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:10
    },
    profile_picture:{
        type:String,
        required:true
    },
     created_at:{
        type:Date,
        default:Date.now()
    }
});












module.exports = Admin = mongoose.model('admins',adminSchema);