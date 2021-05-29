const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    user_name:{
        type:String,
        required:true,
        min:4,
        max:20
    },
    
    phone_number:{
        type:String,
        required:false
    },
    email_id:{
        type:String,
        required:true
    },
    work:{
        type:String,
        required:false
    },
    education:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:true,
        min:8,
        max:15
    },
    role:{
        type:String,
        default:"user"
      },
    profile_picture:{
        type:String,
        required:false,
        default:""
    },
    description:{
        type:String,
        required:false,
       
       
    }
}, { timestamps: true } );












module.exports = User = mongoose.model('users',userSchema);