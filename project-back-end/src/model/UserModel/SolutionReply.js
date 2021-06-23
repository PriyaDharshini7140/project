const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mvpreplySchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'users'
},
 comment_id:{
        type: Schema.Types.ObjectId,
        ref: 'mvpcomments'
    },
    reply_text:{
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
module.exports = MvpReply = mongoose.model('mvpreplys',mvpreplySchema);