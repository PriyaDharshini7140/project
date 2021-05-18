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
    up_vote:[{type: Schema.Types.ObjectId,
        ref: 'users'
    }],
    down_vote:[{type: Schema.Types.ObjectId,
        ref: 'users'
    }],
  }, { timestamps: true });
module.exports = Comment = mongoose.model('comments',commentSchema);