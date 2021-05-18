const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'users'
},
    post_text:{
        type:String,
        required:true
    },
    post_url:{
        type:String,
        required:false
    },
    category:{
        type:String,
        required:false
    },
    up_vote:[{type: Schema.Types.ObjectId,
        ref: 'users'
    }],
    down_vote:[{type: Schema.Types.ObjectId,
        ref: 'users'
    }],
    }, { timestamps: true });
module.exports = Post = mongoose.model('posts',postSchema);