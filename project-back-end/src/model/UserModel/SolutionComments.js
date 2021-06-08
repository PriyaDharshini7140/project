const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mvpSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'users'
},
    solution_id:{
        type: Schema.Types.ObjectId,
        ref: 'solutions'
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
module.exports = MvpComment = mongoose.model('mvpcomments',mvpSchema);