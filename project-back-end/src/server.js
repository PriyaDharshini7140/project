require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

const user = require('./routes/UserRoutes/user');
const post = require("./routes/UserRoutes/post")
const comment = require('./routes/UserRoutes/comment')
const reply = require('./routes/UserRoutes/reply')


const verification = require("./routes/UserRoutes/verification")
const cors = require("cors");
const port = 4000;

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.DB,{
    useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(()=>{
    console.log("mongodb connected");
}).catch((err)=>{
    console.log({err: err });
})

 app.use('/user',user);
 app.use('/post',post);
 app.use('/comment',comment);
 app.use('/reply',reply);
 
 app.use('/verification',verification)
app.listen(port,(err)=>{
if(err){
    console.log( {err : err});
}
console.log("server running on port" +port);
});