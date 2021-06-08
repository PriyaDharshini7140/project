const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reportSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'users'
},
post_id:{
    type: Schema.Types.ObjectId,
    ref: 'posts'
},
    report_reason:{
        type:String,
        required:true
    },
    
    }, { timestamps: true });
module.exports = Report = mongoose.model('reports',reportSchema);