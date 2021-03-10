const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
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
    },
    posts:[
        {
        type: Schema.Types.ObjectId,
        ref: 'posts',
        }
    ]
});
module.exports = User = mongoose.model('users',userSchema);