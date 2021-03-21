const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const verificationSchema = new Schema({
    admin_id:{
        type: Schema.Types.ObjectId,
        ref: 'admins'
},
 user_id:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});
module.exports = Verification = mongoose.model('verifications',verificationSchema);