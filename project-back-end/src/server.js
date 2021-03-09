const express = require("express");
const mongoose = require("mongoose");
const user = require('./routes/user');
const post = require("./routes/post")
const comment = require('./routes/comment')
const cors = require("cors");

const db = "mongodb+srv://priyadharshini:Priya_7140@cluster0.nfn6p.mongodb.net/project-database?retryWrites=true&w=majority";
const port = 4000;

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(db,{
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
app.listen(port,(err)=>{
if(err){
    console.log( {err : err});
}
console.log("server running on port" +port);
});