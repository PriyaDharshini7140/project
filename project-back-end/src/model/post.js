const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'users'
},
     created_at:{
        type:Date,
        default:Date.now()
    },
    user_name:{
        type:String,
        required:true
    },
    post_text:{
        type:String,
        required:true
    },
    post_url:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    up_vote:{
        type:String,
        required:true
    },
    down_vote:{
        type:String,
        required:true
    },
    comments:[
        {
        type: Schema.Types.ObjectId,
        ref: 'comments'
    },
    ]
    });
module.exports = Post = mongoose.model('posts',postSchema);