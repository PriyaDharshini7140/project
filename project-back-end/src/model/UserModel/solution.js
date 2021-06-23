const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const solutionSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'users'
},
post_id:{
    type: Schema.Types.ObjectId,
    ref: 'posts'
},
   solution_title:{
    type:String,
    required:true
   },
  link:{
        type:String,
        required:true
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
    solutionSchema.pre('save', function (next) {
       
        this.up_vote_count=this.up_vote.length*(+1)

        next();
      })
module.exports = Solution = mongoose.model('solutions',solutionSchema);