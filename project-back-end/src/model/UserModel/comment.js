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