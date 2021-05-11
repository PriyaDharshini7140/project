const {SECRET_KEY,TOKEN_EXPIRE} = require('../configuration/Config');
const jwt = require("jsonwebtoken")
module.exports.CreateToken = (user)=>{
    return jwt.sign({user_id:user._id},SECRET_KEY,{
        expiresIn:TOKEN_EXPIRE
    })
}