const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const verificationSchema = new Schema({
    admin_id:{
        type: Schema.Types.ObjectId,
        ref: 'users'
},
 user_id:{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"notVerified"
    }
}, { timestamps: true });
module.exports = Verification = mongoose.model('verifications',verificationSchema);