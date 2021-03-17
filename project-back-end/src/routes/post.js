const express = require('express');

const router = express.Router();

const User = require('../model/users');

const Post = require('../model/post');




//1. add a new post
router.post('/addPost', async (req, res) => {
	const newPost = new Post(req.body);
	try {
		await newPost.save()
		.then((e)=>res.status(201).send({data:e}))
		.catch((e)=> console.log(e))
	} catch (err) {
		res.status(500).send();
	}
});
// get particular post for post description with comments

router.post('/getPost', async (req, res) => {
	try {

		const post= await Post.find({_id:req.body._id})
		//    console.log(post);
		const postDetails= post.map((e)=>{
			 return{
					   _id:e._id,
					   user_id:e.user_id,
					   post_text:e.post_text,
					   post_url:e.post_url,
					   category:e.category,
					   up_vote:e.up_vote,
					   down_vote:e.down_vote,
					   comments:[]
				   }
	
		   })


		   const comment= await Comment.find()
		  
		   const commentDetails= comment.map((e)=>{
				return{
						  _id:e._id,
						  post_id:e.post_id,
						  comment_text:e.comment_text,
						  up_vote:e.up_vote,
						  down_vote:e.down_vote,
						  replys:[]
					  }
	   
			  })


    console.log(commentDetails);

   
	postDetails.map((p)=>{
	//    console.log(p);
	  commentDetails.map((c)=>{
		//    console.log(c);
		   if(p._id.toString() === c.post_id.toString()){
			
				p.comments.push(c)
		   }
	   })
   })


			 
	res.status(200).send(postDetails).catch((e)=>console.log(e))
	
	} catch (err) {
		res.status(500).send({error:err.message});
	}
});



module.exports = router;