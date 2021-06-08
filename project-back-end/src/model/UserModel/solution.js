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
    }, { timestamps: true });
module.exports = Solution = mongoose.model('solutions',solutionSchema);