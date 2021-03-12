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
// 2.to view all post
router.post('/getPost', async (req, res) => {
	try {
	 await Post.find({user_id:req.body.user_id})
	.then((e)=>res.status(201).send({data:e}))
	.catch((e)=>console.log(e));
	} catch (err) {
		res.status(500).send();
	}
});
// 3.to view a particular post
router.post('/get_a_Post', async (req, res) => {
	try {
	 await Post.findOne({user_id:req.body.user_id,_id:req.body._id})
	.then((e)=>res.status(201).send({data:e}))
	.catch((e)=>console.log(e));
	} catch (err) {
		res.status(500).send();
	}
});

module.exports = router;