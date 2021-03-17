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
// get particular post for post description

router.post('/getPost', async (req, res) => {
	try {

const post= await Post.find({_id:req.body._id})

const postDetails= post.map((e)=>{
	 return{
			   _id:e._id,
			   post_text:e.post_text,
			   post_url:e.post_url,
			   category:e.category,
			   up_vote:e.up_vote,
			   down_vote:e.down_vote,
			   comments:[]
		   }

   })

// console.log(postDetails);  

const comment= await Comment.find({post_id:req.body.post_id})
// console.log(comment);
const commentDetails= comment.map((e)=>{
	 return{
			   _id:e._id,
			   comment_text:e.comment_text,
			   up_vote:e.up_vote,
			   down_vote:e.down_vote,
			   replys:[]
		   }

   })
//    console.log(commentDetails);


const reply= await Reply.find({comment_id:req.body.comment_id})
// console.log(reply);
const replyDetails= reply.map((e)=>{
	 return{
			   _id:e._id,
			   reply_text:e.reply_text,
			   up_vote:e.up_vote,
			   down_vote:e.down_vote
		   }

   })
   console.log(replyDetails);

commentDetails.map((e)=>{
	//    console.log(e);
	  if(e._id == req.body.comment_id )
	  {
		//   console.log(e._id);
		return e.replys.push(replyDetails)
	  }
	
})

   postDetails.map((e)=>{
	//    console.log(e);
	  if(e._id == req.body.post_id )
	  {
		//   console.log(e._id);
		return e.comments.push(commentDetails)
	  }
	
})

		 
	res.status(200).send(postDetails).catch((e)=>console.log(e))
	
	} catch (err) {
		res.status(500).send();
	}
});



// 2.update a post
router.patch('/updatePost/:id', async (req, res) => {
	const updates = Object.keys(req.body);
    console.log(updates);
	const allowedUpdates = [' post_text','post_url','category','up_vote','down_vote'];
	const isValidOperation = updates.every((update) => {
		return allowedUpdates.includes(update);
	});

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid Operation' });
	}

	try {
		const post = await Post.findById(req.params._id)
        console.log(post);
		if (!post) {
           
			return res.status(404).send({ error: 'post not found' });
		}
		updates.forEach((update) => {
			post[update] = req.body[update];
		});
		await post.save();
		res.send(post);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error'});
	}
});
// 3.delete a post
router.delete('/deletePost', async (req, res) => {
    
	try {
		const post = await Post.findOneAndDelete({_id:req.body._id});
		if (!post) {
			return res.status(404).send({ error: 'post not found' });
		}
		res.send(post);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});

module.exports = router;