const express = require('express');

const router = express.Router();

const User = require('../model/users');

const Post = require('../model/post');

const Comment = require('../model/comment')


//1. add a new post
router.post('/getUser/:id/getPost/:pid/addComment', async (req, res) => {
	const newComment = new Comment(req.body);
	console.log(newComment);
    const UserId =  req.params.id;
    const PostId = req.params.pid
	try {
        const user = await User.findById(UserId);
		if (!user) {
			return res.status(404).send({ error: 'User not found' });
		}
         user.posts.map((e)=>{
			 if (e._id == PostId) {
				 console.log("before");
				 e.comments.push(newComment) 
				 console.log("after");
				 }
				 else{
					return res.status(404).send({ error: 'Post not found' });
				 }
				
			})
			
			  user.save();
			  console.log(user);
		res.status(201).send(user);
	} catch (err) {
		res.status(500).send();
	}
});

module.exports = router;