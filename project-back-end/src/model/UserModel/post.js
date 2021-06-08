const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'users'
},
   idea_title:{
    type:String,
    required:true
   },
  
    post_text:{
        type:String,
        required:true
    },
    scope:{
        type:String,
        required:false
       },
    post_url:[{
        type:String,
        required:false
    }],
    category:{
        type:Array,
        required:true
    },
    link:{
        type:String,
        required:false
    },
    enhancement:{
        type:String,
        required:false
    },
    requirements:{
        
        frontend:{
            type:Array,
            required:false
           },
           backend:{
            type:Array,
            required:false
           },
           database:{
            type:Array,
            required:false
           }
    },
    up_vote:[{type: Schema.Types.ObjectId,
        ref: 'users',
       
    }],
    down_vote:[{type: Schema.Types.ObjectId,
        ref: 'users'
    }],
    up_vote_count:{
        type:Number,
       default:0
    }
    }, { timestamps: true });

    postSchema.pre('save', function (next) {
       
        this.up_vote_count=this.up_vote.length*(+1)

        next();
      })
module.exports = Post = mongoose.model('posts',postSchema);