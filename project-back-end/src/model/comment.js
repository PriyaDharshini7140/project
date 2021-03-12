const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'users'
},
    post_id:{
        type: Schema.Types.ObjectId,
        ref: 'posts'
    },
    user_name:{
        type:String,
        required:true
    },
    comment_text:{
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
  });
module.exports = Comment = mongoose.model('comments',commentSchema);