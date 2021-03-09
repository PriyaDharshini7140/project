const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const replySchema = new Schema({
    comment_id:{
        type: Schema.Types.ObjectId,
        ref: 'comments'
    },
    user_name:{
        type:String,
        required:true
    },
    reply_text:{
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
module.exports = Reply = mongoose.model('replys',replySchema);